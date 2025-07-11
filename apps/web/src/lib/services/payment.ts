import { InvoiceData } from '@/types/invoice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    getPaymentById: builder.query<InvoiceData, string>({
      query: (id) => ({
        url: `payments/${id}`,
      }),
    }),
    
  }),
});

export const { useGetPaymentByIdQuery } =
  paymentApi;
