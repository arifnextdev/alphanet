import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  status: string;
  provider: string;
  roles: string[];
  avatar?: string | null;
}

const BASE_URL = 'http://localhost:3001';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<
      IUser,
      { email: string; password: string; name: string }
    >({
      query: ({
        email,
        password,
        name,
      }: {
        email: string;
        password: string;
        name: string;
      }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { email, password, name },
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    // get auth user use authrization header token get query
    me: builder.query<IUser, { token: string | '' }>({
      query: ({ token }) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
