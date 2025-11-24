import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '../common/collections';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserSchema } from '../user/entities/user.entity';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: '60m',
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Collections.USER,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
