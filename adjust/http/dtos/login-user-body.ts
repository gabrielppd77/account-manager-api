import { IsString, IsEmail } from 'class-validator';

export class LoginUserBody {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
