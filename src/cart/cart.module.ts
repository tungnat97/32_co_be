import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Collections } from '../common/collections';
import { CartCustomerController } from './controllers/cart.customer.controller';
import { CartSchema } from './entities/cart.entity';
import { CartCustomerService } from './services/cart.customer.service';

@Module({
  providers: [CartCustomerService],
  controllers: [CartCustomerController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collections.CART,
        schema: CartSchema,
      },
    ]),
  ],
})
export class CartModule {}
