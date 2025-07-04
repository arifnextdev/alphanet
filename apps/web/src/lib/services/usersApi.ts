import { Phone } from 'lucide-react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetUsersParams {
  limit?: number;
  page?: number;
  status?: string;
  role?: string;
  search?: string;
}

export interface Payment {
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
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  provider: string;
  roles: string[];
  avatar?: string | null;
}

export interface Order {
  id: string;
  domainName: string;
  amount: number;
  paidAt: string | null;
  expiresAt: Date | null;
  status: string;
  product: {
    name: string;
    type: string;
  };
}

interface userinfo {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  status: string;
  phone: string;
  avatar: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  orders: Order[];
  payments: Payment[];
  loginHistories: any[];
  userInfo: userinfo;
}

export interface updateUser {
  name?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip: string;
  postalCode?: string;
  country?: string;
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
  users: IUser[];
  pagination: IPagination;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IGetUsersResponse, IGetUsersParams>({
      query: ({ limit = 10, page = 1, ...params }) => ({
        url: 'users',
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query<UserProfile, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    updateUser: builder.mutation<
      IUser,
      { id: string; data: Partial<updateUser> }
    >({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
