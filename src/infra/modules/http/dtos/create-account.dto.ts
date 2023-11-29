import { IsEmail, IsString } from 'class-validator';

export class CreateAccountDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}
