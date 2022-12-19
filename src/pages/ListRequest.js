import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../config/config";
import { useSelector } from "react-redux";
import Book from "../components/Book/Book";
import { v4 } from "uuid";
import { Tag, Table } from "antd";
import { Link } from "react-router-dom";

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

const ListRequest = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    const bookResponse = await axios.get(`${apiURL}/borrow/user/${user._id}`);
    console.log(bookResponse);
    if (bookResponse.status === 200) {
      setLoading(false);
      setData(bookResponse.data);
    }
  }

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, []);
  if (!user) {
    return <div>No user</div>;
  }

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
  return (
    <>
      <div className="text-2xl text-primary font-semibold py-5 ">
        {data.length} books has been founded!
      </div>
      <Table loading={loading} columns={columnsPrev} dataSource={data} />
    </>
  );
};

export default ListRequest;
