import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductAdminController } from './controllers/product.admin.controller';
import { ProductCustomerController } from './controllers/product.customer.controller';
import { ProductCategoryAdminService } from './services/product-category.admin.service';
import { ProductAdminService } from './services/product.admin.service';
import { ProductCustomerService } from './services/product.customer.service';
import { Collections } from '../common/collections';
import { ProductSchema } from './entities/product.entity';
import { ProductCategorySchema } from './entities/product-category.entity';
import { ProductCategoryAdminController } from './controllers/product-category.admin.controller';

@Module({
  providers: [
    ProductAdminService,
    ProductCustomerService,
    ProductCategoryAdminService,
  ],
  controllers: [
    ProductCategoryAdminController,
    ProductAdminController,
    ProductCustomerController,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collections.PRODUCT,
        schema: ProductSchema,
      },
      {
        name: Collections.PRODUCT_CATEGORY,
        schema: ProductCategorySchema,
      },
    ]),
  ],
})
export class ProductModule {}
