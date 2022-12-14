import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import TableUser from "../../../components/TableUser";
import Button from "../../../components/Button";
const Reader = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`${apiURL}/users/all/reader`);
      setData(response.data);
    }
    fetchUser();
  }, []);
  console.log(data);
  return (
    <div className="bg-lightGray w-full">
      <div className="bg-white p-3 m-5 h-full">
        <div className="mb-3 flex gap-3 justify-between">
          <Button to="/staff/account">Back</Button>
          <div className="flex gap-3">
            <Button className='bg-black text-white'>Black List</Button>
            <Button primary>Exel Export</Button>
          </div>
        </div>
        <TableUser type={"reader"} data={data}></TableUser>
      </div>
    </div>
  );
};

export default Reader;
