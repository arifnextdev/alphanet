import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderController } from './product/order/order.controller';
import { OrderModule } from './product/order/order.module';
import { OrderService } from './product/order/order.service';
import { PaymentController } from './product/payment/payment.controller';
import { PaymentService } from './product/payment/payment.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { SettingController } from './product/setting/setting.controller';
import { SettingService } from './product/setting/setting.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductModule, OrderModule, UserModule],
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
