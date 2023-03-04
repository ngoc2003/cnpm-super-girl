import baseRtkApi from '.';
import { CartBody, LikeBookBody, ListCartBody, BookType } from './typing';

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
    addToCart: builder.mutation<void, CartBody>({
      query: (body) => ({
        url: '/users/me/cart/add',
        method: 'POST',
        body,
      }),
    }),
    removeFromCart: builder.mutation<void, CartBody>({
      query: (body) => ({
        url: '/users/me/cart/remove',
        method: 'POST',
        body,
      }),
    }),
    listCart: builder.mutation<BookType[], ListCartBody>({
      query: (body) => ({
        url: '/users/me/cart/list',
        method: 'POST',
        body: body,
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
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useListCartMutation,
} = userApi;
