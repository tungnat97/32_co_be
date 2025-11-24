import { UserRole } from '../../../user/common/user.enum';

export class ReqUserDto {
  id: string;
  username: string;
  role: UserRole;
}
