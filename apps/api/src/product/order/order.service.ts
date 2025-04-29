import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOrderDto, OrederCreateDto } from '../common/dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

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

  async createOrder(data: OrederCreateDto) {
    const [user, product] = await Promise.all([
      this.#ValidateUser(data.userId),
      this.#ValidateProduct(data.productId),
    ]);

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const today = new Date();

    const expiresAt =
      product?.billingCycle === 'MONTHLY'
        ? new Date(today.setMonth(today.getMonth() + 1))
        : new Date(today.setFullYear(today.getFullYear() + 1));

    const orderData = {
      userId: user?.id,
      productId: product?.id,
      domainName: data.domainName,
      amount: product?.price,
      expiresAt,
    };

    const order = await this.prisma.order.create({
      data: orderData,
    });
    return {
      message: 'Order created successfully',
      data: order,
    };
  }

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
}
