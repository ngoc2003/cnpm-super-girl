import React from "react";
import TableList from "../../../components/TableList";
import Button from "../../../components/Button";
const Bookstore = () => {
  return (
    <div className="bg-lightGray w-full">
      <div className="bg-white p-3 m-5 h-full">
        <div className="mb-3 flex gap-3 justify-between">
          <Button to ='/staff/account'>Back</Button>
          <div className="flex gap-3">
            <Button to='./add' primary>Add new</Button>
            <Button to='./all' primary>List Library</Button>
          </div>
        </div>
        <TableList></TableList>
      </div>
    </div>
  );
};

export default Bookstore;
