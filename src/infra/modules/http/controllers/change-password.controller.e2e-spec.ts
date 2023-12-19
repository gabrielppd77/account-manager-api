import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { PrismaService } from '@infra/modules/database/prisma/prisma.service';
import { AppModule } from '@infra/modules/app.module';

import { hash, compare } from 'bcryptjs';
import request from 'supertest';

describe('Change Password (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /change-password', async () => {
    const passwordAccount = '123456';
    const accountToCreate = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash(passwordAccount, 8),
    };

    const user = await prisma.account.create({
      data: accountToCreate,
    });

    const accessToken = jwt.sign({ sub: user.id });

    const newPassword = '654321';

    const response = await request(app.getHttpServer())
      .post('/change-password')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        oldPassword: passwordAccount,
        newPassword,
      });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const accountDB = await prisma.account.findUnique({
      where: {
        email: accountToCreate.email,
      },
    });

    if (!accountDB) {
      expect(accountDB).toBeTruthy();
      return;
    }

    const comparePassword = await compare(newPassword, accountDB.password);

    expect(comparePassword).toBeTruthy();
  });
});
