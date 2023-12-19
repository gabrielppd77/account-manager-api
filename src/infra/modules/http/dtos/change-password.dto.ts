import { IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  newPassword: string;
  @IsString()
  oldPassword: string;
}
