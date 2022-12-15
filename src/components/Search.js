import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { v4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import IconClose from "../icons/IconClose";
const defaultImage = `https://wallpaperaccess.com/full/508751.jpg`;

const Search = ({
  placeholder = "Do funrise now",
  className = "flex-1",
  max = true,
}) => {
  const [data, setData] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce(searchValue);
  function handleSearch(e) {
    setSearchValue(e.target.value);
  }
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (searchValueDebounce) {
  //         const response = await axios.get(`${apiURL}/search`, {
  //           params: { value: searchValueDebounce },
  //         });
  //         setData(response.data);
  //       }
  //     };
  //     fetchData();
  //   }, [searchValueDebounce]);
  return (
    <>
      <div className={`relative z-50  ${className}`}>
        <div
          className={` flex items-center p-2 bg-white rounded-full border w-full ${
            max && "max-w-[458px]"
          } `}
        >
          <div className="flex-1 pl-4 pr-5">
            <input
              defaultValue={""}
              value={searchValue}
              className="w-full text-sm bg-transparent focus:outline-none text-black"
              type="text"
              placeholder={placeholder}
              //   onClick={() => setShowSearch(true)}
              onChange={handleSearch}
            />
          </div>
          <button className="flex-shrink-0 w-[72px] h-10 flex items-center justify-center rounded-full text-white bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
