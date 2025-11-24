import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ReqUserDto } from '../dto/response/req-user.dto';

export const ReqUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<ReqUserDto> => {
    // 1. Get the current HTTP request object
    const request = ctx.switchToHttp().getRequest<Request>();

    // 2. Extract and transform the required data
    // NOTE: This is where you implement your custom logic to get data from headers,
    // session, or the request object itself.

    const user: ReqUserDto = plainToClass(ReqUserDto, request['userPayload']);
    try {
      await validate(user);
    } catch (err) {
      console.error('Validation failed for ReqUserDto:', err);
      throw err;
    }
    return user;
  },
);
