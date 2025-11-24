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
import { AdminAuth } from '../../auth/decorators/basic-auth';
import {
  ApiPaginatedResponse,
  ApiRecordResponse,
} from '../../auth/decorators/response';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoryAdminService } from '../services/product-category.admin.service';

@Controller('admin/product-categories')
@ApiTags('admin product categories')
@UseGuards(AdminGuard)
@AdminAuth()
export class ProductCategoryAdminController {
  constructor(
    private readonly productCategoryAdminService: ProductCategoryAdminService,
  ) {}

  @Post()
  @ApiRecordResponse(
    ProductCategory,
    'Product category has been created successfully',
    201,
  )
  @ApiOperation({
    summary: 'Create product category',
    description: 'Create a new product category',
  })
  async create(@Body() dto: CreateProductCategoryDto): Promise<any> {
    return this.productCategoryAdminService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiPaginatedResponse(ProductCategory, 'List of all product categories')
  @ApiOperation({
    summary: 'Get all product categories',
    description: 'Get all product categories',
  })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<any> {
    return this.productCategoryAdminService.findAll(page, limit);
  }
}
