import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqUser } from '../../auth/decorators/req-user';
import { ReqUserDto } from '../../auth/dto/response/req-user.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderCustomerService } from '../services/order.customer.service';
import { Order } from '../entities/order.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CustomerGuard } from '../../auth/guards/customer.guard';
import { CustomerAuth } from '../../auth/decorators/basic-auth';

@Controller('customer/orders')
@ApiTags('customer orders')
@UseGuards(CustomerGuard)
@CustomerAuth()
export class OrderCustomerController {
  constructor(private readonly orderCustomerService: OrderCustomerService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Order has been placed successfully',
    type: Order,
  })
  async placeOrder(
    @ReqUser() customer: ReqUserDto,
    @Body() data: CreateOrderDto,
  ) {
    return this.orderCustomerService.createOrder(customer, data);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of customer orders',
    type: PaginationDto<Order>,
  })
  async findAll(
    @ReqUser() customer: ReqUserDto,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.orderCustomerService.findAll(customer, page, limit);
  }
}
