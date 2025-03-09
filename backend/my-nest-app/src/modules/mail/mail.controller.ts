import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('send-mailer')
  @HttpCode(HttpStatus.OK)
  async sendMailer() {
    const res = await this.mailService.sendMailer({
      to: 'banv.drei@gmail.com',
      subject: 'Forgot password: User Password Recovery',
      template: 'forgot-password',
      context: {
        name: 'Nguyen Van A',
        otp: '123456',
      },
    });

    return { message: 'Send mail success.', data: res };
  }
}
