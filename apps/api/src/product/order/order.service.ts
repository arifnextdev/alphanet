import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  addDays,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';
import { GetOrderDto, OrederCreateDto } from '../common/dto/order.dto';
import { orderStatusSchema } from '../common/dto/order.status.dto';
import { BikashService } from 'src/bkash/bikash.service';
import { Response } from 'express';



@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
    private readonly mail: MailService,
    private readonly bikash: BikashService,
    private readonly taskService: TasksService,
    private readonly configService: ConfigService,
  ) {}

  async findAll({ limit = 10, page = 1, search, status }: GetOrderDto) {
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
      ...(search && {
        OR: [{ domainName: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const [orders, totalCount] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return {
      orders,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalUsers: totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        domainName: true,
        amount: true,
        paidAt: true,
        expiresAt: true,
        status: true,
        product: {
          select: {
            name: true,
            billingCycle: true,
            price: true,
            discount: true,
            tax: true,
            vat: true,
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            method: true,
            transId: true,
            currency: true,
            tax: true,
            vat: true,
            discount: true,
            subtotal: true,
            status: true,
            createdAt: true,
            paidAt: true,
            metadata: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async createOrder(data: OrederCreateDto) {
    const [user, product] = await Promise.all([
      this.#ValidateUser(data.userId),
      this.#ValidateProduct(data.productId),
    ]);

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const userinfo = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { userInfo: true },
    });

    const expiresAt = this.calculateExpiryDate(product.billingCycle);
    const password = this.generateRandomPassword();
    const plan = product.grade === 'BASIC' ? 'neyamot_1GB' : 'neyamot_default';

    const price = product.price;
    const discountRate = product.discount || 0;
    const taxRate = product.tax || 0;
    const vatRate = product.vat || 0;

    const discountAmount = (price * discountRate) / 100;
    const discountedPrice = price - discountAmount;

    const taxAmount = (discountedPrice * taxRate) / 100;
    const vatAmount = (discountedPrice * vatRate) / 100;

    const total = discountedPrice + taxAmount + vatAmount;

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        domainName: data.domainName || null, // Use provided domainName
        amount: price,
        expiresAt,
        payments: {
          create: {
            userId: user.id,
            amount: product.price,
            vat: vatAmount,
            tax: taxAmount,
            discount: discountedPrice,
            subtotal: total,
          },
        },
      },
      select: {
        id: true,
        status: true,
        amount: true,
        expiresAt: true,
        payments: {
          select: {
            id: true,
            amount: true,
            vat: true,
            tax: true,
            discount: true,
            subtotal: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not created');
    }

    // Conditional cPanel account creation for Hosting products
    if (product.type === 'HOSTING') {
      if (!data.domainName) {
        throw new ConflictException(
          'Domain name is required for Hosting products',
        );
      }

      this.taskService.queueCpanel({
        userId: user.id,
        orderId: order.id,
        userName: data.domainName.replace(/\./g, '').slice(0, 8),
        domain: data.domainName,
        password: this.generateRandomPassword(), // Use provided password or generate random
        email: user.email,
        plan: plan,
      });

      this.taskService.queueEmail(order.id); // Assuming this queues invoice email
      // const cpanelAccount = await this.createCpanelAccount({
      //   userName: data.domainName.replace(/\./g, '').slice(0, 8), // Generate username from domain
      //   password: this.generateRandomPassword(), // Use provided password or generate random
      //   email: user.email,
      //   domain: data.domainName,
      //   plan,
      // });

      // console.log(cpanelAccount);

      // if (!cpanelAccount.success) {
      //   // Log the error and potentially trigger a manual review/retry process
      //   console.error('cPanel account creation failed:', cpanelAccount.message);
      //   // Depending on business logic, you might want to mark the order as failed or pending manual review
      // }
      return{
        message:"Order Successfully Done"
      }
    }

    // Send email notification based on product type
 

    // if (data.paymentMethod === 'BIKASH') {
    //   const bikash = await this.bikash.createPayment(
    //     order.payments[0].subtotal || order.amount,
    //     order.payments[0].id,
    //   );
    //   console.log('Bkash payment created:', bikash);
    //   return {
    //     redirectURL: bikash.bkashURL
    //   };
    // }

    return { order };
  }

  async getOrdersExpiringOn(date: Date) {
    const orders = await this.prisma.order.findMany({
      where: { expiresAt: { lte: date } },
    });
    return orders;
  }

  async getTransaction({
    dateRange,
    status,
  }: {
    dateRange:
      | 'today'
      | 'tomorrow'
      | 'last7days'
      | 'last15days'
      | 'last30days'
      | 'lastmonth';
    status?: string;
  }) {
    console.log(dateRange);
    const now = new Date();
    let from: Date, to: Date;

    switch (dateRange) {
      case 'today':
        from = startOfDay(now);
        to = endOfDay(now);
        break;
      case 'tomorrow':
        from = startOfDay(addDays(now, 1));
        to = endOfDay(addDays(now, 1));
        break;
      case 'last7days':
        from = startOfDay(subDays(now, 6));
        to = endOfDay(now);
        break;
      case 'last15days':
        from = startOfDay(subDays(now, 14));
        to = endOfDay(now);
        break;
      case 'last30days':
        from = startOfDay(subDays(now, 29));
        to = endOfDay(now);
        break;
      case 'lastmonth':
        from = startOfMonth(subDays(now, now.getDate()));
        to = endOfMonth(subDays(now, now.getDate()));
        break;
      default:
        from = new Date(0);
        to = now;
    }

    const whereClause: any = {
      createdAt: {
        gte: from,
        lte: to,
      },
    };

    const finalStatus = status === 'all' ? undefined : status;

    if (finalStatus) {
      whereClause.status = finalStatus;
    }

    const transactions = await this.prisma.payment.findMany({
      where: whereClause,
      select: {
        id: true,
        amount: true,
        method: true,
        transId: true,
        currency: true,
        tax: true,
        vat: true,
        discount: true,
        subtotal: true,
        status: true,
        createdAt: true,
        paidAt: true,
        metadata: true,
        order: {
          select: {
            id: true,
            domainName: true,
            amount: true,
            paidAt: true,
            expiresAt: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                roles: true,
                status: true,
              },
            },
            product: {
              select: {
                name: true,
                billingCycle: true,
                price: true,
                discount: true,
                tax: true,
                vat: true,
              },
            },
          },
        },
      },
    });

    //Reverse the order of transactions
    transactions.reverse();

    const summary = transactions.reduce(
      (acc, trx) => {
        acc.totalAmount += trx.amount || 0;
        acc.totalTax += trx.tax || 0;
        acc.totalVat += trx.vat || 0;
        acc.totalDiscount += trx.discount || 0;
        return acc;
      },
      { totalAmount: 0, totalTax: 0, totalVat: 0, totalDiscount: 0 },
    );

    return { transactions, summary };
  }

  async updateOrder(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.update({
      where: { id },
      data: { status: 'PAID' },
    });
  }

  async deleteOrder(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.delete({ where: { id } });
  }

  async updatedOrderStatus(id: string, status: string) {
    const parseStatus = orderStatusSchema.safeParse(status);
    if (!parseStatus.success) {
      throw new ConflictException('Invalid status format');
    }
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: parseStatus.data.status },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      message: 'Order status updated successfully',
    };
  }

  #ValidateUser(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  #ValidateProduct(id: string) {
    const product = this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  private calculateExpiryDate(billingCycle: string): Date {
    const date = new Date();
    if (billingCycle === 'MONTHLY') {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    return date;
  }

  private generateRandomPassword(): string {
    // Implement proper password generation
    return Math.random().toString(36).slice(-10);
  }

 
}
