import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MailModule } from 'src/mail/mail.module';
import { BikashModule } from 'src/bikash/bikash.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MailModule,
    BikashModule,
    
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, HttpModule],
})
export class OrderModule {}
