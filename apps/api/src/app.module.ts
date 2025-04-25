import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './product/order/order.controller';
import { PaymentController } from './product/payment/payment.controller';
import { UserController } from './user/user.controller';
import { SettingController } from './product/setting/setting.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { OrderService } from './product/order/order.service';
import { PaymentService } from './product/payment/payment.service';
import { SettingService } from './product/setting/setting.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { OrderModule } from './product/order/order.module';

@Module({
  imports: [PrismaModule, ProductModule, OrderModule],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    OrderController,
    PaymentController,
    UserController,
    SettingController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    ProductService,
    OrderService,
    PaymentService,
    SettingService,
    PrismaService,
  ],
})
export class AppModule {}
