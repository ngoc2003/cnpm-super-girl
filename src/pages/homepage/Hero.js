import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Search from "../../components/Search";
import IconUser from "../../icons/IconUser";
import { useSelector } from "react-redux";
import Images from "../../images/Images";
const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`Library`, {
        state: {
          value: searchValue,
        },
      });
    } else {
      setSearchValue(e.target.value);
    }
  };
  return (
    <div
      style={{
        background: `url(${Images.bgHome}) top center/ cover no-repeat`,
      }}
      className="flex-1 py-5 px-10"
    >
      <div className="flex items-center justify-between">
        <Search
          onKeyUp={handleSearch}
          onClick={handleSearch}
          placeholder="Find book, author, . . ."
        ></Search>
        {!user ? (
          <Link
            className="flex gap-3 font-semibold text-white hover:text-secondary "
            to="/sign-in"
          >
            My Account
            <IconUser></IconUser>
          </Link>
        ) : user.role === 1 ? (
          <Link
            className="flex gap-3 font-semibold text-white hover:text-secondary "
            to="/staff/account"
          >
            My Account
            <IconUser></IconUser>
          </Link>
        ) : (
          <Link
            className="flex gap-3 font-semibold text-white hover:text-secondary "
            to="/"
          >
            My Account
            <IconUser></IconUser>
          </Link>
        )}
      </div>
      <div>
        <h4 className="py-5 text-white text-5xl font-bold max-w-[400px]">
          QUICK START GUIDE TO USE LIBRARY
        </h4>
      </div>
      <div className="w-20 border-b-2 border-b-secondary"></div>
      <Button
        className={"rounded-[90px] mt-5 border-2 text-white bg-transparent"}
      >
        FIND OUT HOW
      </Button>
      <div className="text-[85px] text-center text-white font-brittany">
        Welcome to TLU
      </div>
      <div className="text-[100px] tracking-wide text-center text-white">
        LIBRARY
      </div>
    </div>
  );
};

export default Hero;
