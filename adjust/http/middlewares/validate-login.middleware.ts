import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { validate } from 'class-validator';

import { LoginUserBody } from '../dtos/login-user-body';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginUserBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc: any, curr: any) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
