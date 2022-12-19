import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import { apiURL } from "../config/config";
import { v4 } from "uuid";
import Book from "../components/Book/Book";
const LibraryPage = () => {
  const [books, setBooks] = useState({});
  const [data, setData] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/search/books`);
      setBooks(response.data);
      setData(response.data);
    }
    fetchData();
  }, []);
  function handleChange(e) {
    setSearchValue(e.target.value);
  }
  function handleSearch() {
    setData(
      books.length
        ? books.filter((item) => {
            if (
              item.name.includes(searchValue) ||
              item.author.includes(searchValue) ||
              item.type.includes(searchValue)
            ) {
              return true;
            }
            return false;
          })
        : []
    );
  }

  return (
    <div>
      <SearchBox onClick={handleSearch}  value={searchValue} onChange={handleChange}></SearchBox>
      <div className="text-2xl text-primary font-semibold py-5 ">
        {data.length} books has been founded!
      </div>
      <div className="grid grid-cols-6 gap-5">
        {data.length &&
          data.map((item) => (
            <Book to={`/Library/${item._id}`} data={item} key={v4()}></Book>
          ))}
      </div>
    </div>
  );
};

export default LibraryPage;
