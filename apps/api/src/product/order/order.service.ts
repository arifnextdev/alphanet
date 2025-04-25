import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrederCreateDto } from '../common/dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async createOrder(data: OrederCreateDto) {
    const order = await this.prisma.order.create({
      data,
    });
    return order;
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
    return order;
  }
}
