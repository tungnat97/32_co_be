import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerAuth } from '../../auth/decorators/basic-auth';
import {
  ApiPaginatedResponse,
  ApiRecordResponse,
} from '../../auth/decorators/response';
import { CustomerGuard } from '../../auth/guards/customer.guard';
import { Product } from '../entities/product.entity';
import { ProductCustomerService } from '../services/product.customer.service';

@Controller('customer/products')
@ApiTags('customer products')
@UseGuards(CustomerGuard)
@CustomerAuth()
export class ProductCustomerController {
  constructor(
    private readonly productCustomerService: ProductCustomerService,
  ) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'upperPrice', required: false, type: Number })
  @ApiQuery({ name: 'lowerPrice', required: false, type: Number })
  @ApiPaginatedResponse(Product, 'List of available products')
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieve a paginated list of all available products.',
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: string,
    @Query('upperPrice') upperPrice?: number,
    @Query('lowerPrice') lowerPrice?: number,
  ) {
    return this.productCustomerService.findAll(
      page,
      limit,
      categoryId,
      upperPrice,
      lowerPrice,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product details',
    description: 'Retrieve the details of a specific product.',
  })
  @ApiRecordResponse(Product, 'Product details')
  async findById(@Param('id') id: string) {
    return this.productCustomerService.findById(id);
  }
}
