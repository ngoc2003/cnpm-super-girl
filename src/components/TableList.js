import { Table, Divider, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../config/config";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import React, { useState } from "react";
import IconClose from "../icons/IconClose";
import Button from "../components/Button";
export default function TableList({ data }) {
  const navigate = useNavigate();
  const columnsPrev = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image}></img>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Pages",
      key: "pages",
      dataIndex: "pages",
    },
    {
      title: "Language",
      key: "language",
      dataIndex: "language",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Author",
      key: "author",
      dataIndex: "author",
      // render: (author) => {let authors = author.split(','); }
    },
    {
      title: "Publisher",
      key: "publisher",
      dataIndex: "publisher",
    },
    {
      title: "Publication Year",
      key: "publishYear",
      dataIndex: "publishYear",
    },
    {
      title: "Edition",
      key: "edition",
      dataIndex: "edition",
    },
    {
      title: "Import Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date) => date.slice(0, 10),
    },
    {
      title: "Borrow Amount",
      key: "borrowAmount",
      dataIndex: "borrowAmount",
    },
    {
      title: "Option",
      key: "option",
      render: (book) => (
        <span className="flex gap-3">
          <DeleteOutlined
            onClick={() => {
              setId(book);
              setOpenModal(true);
            }}
          ></DeleteOutlined>
          <EditOutlined
            onClick={() => navigate(`./update/${book._id}`)}
          ></EditOutlined>
        </span>
      ),
    },
  ];
  async function handleDeleteBook(book) {
    setLoading(true);
    await axios.post(`${apiURL}/books/delete`, {
      _id: book._id,
    });
    setTimeout(() => {
      setLoading(false);
      toast.success("Delete Book Successfully", {
        pauseOnHover: false,
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 1000);
  }
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  return (
    <>
      <Table columns={columnsPrev} dataSource={data} />
      <ReactModal
        isOpen={openModal}
        overlayClassName={
          "modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center "
        }
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setOpenModal(false)}
        className="modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden"
      >
        <button
          onClick={() => setOpenModal(false)}
          className="float-right w-6 h-6 duration-300  text-text1"
        >
          <IconClose></IconClose>
        </button>
        <h2 className="clear-both mb-10 text-2xl font-bold text-center ">
          Are you sure to delete this book?
        </h2>
        <div className="flex gap-x-3">
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={() => handleDeleteBook(id)}
          >
            Accept
          </Button>
          <Button transparent fluid onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </div>
      </ReactModal>
    </>
  );
}
