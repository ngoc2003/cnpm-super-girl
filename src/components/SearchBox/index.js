import React from "react";
import { Tabs } from "antd";
import Search from "../Search";
import MenuDropdown from "../MenuDropdown";
import FormGroup from "../FormGroup";
import Label from "../Label";
import { Checkbox } from "antd";
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};
const options = [
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Pear",
    value: "Pear",
  },
  {
    label: "Orange",
    value: "Orange",
  },
];

const SearchBox = ({ className }) => {
  const SearchingDefault = () => (
    <>
      <div className="flex items-center bg-white rounded-xl justify-between w-full gap-5 mb-5">
        <h4 className="text-xl font-semibold">Search tools</h4>
        <Search
          max={false}
          placeholder="Books, documents, people and more . . ."
        ></Search>
      </div>
      <div>
        <h4 className="text-xl font-semibold">Advance Searching</h4>
        <Checkbox.Group
          options={options}
          defaultValue={["Pear"]}
          onChange={onChange}
        />
      </div>
      <div>
        <FormGroup>
          <Label>Language</Label>
          <MenuDropdown />
        </FormGroup>
        <FormGroup>
          <Label>Category</Label>
          <MenuDropdown />
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
    {
      label: "Books",
      key: "Books",
      children: <SearchingDefault />,
    },
    {
      label: "Jornals & Newspaper",
      key: "Jornals & Newspaper",
      children: <SearchingDefault />,
    },
  ];
  return (
    <div className="bg-primary py-5 px-10">
      <Tabs
        onChange={(key) => console.log(key)}
        defaultActiveKey="All"
        type="card"
        items={data.map((item, i) => {
          return {
            label: item.label,
            key: item.key,
            children: item.children,
          };
        })}
      />
    </div>
  );
};

export default SearchBox;
