import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roles: string[];
  status: string;
}

// Product info inside order
interface ProductInfo {
  name: string;
  billingCycle: string;
  price: number;
  discount: number;
  tax: number;
  vat: number;
}

// Order info inside payment
interface OrderInfo {
  id: string;
  domainName: string;
  amount: number;
  paidAt: string | null;
  expiresAt: string | null;
  status: string;
  user: UserInfo;
  product: ProductInfo;
}

// Single payment transaction
export interface Transaction {
  id: string;
  amount: number;
  method: string;
  transId: string;
  currency: string;
  tax: number;
  vat: number;
  discount: number;
  subtotal: number;
  status: string;
  createdAt: string;
  paidAt: string | null;
  metadata: Record<string, any>;
  order: OrderInfo;
}

// Summary totals
export interface TransactionSummary {
  totalAmount?: number;
  totalTax?: number;
  totalVat?: number;
  totalDiscount?: number;
}

// Final response shape
export interface FilteredTransactionResponse {
  transactions: Transaction[];
  summary: TransactionSummary;
}

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
  discount: number;
  vat: number;
  tax: number;
  subTotal: number;
  paidAt?: Date | string | undefined; // ISO string (e.g. "2025-05-01T10:00:00Z")
  expiresAt?: Date | string; // ISO string
  //   createdAt: Date | string; // ISO str
}

export interface CreateOrderPayload {
  domainName?: string;
  userId: string;
  productId: string;
  username?: string;
  email?: string;
  password?: string;
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

interface IFilterParams {
  dateRange?: string;
  status?: string;
  limit?: number;
  page?: number;
}

interface IGetUsersResponse {
  orders: IOrder[];
  pagination: IPagination;
}
interface OrderResponse {
  checkOutUrl: string;
  bkashURL: string;
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
    createOrder: builder.mutation<Partial<OrderResponse>, CreateOrderPayload>({
      query: (data) => ({
        url: 'Orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderById: builder.query<IOrder, string>({
      query: (id) => ({
        url: `Orders/${id}`,
      }),
    }),
    getFilterTransection: builder.query<
      FilteredTransactionResponse,
      IFilterParams
    >({
      query: ({ limit = 10, page = 1, ...params }) => ({
        url: 'Orders/transection/details',
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetFilterTransectionQuery,
} = ordersApi;
