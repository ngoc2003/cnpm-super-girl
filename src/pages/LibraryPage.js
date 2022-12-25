import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import { apiURL } from "../config/config";
import { v4 } from "uuid";
import Book from "../components/Book/Book";
import { useLocation } from "react-router-dom";
const LibraryPage = () => {
  const [books, setBooks] = useState({});
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const value = state?.value || "";
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/search/books`);
      const dataTemp = response.data.length
        ? response.data.filter((item) => {
            if (
              item.name.toLowerCase().includes(searchValue) ||
              item.author.toLowerCase().includes(searchValue) ||
              item.type.toLowerCase().includes(searchValue)
            ) {
              return true;
            }
            return false;
          })
        : [];
      console.log(dataTemp);
      setBooks(response.data);
      setData(dataTemp);
    }
    fetchData();
  }, []);
  function handleChange(e) {
    if (e.key === "Enter") {
      handleSearch();
    } else {
      setSearchValue(e.target.value);
    }
    console.log(e);
  }
  function handleSearch() {
    setData(
      books.length
        ? books.filter((item) => {
            if (
              item.name.toLowerCase().includes(searchValue) ||
              item.author.toLowerCase().includes(searchValue) ||
              item.type.toLowerCase().includes(searchValue)
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
      <div className={`bg-lightGray px-5 py-5`}>
        <div className="flex items-center rounded-xl justify-between w-full gap-5 mb-5">
          <h4 className="text-xl font-semibold">Search tools</h4>
          <div className={`flex-1`}>
            <Search
              defaultValue={value}
              onClick={handleSearch}
              onKeyUp={handleChange}
              max={false}
            ></Search>
          </div>
        </div>
      </div>
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
