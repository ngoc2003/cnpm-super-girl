import baseRtkApi from '.';

export const adminApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: '/users/all/admin',
      }),
      providesTags: ['admin', 'user'],
    }),
  }),
});

export default adminApi;

export const { useGetAdminsQuery, useLazyGetAdminsQuery } = adminApi;
