import baseRtkApi from '.';

export const bookApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books/all',
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
} = bookApi;
