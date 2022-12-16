import ReactModal from "react-modal";
import React, { useState } from "react";
import IconClose from "../icons/IconClose";
import Button from "./Button";
import { Table, Tag } from "antd";
import Images from "../images/Images";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../config/config";
import { toast } from "react-toastify";
import MenuDropdown from "./MenuDropdown";
const TableRequest = ({ data }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [item, setItem] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  //   console.log(item)
  const menuDropdownOptions = [
    {
      label: <Tag color="green">Success</Tag>,
      key: "success",
    },
    {
      label: <Tag color="blue">Returned</Tag>,
      key: "returned",
    },
    {
      label: <Tag color="red">Cancelled</Tag>,
      key: "cancelled",
    },
  ];
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
  const columnsPrev = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Reader",
      dataIndex: "reader", // người mượn
      key: "reader",
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
      title: "Option",
      key: "option",
      render: (value) => (
        <UnorderedListOutlined
          onClick={() => {
            setOpenModal(true);
            setItem(value);
          }}
        />
      ),
    },
  ];
  const [isLoading, setLoading] = useState(false);
  async function handleDeleteEmployee(user) {
    setLoading(true);
    await axios.post(`${apiURL}/users/delete`, {
      _id: user._id,
    });
    setTimeout(() => {
      setLoading(false);
      toast.success(`Update status Successfully`, {
        pauseOnHover: false,
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 1000);
  }
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
          Update Status
        </h2>
        <div>
          From <TagStyle tag={item.status} /> to{" "}
          <MenuDropdown
            width="120px"
            item={newStatus}
            setItem={setNewStatus}
            data={menuDropdownOptions}
          />
        </div>
        <div className="flex gap-x-3">
          <Button
            isLoading={isLoading}
            primary
            fluid
            // onClick={() => handleDeleteEmployee(user)}
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
};

export default TableRequest;
