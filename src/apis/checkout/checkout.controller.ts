import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ShoppingCard } from 'src/models/shoppingcard.model';
import { CheckoutService } from 'src/service/checkout/checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post('/')
  async addCheckOut(@Body() checkOut: ShoppingCard) {
    return await this.checkoutService.addCheckOut(checkOut);
  }

  @Get('/')
  async getCheckOutByID(@Query('id') id: string) {
    if (id === undefined) {
      throw new BadRequestException('Search query is required');
    }
    return await this.checkoutService.getCheckOut(id);
  }

  @Get('/all')
  async getCheckOuts() {
    return await this.checkoutService.getCheckOuts();
  }

  @Get('/delete')
  async deleteCheckOut(@Query('id') id: string) {
    return await this.checkoutService.deleteCheckOut(id);
  }

  @Put('/')
  async updateCheckOut(@Body() checkOut: ShoppingCard) {
    return await this.checkoutService.updateCheckOut(checkOut);
  }
}
