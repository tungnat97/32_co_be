import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function CustomerAuth() {
  return applyDecorators(ApiBearerAuth('customer-auth'));
}

export function AdminAuth() {
  return applyDecorators(ApiBearerAuth('admin-auth'));
}
