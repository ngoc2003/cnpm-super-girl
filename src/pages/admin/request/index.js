import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../config/config";
import Button from "../../../components/Button";
import TableRequest from "../../../components/TableRequest";
const Request = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchRequest() {
      let arr = [];
      const requestsResponse = await axios.get(`${apiURL}/borrow/all`);
      async function fetchData(item) {
        const userResponse = await axios.get(`${apiURL}/users/${item.userId}`);
        const bookResponse = await axios.get(`${apiURL}/books/${item.bookId}`);
        return {
          _id: item._id,
          name: bookResponse.data?.name,
          author: bookResponse.data.author,
          reader: userResponse.data?.name,
          status: item.status,
          createdAt: item.createdAt,
        };
      }
      requestsResponse.data.map((item) => {
        fetchData(item).then((dt) => {
          arr.push(dt);
        });
      });
      console.log(arr);
      setData(arr);
    }
    fetchRequest();
  }, []);

  return (
    <div className="bg-lightGray w-full">
      <div className="bg-white p-3 m-5 h-full">
        <div className="mb-3 flex gap-3 justify-between">
          <Button to="/staff/account">Back</Button>
        </div>
        <TableRequest data={data}></TableRequest>
      </div>
    </div>
  );
};

export default Request;
