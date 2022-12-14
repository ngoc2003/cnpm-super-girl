import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import Button from "../../../components/Button";
const Request = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Request;
