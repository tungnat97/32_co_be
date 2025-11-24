import { PickType } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';

export class UpdateCartDto extends PickType(Cart, ['sessionId', 'items']) {}
