import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import IconUser from "../icons/IconUser";

const HomePageStaff = () => {
  return (
    <div className="container">
      {/* <div className="flex items-center justify-between">
        <Search placeholder="Find book, author, . . ."></Search>
        <Link to='./account' className="flex gap-3 font-semibold text-white hover:text-secondary ">
          My Account
          <IconUser></IconUser>
        </Link>
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
      </div> */}
    </div>
  );
};

export default HomePageStaff;
