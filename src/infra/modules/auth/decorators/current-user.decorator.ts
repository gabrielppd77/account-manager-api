import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as UserPayload;
  },
);
