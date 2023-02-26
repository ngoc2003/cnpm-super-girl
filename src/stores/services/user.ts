import baseRtkApi from '.';
import { LikeBookBody } from './typing';

export const userApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (data) => ({
        url: `/users/${data}`,
      }),
      providesTags: (result) => [{ type: 'user', _id: result?._id }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/update`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'user', _id: result?._id }, 'user'],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: '/users/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'user', _id: result?._id }, 'user'],
    }),
    likeBook: builder.mutation<void, LikeBookBody>({
      query: (body) => ({
        url: '/users/me/like',
        method: 'POST',
        body,
      }),
    }),
    unLikeBook: builder.mutation<void, LikeBookBody>({
      query: (body) => ({
        url: '/users/me/unlike',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default userApi;

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useLikeBookMutation,
  useUnLikeBookMutation,
} = userApi;
