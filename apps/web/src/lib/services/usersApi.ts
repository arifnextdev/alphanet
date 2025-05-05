import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetUsersParams {
  limit?: number;
  page?: number;
  status?: string;
  role?: string;
  search?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  status: string;
  roles: string[];
  avatar?: string | null;
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
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    updateUser: builder.mutation<IUser, { id: string; data: Partial<IUser> }>({
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
