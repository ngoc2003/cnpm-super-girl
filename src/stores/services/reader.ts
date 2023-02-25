import baseRtkApi from '.';
import { UserType } from './typing';

export const readerApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReaders: builder.query<UserType[], void>({
      query: () => ({
        url: '/users/all/reader',
      }),
      providesTags: ['reader', 'user'],
    }),
  }),
});

export default readerApi;

export const { useLazyGetReadersQuery, useGetReadersQuery } = readerApi;
