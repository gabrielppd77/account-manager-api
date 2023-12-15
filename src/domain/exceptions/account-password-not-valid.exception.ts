import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountPasswordNotValidException extends HttpException {
  constructor() {
    super('Old password is not valid.', HttpStatus.BAD_REQUEST);
  }
}
