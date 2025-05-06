// // src/mail/mail.service.ts

// import { Injectable, Logger } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import * as PDFDocument from 'pdfkit';
// import * as fs from 'fs';
// import * as path from 'path';

// @Injectable()
// export class MailService {
//   private readonly logger = new Logger(MailService.name);
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.example.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'your@email.com',
//         pass: 'yourpassword',
//       },
//     });
//   }

//   private generateInvoicePDF(order: any): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const doc = new PDFDocument();
//       const filePath = path.join(__dirname, `invoice-${order.id}.pdf`);
//       const stream = fs.createWriteStream(filePath);

//       doc.pipe(stream);

//       doc.fontSize(20).text('Invoice', { align: 'center' });
//       doc.moveDown();
//       doc.fontSize(12).text(`Order ID: ${order.id}`);
//       doc.text(`Customer Name: ${order.customerName}`);
//       doc.text(`Amount: $${order.amount}`);
//       doc.text(`Date: ${new Date().toLocaleDateString()}`);

//       doc.end();

//       stream.on('finish', () => resolve(filePath));
//       stream.on('error', (err) => reject(err));
//     });
//   }

//   private async sendMailWithAttachment(
//     to: string,
//     subject: string,
//     html: string,
//     attachmentPath: string,
//   ) {
//     try {
//       const info = await this.transporter.sendMail({
//         from: '"Your App Name" <your@email.com>',
//         to,
//         subject,
//         html,
//         attachments: [
//           {
//             filename: path.basename(attachmentPath),
//             path: attachmentPath,
//           },
//         ],
//       });

//       this.logger.log(`Email sent: ${info.messageId}`);

//       // Optional: Clean up the PDF file
//       fs.unlink(attachmentPath, (err) => {
//         if (err)
//           this.logger.warn(`Failed to delete temp file: ${attachmentPath}`);
//       });
//     } catch (error) {
//       this.logger.error(`Failed to send email: ${error.message}`, error.stack);
//     }
//   }

//   async sendInvoiceReminder(order: any) {
//     const subject = `Invoice Reminder for Order #${order.id}`;
//     const html = `<p>Hello ${order.customerName},</p>
//                   <p>Please find attached the invoice for your order.</p>`;

//     const pdfPath = await this.generateInvoicePDF(order);
//     await this.sendMailWithAttachment(order.email, subject, html, pdfPath);
//   }

//   async sendExpiryNotice(order: any) {
//     const subject = `Subscription Expiry Notice for ${order.product}`;
//     const html = `<p>Dear ${order.customerName},</p>
//                   <p>Your subscription for ${order.product} will expire on ${order.expiryDate}.</p>`;

//     await this.sendMailWithAttachment(order.email, subject, html, ''); // No attachment
//   }
// }

// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBasicEmail(to: string, subject: string, htmlContent: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      html: htmlContent, // Direct HTML body
    });
  }
}
