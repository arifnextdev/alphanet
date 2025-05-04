import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IGetProductParams {
  limit?: number;
  page?: number;
  status?: string;
  type?: string;
  search?: string;
}

export interface IProduct {
  id: string;
  name: string;
  type: string;
  description: string;
  status: string;
  quantity: number;
  discount: number;
  grade: string;
  price: number;
  billingCycle: string;
  config: any;
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
  products: IProduct[];
  pagination: IPagination;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<IGetUsersResponse, IGetProductParams>({
      query: ({ limit = 10, page = 1, ...params }) => ({
        url: 'products',
        params: {
          limit,
          page,
          ...params,
        },
      }),
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (data) => ({
        url: 'products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<
      IProduct,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
