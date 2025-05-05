import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CupponModule } from './cuppon/cuppon.module';
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
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { OrderReminderService } from './jobs/order-reminder/order-reminder.service';
import { MailService } from './mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderModule,
    UserModule,
    CupponModule,
    JobsModule,
    MailModule,
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
  ],
})
export class AppModule {}
