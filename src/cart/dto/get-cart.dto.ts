import { PickType } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';

export class GetCartDto extends PickType(Cart, ['sessionId']) {}
