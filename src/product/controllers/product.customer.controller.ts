import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCustomerService } from '../services/product.customer.service';
import { CustomerGuard } from '../../auth/guards/customer.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { CustomerAuth } from '../../auth/decorators/basic-auth';

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
  @ApiResponse({
    status: 200,
    description: 'List of available products',
    type: PaginationDto<Product>,
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
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: Product,
  })
  async findById(@Param('id') id: string) {
    return this.productCustomerService.findById(id);
  }
}
