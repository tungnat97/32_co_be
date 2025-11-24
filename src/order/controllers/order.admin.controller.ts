import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuth } from '../../auth/decorators/basic-auth';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
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
  @ApiResponse({
    status: 200,
    description: 'List of all orders',
    type: PaginationDto<Order>,
  })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.orderAdminService.findAll(page, limit);
  }
}
