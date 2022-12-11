import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Search from "../Search";
import MenuDropdown from "../MenuDropdown";
import FormGroup from "../FormGroup";
import Label from "../Label";
import { Checkbox } from "antd";
import axios from "axios";
import { apiURL } from "../../config/config";
// const options = [
//   {
//     label: "avaiable",
//     value: "Apple",
//   },
// ];

const SearchBox = ({
  className = "bg-lightGray ",
  defaultValue = "",
  value,
  onClick = () => {},
  onKeyUp = () => {},
}) => {
  const SearchingDefault = () => (
    <>
      <div className="flex items-center rounded-xl justify-between w-full gap-5 mb-5">
        <h4 className="text-xl font-semibold">Search tools</h4>

        <div className={`flex-1`}>
          <Search
            // defaultValue={defaultValue}
            // value={value}
            onClick={onClick}
            onKeyUp={onKeyUp}
            max={false}
          ></Search>
        </div>
      </div>
    </>
  );
  const data = [
    {
      label: "All",
      key: "All",
      children: <SearchingDefault />,
    },
  ];
  return (
    <div className={`${className} px-5 py-5`}>
      <SearchingDefault />
    </div>
  );
};

export default SearchBox;
