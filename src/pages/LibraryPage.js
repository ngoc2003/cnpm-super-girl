import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import { apiURL } from "../config/config";
import { v4 } from "uuid";
import Book from "../components/Book/Book";
const LibraryPage = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${apiURL}/search/books`);
      setData(response.data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <SearchBox></SearchBox>
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
