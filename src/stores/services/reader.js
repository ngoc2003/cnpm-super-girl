import baseRtkApi from '.';

export const readerApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getReaders: builder.query({
      query: () => ({
        url: '/users/all/reader',
      }),
      providesTags: ['reader', 'user'],
    }),
  }),
});

export default readerApi;

export const { useLazyGetReadersQuery, useGetReadersQuery } = readerApi;
