import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  CurrentAccount,
  AccountPayload,
} from '../decorators/current-account.decorator';

import { ChangePassword } from '@domain/use-cases/change-password';
import { ChangePasswordDTO } from '../dtos/change-password.dto';

@Controller('/change-password')
export class ChangePasswordController {
  constructor(private changePassword: ChangePassword) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: ChangePasswordDTO,
    @CurrentAccount() account: AccountPayload,
  ): Promise<void> {
    const { newPassword, oldPassword } = body;

    await this.changePassword.execute({
      accountId: account.sub,
      newPassword,
      oldPassword,
    });
  }
}
