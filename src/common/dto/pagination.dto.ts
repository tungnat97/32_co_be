import { Allow, IsNumber } from 'class-validator';

export class PaginationDto<T> {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @Allow()
  data: T[];

  @IsNumber()
  total: number;

  @IsNumber()
  totalPages: number;
}
