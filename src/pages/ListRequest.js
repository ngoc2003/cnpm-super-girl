import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../config/config";
import { useSelector } from "react-redux";
import { Tag, Table } from "antd";
import { Link, Navigate } from "react-router-dom";
import { Spin } from "antd";

const columnsPrev = [
  {
    title: "Name",
    dataIndex: "bookName",
    key: "bookName",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (tag) => <TagStyle tag={tag}></TagStyle>,
  },
  {
    title: "Request at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => (
      <span className={`${!value && "error-value"}`}>
        {value || "not update"}
      </span>
    ),
  },
  {
    title: "Return at",
    dataIndex: "endedAt",
    key: "endedAt",
    render: (value) => (
      <span className={`${!value && "error-value"}`}>
        {value || "not update"}
      </span>
    ),
  },
  {
    title: "Link",
    key: "option",
    render: (value) => (
      <Link
        className="italic underline text-blue-500"
        to={`/Library/${value.bookId}`}
      >
        {"link"}
      </Link>
    ),
  },
];

const ListRequest = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const bookResponse = await axios.get(`${apiURL}/borrow/user/${user._id}`);
      if (bookResponse.status === 200) {
        setData(bookResponse.data);
      }
      setLoading(false);
    }
    if (!data.length) {
      fetchData();
    }
  }, [user, data]);

  if (!user && !loading) {
    return <Navigate to="/sign-in" />;
  } else if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Spin />;
      </div>
    );
  }

  return (
    <>
      <div className="text-2xl text-primary font-semibold py-5 ">
        {data.length} books have been founded!
      </div>
      <div className="mb-8 text-sm bg-red-100 text-red-500 py-1 px-2 rounded-md inline-block">
        NOTE: The largest number of books you can borrow is 5
      </div>
      <Table loading={loading} columns={columnsPrev} dataSource={data} />
    </>
  );
};

function TagStyle({ tag, onClick = () => {} }) {
  let color = "red";
  if (tag === "pending") {
    color = "gold";
  } else {
    if (tag === "success") {
      color = "green";
    } else if (tag === "returned") {
      color = "blue";
    }
  }
  return (
    <Tag onClick={onClick} color={color}>
      {tag?.toUpperCase()}
    </Tag>
  );
}

export default ListRequest;
