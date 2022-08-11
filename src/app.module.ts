import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './service/product/product.service';
import { ProductController } from './apis/product/product.controller';
import { CheckoutController } from './apis/checkout/checkout.controller';
import { CheckoutService } from './service/checkout/checkout.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CheckoutController],
  providers: [AppService, ProductService, CheckoutService],
})
export class AppModule {}
