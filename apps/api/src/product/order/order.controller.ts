import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderSchema, OrederCreateDto } from '../common/dto/order.dto';
import { ZodValidationPipe } from '../common/zodValidationPipe';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderSchema))
  createOrder(@Body() data: OrederCreateDto) {
    return this.orderService.createOrder(data);
  }

  @Put(':id')
  updateOrder(@Param('id') id: string) {
    return this.orderService.updateOrder(id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
