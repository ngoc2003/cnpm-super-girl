import React from "react";
import { Table } from "antd";
import Images from "../images/Images";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TableEmployee = ({ data }) => {
  const navigate = useNavigate();
  const columnsPrev = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img className="h-10 w-10" src={image || Images.avatar}></img>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      render: (value) => <span className="err-data">{value || "not update"}</span>,
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
      render: (value) => <span className="err-data">{value || "not update"}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (value) => <span className="err-data">{value || "not update"}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      //   render: (image) => <img src={image || Images.avatar}></img>,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (value) => <span className="err-data">{value || "not update"}</span>,

    },
    {
      title: "Option",
      key: "option",
      render: (user) => (
        <span className="flex gap-3">
          {/* <DeleteOutlined
              onClick={() => {
                setId(book);
                setOpenModal(true);
              }}
            ></DeleteOutlined> */}
          <EditOutlined
            onClick={() => navigate(`./update/${user._id}`)}
          ></EditOutlined>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columnsPrev} dataSource={data} />
    </div>
  );
};

export default TableEmployee;
