import { IsString, IsEmail } from 'class-validator';

export class AuthenticateBodyDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
