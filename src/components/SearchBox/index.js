import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Search from "../Search";
import MenuDropdown from "../MenuDropdown";
import FormGroup from "../FormGroup";
import Label from "../Label";
import { Checkbox } from "antd";
import axios from "axios";
import { apiURL } from "../../config/config";
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};
const options = [
  {
    label: "avaiable",
    value: "Apple",
  },
  // {
  //   label: "Pear",
  //   value: "Pear",
  // },
  // {
  //   label: "Orange",
  //   value: "Orange",
  // },
];

const SearchBox = ({ className = "bg-lightGray " }) => {
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
    fetchLanguageList();
    fetchTypeList();
  }, []);
  const SearchingDefault = () => (
    <>
      <div className="flex items-center rounded-xl justify-between w-full gap-5 mb-5">
        <h4 className="text-xl font-semibold">Search tools</h4>
        <Search
          max={false}
          placeholder="Books, documents, people and more . . ."
        ></Search>
      </div>
      <div className="flex items-center gap-10">
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
      </div>
    </>
  );
  const data = [
    {
      label: "All",
      key: "All",
      children: <SearchingDefault />,
    },
    // {
    //   label: "Books",
    //   key: "Books",
    //   children: <SearchingDefault />,
    // },
    // {
    //   label: "Jornals & Newspaper",
    //   key: "Jornals & Newspaper",
    //   children: <SearchingDefault />,
    // },
  ];
  return (
    // <div className={`${className} py-5 `}>
    //   <Tabs
    //     onChange={(key) => console.log(key)}
    //     defaultActiveKey="All"
    //     type="card"
    //     items={data.map((item, i) => {
    //       return {
    //         label: item.label,
    //         key: item.key,
    //         children: item.children,
    //       };
    //     })}
    //   />
    // </div>
    <div className={`${className} px-5 py-5`}>
      <SearchingDefault />
    </div>
  );
};

export default SearchBox;
