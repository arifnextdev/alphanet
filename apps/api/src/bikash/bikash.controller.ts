// bkash.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BikashService } from './bikash.service';

@Controller('bkash')
export class BikashController {
  constructor(private readonly bikashService: BikashService) {}

  @Post('create')
  createPayment(@Body() body: { amount: string; invoice: string }) {
    return this.bikashService.createPayment(parseInt(body.amount), body.invoice);
  }

  @Post('execute')
  executePayment(@Body() body: { paymentID: string }) {
    return this.bikashService.executePayment(body.paymentID);
  }
}
