import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'arif171042@gmail.com',
          pass: 'dsyh cbgc oyqh inkf', // ✅ App Password (not your actual password)
        },
      },
      defaults: {
        from: '"No Reply" <arif171042@gmail.com>', // better formatting
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
