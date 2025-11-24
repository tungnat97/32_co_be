import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerAuth } from '../../auth/decorators/basic-auth';
import { ReqUser } from '../../auth/decorators/req-user';
import { ReqUserDto } from '../../auth/dto/response/req-user.dto';
import { CustomerGuard } from '../../auth/guards/customer.guard';
import { GetCartDto } from '../dto/get-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { Cart } from '../entities/cart.entity';
import { CartCustomerService } from '../services/cart.customer.service';

@Controller('customer/cart')
@ApiTags('customer cart')
@UseGuards(CustomerGuard)
@CustomerAuth()
export class CartCustomerController {
  constructor(private readonly cartCustomerService: CartCustomerService) {}

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Cart has been updated successfully',
    type: Cart,
  })
  async updateCart(
    @ReqUser() customer: ReqUserDto,
    @Body() data: UpdateCartDto,
  ) {
    return this.cartCustomerService.updateCart(customer, data);
  }

  @Post('by-session')
  @ApiResponse({
    status: 200,
    description: 'Cart has been retrieved/created successfully by session',
    type: Cart,
  })
  async getCartBySession(
    @ReqUser() customer: ReqUserDto,
    @Body() data: GetCartDto,
  ) {
    return this.cartCustomerService.getCartBySession(customer, data);
  }
}
