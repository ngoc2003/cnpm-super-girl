import baseRtkApi from '.';
import { BookType, searchBooksParams } from './typing';

export const bookApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BookType[], void>({
      query: () => ({
        url: '/books/all',
      }),
      providesTags: ['book'],
    }),
    searchBooks: builder.query<BookType[], searchBooksParams>({
      query: (params) => ({
        method: 'POST',
        url: '/books/search',
        params: params,
      }),
      providesTags: ['book'],
    }),
    getBook: builder.query({
      query: (data) => ({
        url: `/books/${data}`,
      }),
      providesTags: (result) => [{ type: 'book', _id: result?._id }],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `/books/update`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'book', _id: result?._id }, 'book'],
    }),
    deleteBook: builder.mutation({
      query: (data) => ({
        url: '/books/delete',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export default bookApi;

export const {
  useLazyGetBookQuery,
  useLazyGetBooksQuery,
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useLazySearchBooksQuery,
} = bookApi;
