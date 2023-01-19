import baseRtkApi from '.';

export const requestApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => ({
        url: `/borrows/all`,
      }),
      providesTags: ['request'],
    }),
    getUserRequest: builder.query({
      query: (slug) => ({
        url: `/borrows/user/${slug}`,
      }),
      providesTags: ['request'],
    }),
    updateStatusRequest: builder.mutation({
      query: (data) => ({
        url: '/borrows/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: 'request', _id: result?._id },
        'request',
      ],
    }),
    addRequest: builder.mutation({
      query: (data) => ({
        url: '/borrows/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: 'request', _id: result?._id },
        'request',
      ],
    }),
  }),
});

export default requestApi;

export const {
  useAddRequestMutation,
  useGetAllRequestsQuery,
  useUpdateStatusRequestMutation,
  useGetUserRequestQuery,
} = requestApi;
