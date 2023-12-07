import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type AccountPayload = z.infer<typeof tokenPayloadSchema>;

export const CurrentAccount = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as AccountPayload;
  },
);
