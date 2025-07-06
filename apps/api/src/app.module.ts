import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { BikashModule } from './bikash/bikash.module';
import { CupponModule } from './cuppon/cuppon.module';
import { JobsModule } from './jobs/jobs.module';
import { OrderReminderService } from './jobs/order-reminder/order-reminder.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderController } from './product/order/order.controller';
import { OrderModule } from './product/order/order.module';
import { OrderService } from './product/order/order.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { SettingController } from './product/setting/setting.controller';
import { SettingService } from './product/setting/setting.service';
import { TasksModule } from './tasks/tasks.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

import { ConfigModule } from './config/config.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TasksModule,
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderModule,
    UserModule,
    CupponModule,
    JobsModule,
    MailModule,
    BikashModule,
    PaymentModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    OrderController,
    UserController,
    SettingController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    ProductService,
    OrderService,
    SettingService,
    PrismaService,
    OrderReminderService,
    MailService,
    JwtService
  ],
})
export class AppModule {}
