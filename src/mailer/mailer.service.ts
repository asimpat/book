import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    // configure your email provider or SMTP server
    service: 'gmail',
    auth: {
      user: 'okonasim9@gmail.com',
      pass: 'rmzq fokw tzgm qscn',
    },
  });

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'rita@gmail.com',
      to: 'okonasim9@gmail.com',
      subject,
      text,
    });
  }
}
