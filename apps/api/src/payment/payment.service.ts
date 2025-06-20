import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getPaymentById(id: string) {
    const paymentDetails = await this.prisma.payment.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        paidAt: true,
        method: true,
        currency: true,
        transId: true,
        tax: true,
        vat: true,
        discount: true,
        subtotal: true,
        orderId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        order: {
          select: {
            id: true,
            status: true,
            domainName: true,
            amount: true,
            expiresAt: true,
            product: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    return { ...paymentDetails };
  }
}
