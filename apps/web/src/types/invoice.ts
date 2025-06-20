export interface Product {
  name: string;
  type: string;
}

export interface User {
  email: string;
  name: string;
  phone: string;
}
export interface Order {
  id: string;
  domainName?: string;
  status: string;
  amount: number;
  expiresAt: string;
  product: Product;
}
export interface Payment {
  id: string;
  amount: number;
  tax: number;
  vat: number;
  discount: number;
  subtotal: number;
  status: 'paid' | 'pending' | 'failed';
  paidAt: string;
  transId: string;
  method: string;
  currency: string;
  user: User;
  order: Order;
}

export interface InvoiceData {
  id: string;
  amount: number;
  tax: number;
  vat: number;
  discount: number;
  subtotal: number;
  status: 'paid' | 'pending' | 'failed';
  paidAt: string;
  transId: string;
  method: string;
  currency: string;
  user: User;
  order: Order;
}

// export interface InvoiceData {
//   id: string;
//   domainName: string;
//   status: 'active' | 'expired' | 'pending';
//   amount: number;
//   paidAt: string;
//   expiresAt: string;
//   product: Product;
//   user: User;
//   payments: Payment[];
// }

export interface InvoiceProps {
  data: InvoiceData;
  companyName?: string;
  companyInfo?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
}
