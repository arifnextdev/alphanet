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
