import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Account credentials dot not match.', HttpStatus.UNAUTHORIZED);
  }
}
