import React from "react";
import Button from "../components/Button";
import Search from "../components/Search";

const HomePageUser = () => {
  return (
    <div className="container">
      <div>
        <Search placeholder="Find book, author, . . ."></Search>
      </div>
      <div>
        <h4 className="py-5 text-white text-5xl font-bold max-w-[400px]">
          QUICK START GUIDE TO USE LIBRARY
        </h4>
      </div>
      <div className="w-20 border-b-2 border-b-secondary"></div>
      <Button className={"rounded-[90px] mt-5 border-2 text-white bg-transparent"}>
        FIND OUT HOW
      </Button>
    </div>
  );
};

export default HomePageUser;
