import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountEmailAlreadyExistsException extends HttpException {
  constructor() {
    super(
      'Account with same e-mail address already exists.',
      HttpStatus.CONFLICT,
    );
  }
}
