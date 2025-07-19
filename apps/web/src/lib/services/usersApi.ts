// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface IGetUsersParams {
//   limit?: number;
//   page?: number;
//   status?: string;
//   role?: string;
//   search?: string;
// }

// export interface Payment {
//   id: string;
//   amount: number;
//   method: string;
//   transId: string;
//   currency: string;
//   tax: number;
//   vat: number;
//   discount: number;
//   subtotal: number;
//   status: string;
//   createdAt: string;
//   paidAt: string | null;
// }

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   status: string;
//   provider: string;
//   roles: string[];
//   avatar?: string | null;
// }

// export interface Order {
//   id: string;
//   domainName: string;
//   amount: number;
//   paidAt: string | null;
//   expiresAt: Date | null;
//   status: string;
//   product: {
//     name: string;
//     type: string;
//   };
// }

// export interface LoginHistory {
//   id: string;
//   attempt: string;
//   ip: string;
//   country: string;
//   userAgent: string;
//   createdAt: string;
// }

// export interface updateUser {
//   name?: string;
//   phone?: string;
//   roles?: string[];
//   status?: string;
//   avatar?: string | null;
//   email?: string;
// }

// export interface CreateUser {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   roles: string[];
//   status?: string;
//   street?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;
// }

// export interface ResetPasswordDto {
//   password: string;
// }

// interface IPagination {
//   currentPage: number;
//   perPage: number;
//   totalUsers: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
//   nextPage: number | null;
//   prevPage: number | null;
// }

// interface IGetUsersResponse {
//   users: IUser[];
//   pagination: IPagination;
// }

// export const usersApi = createApi({
//   reducerPath: 'usersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
//   tagTypes: ['Users'],
//   endpoints: (builder) => ({
//     getUsers: builder.query<IGetUsersResponse, IGetUsersParams>({
//       query: ({ limit = 10, page = 1, ...params }) => ({
//         url: 'users',
//         params: {
//           limit,
//           page,
//           ...params,
//         },
//       }),
//       providesTags: ['Users'],
//     }),
//     getUserById: builder.query<UserProfile, { id: string }>({
//       query: ({ id }) => `users/${id}`,
//     }),
//     getOrdersByUser: builder.query<
//       OrdersByUserResponse,
//       { id: string; page?: number; limit?: number }
//     >({
//       query: ({ id, page = 1, limit = 10 }) =>
//         `users/${id}/orders?page=${page}&limit=${limit}`,
//     }),
//     getTransactionsByUser: builder.query<
//       TransactionsByUserResponse,
//       { id: string; page?: number; limit?: number }
//     >({
//       query: ({ id, page = 1, limit = 10 }) =>
//         `users/${id}/transactions?page=${page}&limit=${limit}`,
//     }),
//     createUser: builder.mutation<IUser, CreateUser>({
//       query: (data) => ({
//         url: 'users',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Users'],
//     }),
//     updateUser: builder.mutation<
//       IUser,
//       { id: string; data: Partial<updateUser> }
//     >({
//       query: ({ id, data }) => ({
//         url: `users/${id}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Users'],
//     }),
//     toggleUserStatus: builder.mutation<IUser, { id: string; status: string }>({
//       query: ({ id, status }) => ({
//         url: `users/${id}/status`,
//         method: 'PATCH',
//         body: { status },
//       }),
//       invalidatesTags: ['Users'],
//     }),
//     changeUserRole: builder.mutation<IUser, { id: string; roles: string[] }>({
//       query: ({ id, roles }) => ({
//         url: `users/${id}/roles`,
//         method: 'PATCH',
//         body: { roles },
//       }),
//       invalidatesTags: ['Users'],
//     }),
//     resetPassword: builder.mutation<
//       IUser,
//       { id: string; data: ResetPasswordDto }
//     >({
//       query: ({ id, data }) => ({
//         url: `users/${id}/reset-password`,
//         method: 'PATCH',
//         body: data,
//       }),
//       invalidatesTags: ['Users'],
//     }),
//     deleteUser: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `users/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Users'],
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useGetUserByIdQuery,
//   useGetOrdersByUserQuery,
//   useGetTransactionsByUserQuery,
//   useCreateUserMutation,
//   useUpdateUserMutation,
//   useToggleUserStatusMutation,
//   useChangeUserRoleMutation,
//   useResetPasswordMutation,
//   useDeleteUserMutation,
// } = usersApi;

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
  expiresAt: string | null;
  status: string;
  product: {
    name: string;
    type: string;
  };
}
export interface ResetPassword {
  password: string;
}

interface userinfo {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
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
  userInfo: userinfo;
}

export interface updateUser {
  name?: string;
  phone?: string;
  street?: string;
  roles?: string[];
  status?: string;
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

interface IGetOrdersParams {
  id: string;
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
}

interface IGetOrdersResponse {
  data: Order[];
  pagination: IPagination;
}

interface IGetPaymentsResponse {
  data: Payment[];
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
      providesTags: ['Users'],
    }),
    getOrdersByUserId: builder.query<IGetOrdersResponse, IGetOrdersParams>({
      query: ({ id, limit = 10, page = 1, ...params }) => ({
        url: `users/${id}/orders`,
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Users'],
    }),
    getTransactionsByUserId: builder.query<
      IGetPaymentsResponse,
      IGetOrdersParams
    >({
      query: ({ id, limit = 10, page = 1, ...params }) => ({
        url: `users/${id}/transactions`,
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Users'],
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
    resetPassword: builder.mutation<IUser, { id: string; data: ResetPassword }>(
      {
        query: ({ id, data }) => ({
          url: `users/${id}/reset-password`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Users'],
      },
    ),
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
  useGetOrdersByUserIdQuery,
  useGetTransactionsByUserIdQuery,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
  useChangeUserRoleMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
} = usersApi;
