export const totalPrice = (price: number, discount: number) => {
  return (price - (price * discount) / 100).toFixed(2);
};

export const totalDiscount = (price: number, discount: number) => {
  return ((price * discount) / 100).toFixed(2);
};

export const totalVat = (price: number, vat: number) => {
  return ((price * vat) / 100).toFixed(2);
};

export const totalTax = (price: number, tax: number) => {
  return ((price * tax) / 100).toFixed(2);
};

export const totalSubTotal = (
  price: number,
  discount: number,
  vat: number,
  tax: number,
) => {
  return (
    price - (price * discount) / 100 + (price * vat) / 100 + (price * tax) / 100
  );
};
