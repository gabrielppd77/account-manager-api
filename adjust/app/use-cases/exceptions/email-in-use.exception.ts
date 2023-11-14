import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor() {
    super('Email informado está em uso.', HttpStatus.BAD_REQUEST);
  }
}
