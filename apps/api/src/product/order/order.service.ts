import { HttpService } from '@nestjs/axios';
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOrderDto, OrederCreateDto } from '../common/dto/order.dto';
import { MailService } from 'src/mail/mail.service';

export interface CreateCpanelAccountParams {
  userName: string;
  password: string;
  email: string;
  domain: string;
  plan: string;
}

export interface CpanelCreateResponse {
  success: boolean;
  message: string;
  details?: any;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
    private readonly mail: MailService,
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
  // async createOrder(data: OrederCreateDto) {
  //   const [user, product] = await Promise.all([
  //     this.#ValidateUser(data.userId),
  //     this.#ValidateProduct(data.productId),
  //   ]);

  //   if (!user || !product) {
  //     throw new NotFoundException('User or Product not found');
  //   }

  //   const today = new Date();

  //   const expiresAt =
  //     product?.billingCycle === 'MONTHLY'
  //       ? new Date(today.setMonth(today.getMonth() + 1))
  //       : new Date(today.setFullYear(today.getFullYear() + 1));

  //   const orderData = {
  //     userId: user?.id,
  //     productId: product?.id,
  //     domainName: data.domainName,
  //     amount: product?.price,
  //     expiresAt,
  //   };

  //   const order = await this.prisma.order.create({
  //     data: orderData,
  //   });

  //   const cpanelAccount = await this.#CreateCpanelAccount({
  //     userName: data.domainName || 'defaultuser',
  //     password: 'defaultpassword',
  //     email: 'defaultemail@gmail.com',
  //     domain: data.domainName || 'defaultdomain.com',
  //   });

  //   if (cpanelAccount.details.status !== '1') {
  //     throw new NotFoundException('Cpanel Account not created');
  //   }

  //   await this.prisma.order.update({
  //     where: { id: order.id },
  //     data: {
  //       status: 'ACTIVE',
  //     },
  //   });

  //   return cpanelAccount;
  // }

  async updateOrder(id: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: {
        status: 'PAID',
      },
    });
    return order;
  }

  async deleteOrder(id: string) {
    const order = await this.prisma.order.delete({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
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

  async createOrder(data: OrederCreateDto) {
    const [user, product] = await Promise.all([
      this.#ValidateUser(data.userId),
      this.#ValidateProduct(data.productId),
    ]);

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const expiresAt = this.calculateExpiryDate(product.billingCycle);
    const password = this.generateRandomPassword();
    let plan = 'neyamot_default';

    if (product.grade === 'BASIC') {
      plan = 'neyamot_base';
    } else {
      plan = 'neyamot_default';
    }

    /// calculate price with discount vat and tax

    const price = product.price;
    const discountRate = product.discount || 0;
    const taxRate = product.tax || 0;
    const vatRate = product.vat || 0;

    // 1. Calculate discounted amount
    const discountAmount = (price * discountRate) / 100;
    const discountedPrice = price - discountAmount;

    // 2. Calculate tax and VAT based on discounted price
    const taxAmount = (discountedPrice * taxRate) / 100;
    const vatAmount = (discountedPrice * vatRate) / 100;

    // 3. Final total (subtotal)
    const total = discountedPrice + taxAmount + vatAmount;

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        domainName: data.domainName,
        amount: price,
        expiresAt,
        status: 'PENDING',
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
    });

    if (!order) {
      throw new NotFoundException('Order not created');
    }

    const html = `
      <h1>Order Created</h1>
      <p>Order ID: ${order.id}</p>
      <p>Product: ${order.status}</p>
      <p>Amount: ${order.amount}</p>
      <p>Expiry Date: ${order.expiresAt}</p>
    `;

    await this.mail.sendBasicEmail(user.email, 'Order Created', html);

    return order;

    // try {
    //   const cpanelAccount = await this.createCpanelAccount({
    //     userName: user.username || 'defaultuser',
    //     password,
    //     email: data.email || user.email, // Use user's email
    //     domain: data.domainName || 'defaultdomain.com',
    //     plan: plan,
    //   });

    //   if (!cpanelAccount.success === true) {
    //     throw new NotFoundException('Cpanel Account not created');
    //   }

    //   const metadata = {
    //     userName: user.username,
    //     password,
    //     email: data.email,
    //     domain: data.domainName,
    //     plan: plan, // From product
    //   };

    //   await this.prisma.order.update({
    //     where: { id: order.id },
    //     data: {
    //       status: 'PAID',
    //       metadata: JSON.stringify(metadata),
    //     },
    //   });

    //   return {
    //     order,
    //     cpanelAccount,
    //     temporaryPassword: password,
    //   };
    // } catch (error) {
    //   await this.prisma.order.update({
    //     where: { id: order.id },
    //     data: {
    //       status: 'FAILED',
    //     },
    //   });
    //   throw new ConflictException('Order created but cPanel setup failed');
    // }
  }

  //Create Due Payment
  async createDueInvoice(order: OrederCreateDto) {}

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

  private async createCpanelAccount({
    userName,
    password,
    email,
    domain,
    plan,
  }: CreateCpanelAccountParams): Promise<CpanelCreateResponse> {
    const WHM_API_TOKEN = process.env.WHM_API_TOKEN;
    const WHM_HOST = process.env.WHM_HOST;
    const WHM_USERNAME = process.env.WHM_USERNAME;

    if (!WHM_API_TOKEN || !WHM_HOST || !WHM_USERNAME) {
      throw new Error('WHM credentials are not properly configured.');
    }

    const url = `${WHM_HOST}/json-api/createacct`;

    const params = new URLSearchParams({
      'api.version': '1',
      username: userName,
      domain,
      password,
      contactemail: email,
      plan,
    });

    try {
      const response = await axios.post(url, params.toString(), {
        headers: {
          Authorization: `whm ${WHM_USERNAME}:${WHM_API_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Use true in production with valid certs
        }),
        timeout: 15000,
      });

      console.log('WHM API Response:', response.data);

      const resData = response.data;

      if (resData?.metadata?.result !== 1) {
        const errorMsg =
          resData?.metadata?.reason || resData?.statusmsg || 'Unknown error';
        throw new ConflictException({
          message: 'cPanel account creation failed',
          error: errorMsg,
        });
      }

      return {
        success: true,
        message: 'cPanel account created successfully.',
        details: resData,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errData = error.response?.data;
        const errMsg =
          errData?.metadata?.reason ||
          errData?.statusmsg ||
          error.message ||
          'Unknown Axios error';

        console.error('WHM API Error:', {
          status: error.response?.status,
          reason: errMsg,
          response: errData,
          requestURL: error.config?.url,
          method: error.config?.method,
        });

        throw new ConflictException(`cPanel creation failed: ${errMsg}`);
      }

      throw new ConflictException(`Unexpected error: ${error.message}`);
    }
  }
}
