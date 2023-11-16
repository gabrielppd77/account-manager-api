import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmailAlreadyExistsException extends HttpException {
  constructor() {
    super('User with same e-mail address already exists.', HttpStatus.CONFLICT);
  }
}
