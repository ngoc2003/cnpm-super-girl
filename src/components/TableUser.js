import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiURL } from '../config/config';
import Images from '../images/Images';
import Button from './Button';
import IconClose from '../icons/IconClose';

function TableUser({ data, type = 'employee', loading }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const columnsPrev = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img className='h-10 w-10' alt='avatar' src={image || Images.avatar} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      render: (value) => (
        <span className={`${!value && 'error-value'}`}>
          {value || 'not update'}
        </span>
      ),
    },
    {
      title: 'CCCD',
      dataIndex: 'cccd',
      key: 'cccd',
      render: (value) => (
        <span className={`${!value && 'error-value'}`}>
          {value || 'not update'}
        </span>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (value) => (
        <span className={`${!value && 'error-value'}`}>
          {value || 'not update'}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: (value) => (
        <span className={`${!value && 'error-value'}`}>
          {value || 'not update'}
        </span>
      ),
    },
    {
      title: 'Option',
      key: 'option',
      render: (value) => (
        <span className='flex gap-3'>
          <DeleteOutlined
            onClick={() => {
              setUser(value);
              setOpenModal(true);
            }}
          />
          <EditOutlined
            onClick={() => navigate(`/staff/account/User/update/${user._id}`)}
          />
        </span>
      ),
    },
  ];
  async function handleDeleteEmployee(value) {
    setLoading(true);
    await axios.post(`${apiURL}/users/delete`, {
      _id: value._id,
    });
    setTimeout(() => {
      setLoading(false);
      toast.success(`Delete ${type} Successfully`, {
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
      <Table columns={columnsPrev} loading={loading} dataSource={data} />
      <ReactModal
        isOpen={openModal}
        overlayClassName='modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center '
        shouldCloseOnOverlayClick
        onRequestClose={() => setOpenModal(false)}
        className='modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden'
      >
        <button
          onClick={() => setOpenModal(false)}
          className='float-right w-6 h-6 duration-300  text-text1'
        >
          <IconClose />
        </button>
        <h2 className='clear-both mb-10 text-2xl font-bold text-center '>
          Are you sure to delete this {type}?
        </h2>
        <div className='flex gap-x-3'>
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={() => handleDeleteEmployee(user)}
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

export default TableUser;
