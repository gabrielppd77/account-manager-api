import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFindException extends HttpException {
  constructor() {
    super('Account not find.', HttpStatus.BAD_REQUEST);
  }
}
