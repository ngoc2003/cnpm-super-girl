import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Search from "../Search";
import MenuDropdown from "../MenuDropdown";
import FormGroup from "../FormGroup";
import Label from "../Label";
import { Checkbox } from "antd";
import axios from "axios";
import { apiURL } from "../../config/config";
const options = [
  {
    label: "avaiable",
    value: "Apple",
  },
];

const SearchBox = ({
  className = "bg-lightGray ",
  value,
  onClick = () => {},
  onChange = () => {},
}) => {
  const [languages, setLanguages] = useState("");
  const [types, setTypes] = useState("");

  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const data = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(data);
    }
    async function fetchTypeList() {
      const responseGroup = await axios.get(`${apiURL}/groups/all`);
      const responseType = await axios.get(`${apiURL}/types/all`);
      const data = responseGroup.data.map((gr) => {
        let temp = {
          label: gr.name,
          key: gr.key,
        };
        let children = responseType.data
          .filter((tp) => tp.group === temp.key)
          .map((item) => ({ label: item.name, key: item.key }));
        let result = children.length
          ? { ...temp, children: [...children] }
          : temp;
        return result;
      });
      setTypes(data);
    }
    // fetchLanguageList();
    // fetchTypeList();
  }, []);
  const SearchingDefault = () => (
    <>
      <div className="flex items-center rounded-xl justify-between w-full gap-5 mb-5">
        <h4 className="text-xl font-semibold">Search tools</h4>

        <div className={`flex-1`}>
          <div
            className={` flex items-center p-2 bg-white rounded-full border w-full 
           `}
          >
            <div className="flex-1 pl-4 pr-5">
              <input
                defaultValue={""}
                value={value}
                className="w-full text-sm bg-transparent focus:outline-none text-black"
                type="text"
                placeholder="Books, documents, people and more . . ."
                onChange={onChange}
              />
            </div>
            <button
              onClick={onClick}
              className="flex-shrink-0 w-[72px] h-10 flex items-center justify-center rounded-full text-white bg-primary"
            >
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
      </div>
      {/* <div className="flex items-center gap-10">
        <h4 className="text-xl font-semibold">Advance Searching</h4>
        <Checkbox.Group
          options={options}
          defaultValue={["Pear"]}
          onChange={onChange}
          className="capitalize"
        />
      </div>
      <div className="flex gap-10 mt-5">
        <FormGroup>
          <Label>Language</Label>
          <MenuDropdown
            setItem={setLanguage}
            item={language}
            data={languages}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <MenuDropdown setItem={setType} item={type} data={types} />
        </FormGroup>
      </div> */}
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
