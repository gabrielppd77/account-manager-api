import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'adjust/auth/jwt-auth.guard';

import { CurrentUser } from 'adjust/auth/current-user.decorator';
import { UserPayload } from 'adjust/auth/jwt.strategy';

import { PrismaService } from '@/infra/modules/prisma/prisma.service';

import { z } from 'zod';
import { ZodValidationPipe } from '@infra/modules/http/pipes/zod-validation.pipe';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;
    const userId = user.sub;
    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug: title,
      },
    });
  }
}
