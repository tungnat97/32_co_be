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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuth } from '../../auth/decorators/basic-auth';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
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
  @ApiResponse({
    status: 201,
    description: 'Product has been created successfully',
    type: Product,
  })
  async create(@Body() dto: CreateProductDto): Promise<any> {
    return this.productAdminService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: PaginationDto<Product>,
  })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<any> {
    return this.productAdminService.findAll(page, limit);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: Product,
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.productAdminService.findById(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Product has been updated successfully',
    type: Product,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<any> {
    return this.productAdminService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Product has been deleted successfully',
    type: Product,
  })
  async delete(@Param('id') id: string): Promise<any> {
    return this.productAdminService.delete(id);
  }
}
