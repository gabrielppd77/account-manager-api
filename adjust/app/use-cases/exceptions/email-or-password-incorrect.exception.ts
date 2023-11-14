import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailOrPasswordIncorrectException extends HttpException {
  constructor() {
    super('Email ou senha inválidos.', HttpStatus.BAD_REQUEST);
  }
}
