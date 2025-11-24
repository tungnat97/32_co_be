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
import { AdminAuth } from '../../auth/decorators/basic-auth';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
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
  @ApiResponse({
    status: 201,
    description: 'Product category has been created successfully',
    type: ProductCategory,
  })
  async create(@Body() dto: CreateProductCategoryDto): Promise<any> {
    return this.productCategoryAdminService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of all product categories',
    type: PaginationDto<ProductCategory>,
  })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<any> {
    return this.productCategoryAdminService.findAll(page, limit);
  }
}
