import baseRtkApi from '.';
import { UserType } from './typing';
export const adminApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query<UserType[], void>({
      query: () => ({
        url: '/users/all/admin',
      }),
      providesTags: ['admin', 'user'],
    }),
  }),
});

export default adminApi;

export const { useGetAdminsQuery, useLazyGetAdminsQuery } = adminApi;
