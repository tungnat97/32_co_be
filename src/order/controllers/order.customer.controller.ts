import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerAuth } from '../../auth/decorators/basic-auth';
import { ReqUser } from '../../auth/decorators/req-user';
import {
  ApiPaginatedResponse,
  ApiRecordResponse,
} from '../../auth/decorators/response';
import { ReqUserDto } from '../../auth/dto/response/req-user.dto';
import { CustomerGuard } from '../../auth/guards/customer.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrderCustomerService } from '../services/order.customer.service';

@Controller('customer/orders')
@ApiTags('customer orders')
@UseGuards(CustomerGuard)
@CustomerAuth()
export class OrderCustomerController {
  constructor(private readonly orderCustomerService: OrderCustomerService) {}

  @Post()
  @ApiRecordResponse(Order, 'Order has been placed successfully', 201)
  @ApiOperation({
    summary: 'Place a new order',
    description: 'Create a new order with the provided details.',
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
  @ApiPaginatedResponse(Order, 'List of customer orders')
  @ApiOperation({
    summary: 'Get all orders for the customer',
    description:
      'Retrieve a paginated list of all orders for the authenticated customer.',
  })
  async findAll(
    @ReqUser() customer: ReqUserDto,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.orderCustomerService.findAll(customer, page, limit);
  }
}
