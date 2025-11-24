import { Module } from '@nestjs/common';
import { OrderCustomerController } from './controllers/order.customer.controller';
import { OrderCustomerService } from './services/order.customer.service';
import { OrderAdminService } from './services/order.admin.service';
import { OrderAdminController } from './controllers/order.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '../common/collections';
import { OrderSchema } from './entities/order.entity';
import { ProductSchema } from '../product/entities/product.entity';

@Module({
  providers: [OrderAdminService, OrderCustomerService],
  controllers: [OrderAdminController, OrderCustomerController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collections.ORDER,
        schema: OrderSchema,
      },
      {
        name: Collections.PRODUCT,
        schema: ProductSchema,
      },
    ]),
  ],
})
export class OrderModule {}
