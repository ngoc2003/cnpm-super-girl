import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import IconUser from "../icons/IconUser";
import { useSelector } from "react-redux";
const HomePageUser = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <Search placeholder="Find book, author, . . ."></Search>
        {!user ? (
          <Link
            className="flex gap-3 font-semibold text-white hover:text-secondary "
            to="/sign-in"
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

export default HomePageUser;
