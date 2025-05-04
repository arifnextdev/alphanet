import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetUsersParams {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
}

export interface IOrder {
  id: string;
  userId: string;
  productId: string;
  domainName?: string;
  username?: string;
  password?: string;
  metadata?: string;
  status: string;
  amount?: number | null;
  paidAt?: Date | string | undefined; // ISO string (e.g. "2025-05-01T10:00:00Z")
  expiresAt?: Date | string; // ISO string
  //   createdAt: Date | string; // ISO str
}

export interface CreateOrderPayload {
  domainName?: string;
  userId: string;
  productId: string;
  username: string;
  email: string;
  password: string;
  metadata?: string;
}

interface IPagination {
  currentPage: number;
  perPage: number;
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface IGetUsersResponse {
  orders: IOrder[];
  pagination: IPagination;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<IGetUsersResponse, IGetUsersParams>({
      query: ({ limit = 10, page = 1, ...params }) => ({
        url: 'Orders',
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<Partial<IOrder>, CreateOrderPayload>({
      query: (data) => ({
        url: 'Orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi;
