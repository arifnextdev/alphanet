export type ProductType =
  | 'DOMAIN'
  | 'HOSTING'
  | 'SSL'
  | 'EMAIL'
  | 'VPS'
  | 'DEDICATED'
  | 'CLOUD'
  | 'SMS';

export type ProductConfigMap = {
  DOMAIN: { registrar: string };
  HOSTING: { disk: string; bandwidth: string };
  SSL: { provider: string };
  EMAIL: { accounts: string };
  VPS: { cpu: string; ram: string };
  DEDICATED: { cpu: string; ram: string };
  CLOUD: { cpu: string; ram: string };
  SMS: { smsCount: string };
};

// Use union of config types
export type ProductConfig = {
  DOMAIN: {
    registrar: string;
  };
  HOSTING: {
    disk: string;
    bandwidth: string;
  };
  SSL: {
    provider: string;
  };
  EMAIL: {
    accounts: string;
  };
  VPS: {
    cpu: string;
    ram: string;
  };
  DEDICATED: {
    cpu: string;
    ram: string;
  };
  CLOUD: {
    cpu: string;
    ram: string;
  };
  SMS: {
    smsCount: string;
  };
};

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface OrderType {
  id: string;
  userId: string;
  productId: string;
  domainName?: string;
  status: OrderStatus;
  amount: number;
  paidAt?: string; // ISO string (e.g. "2025-05-01T10:00:00Z")
  expiresAt?: string; // ISO string
  createdAt: string; // ISO string
}
