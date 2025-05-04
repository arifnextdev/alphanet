import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOrderDto, OrederCreateDto } from '../common/dto/order.dto';

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
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
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
    const password = this.generateRandomPassword(); // Implement this
    let plan = 'neyamot_default';

    if (product.grade === 'BASIC') {
      plan = 'neyamot_base';
    } else {
      plan = 'neyamot_default';
    }

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        domainName: data.domainName,
        amount: product.price,
        expiresAt,
      },
    });

    try {
      const cpanelAccount = await this.createCpanelAccount({
        userName: user.username || 'defaultuser',
        password,
        email: data.email || user.email, // Use user's email
        domain: data.domainName || 'defaultdomain.com',
        plan: plan,
      });

      if (!cpanelAccount.success === true) {
        throw new NotFoundException('Cpanel Account not created');
      }

      const metadata = {
        userName: user.username,
        password,
        email: data.email,
        domain: data.domainName,
        plan: plan, // From product
      };

      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          metadata: JSON.stringify(metadata),
        },
      });

      return {
        order,
        cpanelAccount,
        temporaryPassword: password,
      };
    } catch (error) {
      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'FAILED',
        },
      });
      throw new ConflictException('Order created but cPanel setup failed');
    }
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
