import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetUsersParams {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
}

interface ICUPPON {
  id: string;
  code: number;
  status: string;
  discount: number;
  expiesAt: Date;
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
  cuppons: ICUPPON[];
  pagination: IPagination;
}

export const cupponsApi = createApi({
  reducerPath: 'cupponsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Coupons'],
  endpoints: (builder) => ({
    getCuppons: builder.query<IGetUsersResponse, IGetUsersParams>({
      query: ({ limit = 10, page = 1, ...params }) => ({
        url: 'cuppons',
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Coupons'],
    }),
    createCuppon: builder.mutation<ICUPPON, Partial<ICUPPON>>({
      query: (data) => ({
        url: 'cuppons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coupons'],
    }),
    updateCuppon: builder.mutation<
      ICUPPON,
      { id: string; data: Partial<ICUPPON> }
    >({
      query: ({ id, data }) => ({
        url: `cuppons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Coupons'],
    }),
  }),
});

export const {
  useGetCupponsQuery,
  useCreateCupponMutation,
  useUpdateCupponMutation,
} = cupponsApi;
