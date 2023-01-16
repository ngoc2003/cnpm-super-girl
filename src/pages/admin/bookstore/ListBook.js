import React from 'react';
import Book from '../../../components/Book/Book';
import { useGetBooksQuery } from '../../../stores/services/book';

function ListBook() {
  const { data } = useGetBooksQuery();

  if (!data?.length) {
    return;
  }

  return (
    <div className='bg-lightGray w-full '>
      <div className='p-3 m-5 h-full grid grid-cols-3 gap-5'>
        {data.map((book) => (
          <Book key={book._id} data={book} id={book._id} />
        ))}
      </div>
    </div>
  );
}

export default ListBook;
