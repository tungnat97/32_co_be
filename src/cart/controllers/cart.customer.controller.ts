import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerAuth } from '../../auth/decorators/basic-auth';
import { ReqUser } from '../../auth/decorators/req-user';
import { ApiRecordResponse } from '../../auth/decorators/response';
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
  @ApiOperation({
    summary: 'Update customer cart',
    description: 'Update the items in the customer cart.',
  })
  @ApiRecordResponse(Cart, 'Cart has been updated successfully')
  async updateCart(
    @ReqUser() customer: ReqUserDto,
    @Body() data: UpdateCartDto,
  ) {
    return this.cartCustomerService.updateCart(customer, data);
  }

  @Post('by-session')
  @ApiRecordResponse(
    Cart,
    'Cart has been retrieved/created successfully by session',
  )
  @ApiOperation({
    summary: 'Get or create cart by session',
    description:
      'Retrieve an existing cart by session ID or create a new one if it does not exist.',
  })
  async getCartBySession(
    @ReqUser() customer: ReqUserDto,
    @Body() data: GetCartDto,
  ) {
    return this.cartCustomerService.getCartBySession(customer, data);
  }
}
