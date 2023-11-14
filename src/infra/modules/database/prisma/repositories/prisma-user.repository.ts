import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';
import { User } from '@domain/entities/user';

import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const userFinded = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userFinded) return null;
    return PrismaUserMapper.toDomain(userFinded);
  }
  async create(user: User): Promise<void> {
    const userToPrisma = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({ data: userToPrisma });
  }
}
