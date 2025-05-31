// bkash.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BikashService {
  private readonly baseURL = process.env.BKASH_BASE_URL;
  private readonly appKey = process.env.BKASH_APP_KEY;
  private readonly appSecret = process.env.BKASH_APP_SECRET;
  private readonly username = process.env.BKASH_USERNAME;
  private readonly password = process.env.BKASH_PASSWORD;
  // Test Sandbox
  private readonly createUrl = process.env.bkash_create_payment_url;
  private readonly executeUrl = process.env.bkash_execute_payment_url;
  private readonly cancelUrl = process.env.bkash_refund_transaction_url;

  private token: string;

  async getToken(): Promise<string> {
    const res = await axios.post(
      `${this.baseURL}/checkout/token/grant`,
      {
        app_key: this.appKey,
        app_secret: this.appSecret,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: this.username,
          password: this.password,
        },
      },
    );

    this.token = res.data.id_token;

    return this.token;
  }

  async createPayment(amount: number, paymentId: string) {
    const token = await this.getToken();

    try {
      const res = await axios.post(
        `${this.createUrl}`,
        {
          amount,
          mode: '0011',
          currency: 'BDT',
          payerReference: '1234',
          intent: 'sale',
          merchantInvoiceNumber: paymentId,
          callbackURL: 'http://localhost:3001/bikash/execute',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: token,
            'x-app-key': this.appKey,
          },
        },
      );

      console.log('res', res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong',
      };
    }
  }

  async executePayment(paymentID: string) {
    const token = await this.getToken();

    console.log('Payment Successfull');

    // const res = await axios.post(
    //   `${this.baseURL}/checkout/payment/execute/${paymentID}`,
    //   {},
    //   {
    //     headers: {
    //       authorization: token,
    //       'x-app-key': this.appKey,
    //     },
    //   },
    // );

    return;
  }
}
