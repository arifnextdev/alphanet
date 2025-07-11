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
  paymentsPagination: {
    currentPage: number;
    perPage: number;
    totalPayments: number;
    totalPages: number;
  };
  ordersPagination: {
    currentPage: number;
    perPage: number;
    totalOrders: number;
    totalPages: number;
}
}

export interface updateUser {
  name?: string;
  phone?: string;
  roles?: string[];
  status?: string;
  avatar?: string | null;
  email?: string;
  userInfo?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
  status?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface ResetPasswordDto {
  password: string;
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
    getUserById: builder.query<UserProfile, {
      id: string;
      orderPage?: number;
      orderLimit?: number;
      paymentPage?: number;
      paymentLimit?: number;
    }>({
      query: ({ id, orderPage = 1, orderLimit = 10, paymentPage = 1, paymentLimit = 10 }) => ({
        url: `users/${id}`,
        params: {
          orderPage,
          orderLimit,
          paymentPage,
          paymentLimit,
        },
      }),
    }),
    createUser: builder.mutation<IUser, CreateUser>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
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
    toggleUserStatus: builder.mutation<IUser, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `users/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Users'],
    }),
    changeUserRole: builder.mutation<IUser, { id: string; roles: string[] }>({
      query: ({ id, roles }) => ({
        url: `users/${id}/roles`,
        method: 'PATCH',
        body: { roles },
      }),
      invalidatesTags: ['Users'],
    }),
    resetPassword: builder.mutation<
      IUser,
      { id: string; data: ResetPasswordDto }
    >({
      query: ({ id, data }) => ({
        url: `users/${id}/reset-password`,
        method: 'PATCH',
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
  useCreateUserMutation,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
  useChangeUserRoleMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
} = usersApi;
