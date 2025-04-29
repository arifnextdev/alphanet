import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
