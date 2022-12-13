import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import TableEmployee from "../../../components/TableEmployee";
import Button from "../../../components/Button";
const Employee = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchEmployee() {
      const response = await axios.get(`${apiURL}/users/all`);
      setData(response.data);
    }
    fetchEmployee();
  }, []);
  console.log(data);
  return (
    <div className="bg-lightGray w-full">
      <div className="bg-white p-3 m-5 h-full">
        <div className="mb-3 flex gap-3 justify-between">
          <Button to="/staff/account">Back</Button>
          <div className="flex gap-3">
            <Button to="./add" primary>
              Add new Employee
            </Button>
          </div>
        </div>
        <TableEmployee data={data}></TableEmployee>
      </div>
    </div>
  );
};

export default Employee;
