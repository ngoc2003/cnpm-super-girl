import baseRtkApi from '.';
import { RequestType } from './typing';

export const requestApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequests: builder.query<RequestType[], void>({
      query: () => ({
        url: `/borrows/all`,
      }),
      providesTags: ['request'],
    }),
    getUserRequest: builder.query<RequestType[], string>({
      query: (slug) => ({
        url: `/borrows/user/${slug}`,
      }),
      providesTags: ['request'],
    }),
    updateStatusRequest: builder.mutation<void, RequestType>({
      query: (data) => ({
        url: '/borrows/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, result) => [
        { type: 'request', _id: result?._id },
        'request',
      ],
    }),
    addRequest: builder.mutation<void, RequestType>({
      query: (data) => ({
        url: '/borrows/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, result) => [
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
