import { IsEmail, IsString } from 'class-validator';

export class CreateAccountBodyDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}
