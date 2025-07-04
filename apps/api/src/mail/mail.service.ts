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
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { join } from 'path';
import * as html_to_pdf from 'html-pdf-node';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}
  private readonly Logger = new Logger(MailService.name);
  async sendEmail(
    email?: string,
    description?: string,
    subject?: string,
    userId?: string,
  ) {
    let userEmail;

    if (!email && userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      });
      if (!user || !user.email) {
        throw new Error('User not found or email not available');
      }
      userEmail = user.email;
    } else if (email) {
      userEmail = email;
    } else {
      throw new Error('Email or UserId must be provided');
    }

    const mailOptions = {
      to: userEmail,
      subject: subject || 'Order Confirmation',
      text: description,
    };

    this.Logger.log(
      `Sending email to ${userEmail} with subject "${mailOptions.subject}"`,
      MailService.name,
    );
    return this.mailerService.sendMail(mailOptions);
  }

  async sendBasicEmail({ to, subject, htmlContent }) {
    await this.mailerService.sendMail({
      to,
      subject,
      html: htmlContent, // Direct HTML body
    });
  }

  async sendOrderEmailWithInvoice(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        domainName: true,
        status: true,
        amount: true,
        paidAt: true,
        expiresAt: true,
        product: { select: { name: true, type: true } },
        user: { select: { email: true, name: true, phone: true } },
        payments: {
          select: {
            amount: true,
            tax: true,
            vat: true,
            discount: true,
            subtotal: true,
            status: true,
            paidAt: true,
            transId: true,
            method: true,
            currency: true,
          },
        },
      },
    });

    if (!order) throw new Error('Order not found');

    const filePath = join(__dirname, `../../invoices/invoice-${order.id}.pdf`);
    if (!fs.existsSync(join(__dirname, '../../invoices'))) {
      fs.mkdirSync(join(__dirname, '../../invoices'), { recursive: true });
    }

    const templatepath = join(__dirname, '../../invoices/template.html');

    let html = fs.readFileSync(templatepath, 'utf-8');
    html = html.replace('#INVOICEID', order.id);
    html = html.replace('#INVOICEDATE', new Date().toLocaleDateString());
    html = html.replace('#DOMAIN', order.domainName || 'N/A');
    html = html.replace('#STATUS', order.status);
    html = html.replace(
      '#EXPIRES',
      order.expiresAt ? order.expiresAt.toLocaleDateString() : 'N/A',
    );
    html = html.replace('#AMOUNT', order.amount.toString());
    html = html.replace('#UNITAMOUNT', order.amount.toString());
    html = html.replace('#SUBAMOUNT', order.amount.toString());
    html = html.replace('#PRODUCTNAME', order.product.name);
    html = html.replace('#PRODUCT', order.product.name);
    html = html.replace('#TYPE', order.product.type);
    html = html.replace('#NAME', order.user.name || 'N/A');
    html = html.replace('#EMAIL', order.user.email);
    html = html.replace('#PHONE', order.user.phone || 'N/A');
    html = html.replace('#PAYMENTSTATUS', order.payments[0].status || 'N/A');
    html = html.replace(
      '#PAID_AT',
      order.payments[0].paidAt
        ? order.payments[0].paidAt.toLocaleDateString()
        : 'N/A',
    );
    html = html.replace('#TRANSACTIONID', order.payments[0].transId || 'N/A');
    html = html.replace('#PAYMENTMETHOD', order.payments[0].method || 'N/A');
    html = html.replace('#CURRENCY', order.payments[0].currency || 'USD');
    html = html.replace(
      '#TOTAL',
      order.payments[0]?.subtotal ? order.payments[0].subtotal.toString() : '0',
    );
    html = html.replace(
      '#TAX',
      order.payments[0].tax ? order.payments[0].tax.toString() : '0',
    );
    html = html.replace(
      '#VAT',
      order.payments[0].vat ? order.payments[0].vat.toString() : '0',
    );
    html = html.replace(
      '#DISCOUNT',
      order.payments[0].discount ? order.payments[0].discount.toString() : '0',
    );
    html = html.replace(
      '#PAYMENTDATE',
      order.payments[0].paidAt
        ? order.payments[0].paidAt.toLocaleDateString()
        : 'N/A',
    );
    html = html.replace('#PAYMENTMETHOD', order.payments[0].method || 'CUSTOM');
    html = html.replace('TRANSACTIONID', order.payments[0].transId || 'N/A');
    html = html.replace('#PAYMENTSTATUS', order.payments[0].status || 'N/A');
    html = html.replace('#CURRENCY', order.payments[0].currency || 'BDT');

    const file = { content: html };

    const buffer = await html_to_pdf.generatePdf(file, {
      format: 'A4',
      printBackground: true,
    });

    //save the PDF to a file
    fs.writeFileSync(filePath, buffer);

    await this.mailerService.sendMail({
      to: 'arif171042@gmail.com',
      subject: `Invoice for Order ID: ${order.id}`,
      text: `Dear ${order.user.name},

Thank you for your order!

Order ID: ${order.id}
Product: ${order.product.name}
Total Paid: ${order.payments[0].subtotal} ${order.payments[0].currency}
Payment Method: ${order.payments[0].method}

Please find your invoice attached.

Regards,
Neyamot Enterprise Team`,
      attachments: [
        {
          filename: `invoice-${order.id}.pdf`,
          path: filePath,
        },
      ],
    });
  }
}
