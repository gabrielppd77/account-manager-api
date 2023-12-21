import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, message: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'email@email.com',
      subject: 'Enviando Email com NestJS',
      html: `<h3 style="color: red">${message}</h3>`,
    });
  }
}
