import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductService],
})
export class ProductModule {}
