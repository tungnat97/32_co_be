import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuth } from '../../auth/decorators/basic-auth';
import { ApiPaginatedResponse } from '../../auth/decorators/response';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { Order } from '../entities/order.entity';
import { OrderAdminService } from '../services/order.admin.service';

@Controller('admin/orders')
@ApiTags('admin orders')
@UseGuards(AdminGuard)
@AdminAuth()
export class OrderAdminController {
  constructor(private readonly orderAdminService: OrderAdminService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiPaginatedResponse(Order, 'List of all orders')
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Retrieve a paginated list of all orders in the system.',
  })
  @ApiExtraModels(Order)
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.orderAdminService.findAll(page, limit);
  }
}
