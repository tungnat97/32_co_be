import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Collections } from '../../common/collections';
import { UserRole } from '../../user/common/user.enum';
import { User } from '../../user/entities/user.entity';

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Collections.USER)
    private readonly userModel: Model<User>,
  ) {
    super({
      // Method to extract the JWT from the Authorization header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // NestJS will handle expiration verification for us
      ignoreExpiration: false,
      // Must match the secret used in JwtModule.register()
      secretOrKey: configService.get<string>('jwt.secret')!,
    });
  }

  // The 'validate' method is executed after the token is verified (signature and expiration)
  async validate(payload: JwtPayload) {
    // Optionally, you can look up the user in the database here using payload.userId
    // If the user is found, return the user object; otherwise, throw UnauthorizedException

    // For this simple example, we just return the decoded payload
    const user = await this.userModel.exists({
      _id: payload.id,
      username: payload.username,
      role: payload.role,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return payload;
  }
}
