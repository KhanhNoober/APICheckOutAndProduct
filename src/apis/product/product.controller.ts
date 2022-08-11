import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/all')
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get('/')
  async getProductById(@Query('id') id: string) {
    if (id === undefined) {
      throw new BadRequestException('Search query is required');
    }
    return await this.productService.getProductById(id);
  }

  @Get('/search')
  async getProductByTag(@Query('q') q: string) {
    if (q === undefined) {
      throw new BadRequestException('Search query is required');
    }
    const products = await this.productService.searchProducts(q);
    return products;
  }

  @Post('/')
  async addProduct(@Body() product: Product) {
    return await this.productService.addProduct(product);
  }

  @Put('/')
  async updateProduct(@Body() product: Product) {
    return await this.productService.updateProduct(product);
  }

  @Post('/delete')
  async deleteProduct(@Query('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
