import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import Button from "../../../components/Button";
import TableRequest from "../../../components/TableRequest";
const Request = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchRequest() {
      const requestsResponse = await axios.get(`${apiURL}/borrow/all`);
      if (requestsResponse.status) {
        setLoading(false);
      }
      setData(requestsResponse.data);
    }
    fetchRequest();
  }, []);
  console.log(data);

  return (
    <div className="bg-lightGray w-full">
      <div className="bg-white p-3 m-5 h-full">
        <div className="mb-3 flex gap-3 justify-between">
          <Button to="/staff/account">Back</Button>
        </div>
        <TableRequest loading={loading} data={data}></TableRequest>
      </div>
    </div>
  );
};

export default Request;
