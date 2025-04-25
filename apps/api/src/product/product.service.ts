// src/modules/product/product.service.ts
import { Injectable, NotFoundException, Res, Response } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './common/dto';
import { response } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const products = await this.prisma.product.findMany({
      
    });
    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const product = await this.prisma.product.create({ data });
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });
    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({ where: { id } });
    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
