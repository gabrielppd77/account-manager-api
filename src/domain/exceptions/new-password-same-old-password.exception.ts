import { HttpException, HttpStatus } from '@nestjs/common';

export class NewPasswordSameOldPasswordException extends HttpException {
  constructor() {
    super(
      'The new password is the same as the old password.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
