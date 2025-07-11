import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderSchema,
  GetFilterDto,
  GetOrderDto,
  OrederCreateDto,
} from '../common/dto/order.dto';
import { ZodValidationPipe } from '../common/zodValidationPipe';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Query() query: GetOrderDto) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateOrderSchema))
  createOrder(@Body() data: OrederCreateDto,) {
    return this.orderService.createOrder(data);
  }

   @Patch(':id/status')
  updateOrderStatus(@Body() status: string, @Param('id') id: string) {
    return this.orderService.updatedOrderStatus(id, status);
  }

  @Put(':id')
  updateOrder(@Param('id') id: string) {
    return this.orderService.updateOrder(id);
  }

 

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get('/transection/details')
  getTransaction(@Query() query: GetFilterDto) {
    return this.orderService.getTransaction(query);
  }
}
