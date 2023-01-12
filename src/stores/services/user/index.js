import baseRtkApi from '..';

export const userApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data) => ({
        method: 'POST',
        url: '/admin/filter-users',
        body: {
          data,
        },
      }),
      providesTags: ['user'],
    }),
  }),
});

export default userApi;

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useBanUserMutation,
  useGiveCreditsMutation,
} = userApi;
