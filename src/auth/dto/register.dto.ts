import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/common/user.enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
