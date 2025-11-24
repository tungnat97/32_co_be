import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Collections } from '../common/collections';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Collections.USER)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  register(data: RegisterDto) {
    // Do a simple insert to the database

    // Hash the password
    bcrypt.hash(data.password, 10, async (err, hash) => {
      if (err) {
        throw err;
      } else {
        const res = await this.userModel.create({
          ...data,
          password: hash,
        });
        return res.toJSON();
      }
    });
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    // Find the user by email and password
    try {
      const user = await this.userModel.findOne({ username: data.username });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      // Return access token
      return {
        accessToken: await this.jwtService.signAsync({
          id: user._id,
          username: user.username,
          role: user.role,
        }),
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
