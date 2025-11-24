import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminAuth } from '../../auth/decorators/basic-auth';
import {
  ApiPaginatedResponse,
  ApiRecordResponse,
} from '../../auth/decorators/response';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductAdminService } from '../services/product.admin.service';

@Controller('admin/products')
@ApiTags('admin products')
@UseGuards(AdminGuard)
@AdminAuth()
export class ProductAdminController {
  constructor(private readonly productAdminService: ProductAdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product with the provided details.',
  })
  @ApiRecordResponse(Product, 'Product has been created successfully', 201)
  async create(@Body() dto: CreateProductDto): Promise<any> {
    return this.productAdminService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiPaginatedResponse(Product, 'List of all products')
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieve a paginated list of all products in the system.',
  })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<any> {
    return this.productAdminService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product details',
    description:
      'Retrieve detailed information about a specific product by its ID.',
  })
  @ApiRecordResponse(Product, 'Product details')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.productAdminService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a product',
    description: 'Update the details of an existing product by its ID.',
  })
  @Put(':id')
  @ApiRecordResponse(Product, 'Product has been updated successfully')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<any> {
    return this.productAdminService.update(id, dto);
  }

  @Delete(':id')
  @ApiRecordResponse(Product, 'Product has been deleted successfully')
  async delete(@Param('id') id: string): Promise<any> {
    return this.productAdminService.delete(id);
  }
}
