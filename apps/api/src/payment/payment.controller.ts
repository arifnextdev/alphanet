import { Controller, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly payment: PaymentService) {}

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.payment.getPaymentById(id);
  }
}
