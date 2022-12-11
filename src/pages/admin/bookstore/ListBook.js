import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import Book from "../../../components/Book/Book";
const ListBook = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    async function fetchList() {
      const response = await axios.get(`${apiURL}/books/all`);
      setData(response.data);
      console.log(response.data);
    }
    fetchList();
  }, []);
  return (
    <div className="bg-lightGray w-full ">
      <div className="p-3 m-5 h-full grid grid-cols-3 gap-5">
        {data.length && data.map((book) => (
          <Book key={book._id} data={book} id={book._id}></Book>
        ))}
      </div>
    </div>
  );
};

export default ListBook;
