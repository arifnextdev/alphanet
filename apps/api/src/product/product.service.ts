// src/modules/product/product.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';

import { isUUID } from 'class-validator';

import { CreateProductDto, UpdateProductDto } from './common/dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll() {
    return this.productRepository.findAll();
  }

  async findById(id: string) {
    this.ensureValidUUID(id);
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(dto: CreateProductDto) {
    return this.productRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    this.ensureValidUUID(id);
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.update(id, dto);
  }

  async deleteProduct(id: string) {
    this.ensureValidUUID(id);
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.delete(id);
  }

  private ensureValidUUID(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }
  }
}
