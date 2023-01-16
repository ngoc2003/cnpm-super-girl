import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import Button from './Button';
import { t } from 'i18next';
import { useDeleteBookMutation } from '../stores/services/book';

export default function TableList({ data, loading }) {
  const navigate = useNavigate();

  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('');

  const columnsPrev = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img alt='cover' src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Pages',
      key: 'pages',
      dataIndex: 'pages',
    },
    {
      title: 'Language',
      key: 'language',
      dataIndex: 'language',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Author',
      key: 'author',
      dataIndex: 'author',
      // render: (author) => {let authors = author.split(','); }
    },
    {
      title: 'Publisher',
      key: 'publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'Publication Year',
      key: 'publishYear',
      dataIndex: 'publishYear',
    },
    {
      title: 'Edition',
      key: 'edition',
      dataIndex: 'edition',
    },
    {
      title: 'Import Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (date) => date.slice(0, 10),
    },
    {
      title: 'Borrow Amount',
      key: 'borrowAmount',
      dataIndex: 'borrowAmount',
    },
    {
      title: 'Option',
      key: 'option',
      render: (book) => (
        <span className='flex gap-3'>
          <DeleteOutlined
            onClick={() => {
              setId(book);
              setOpenModal(true);
            }}
          />
          <EditOutlined onClick={() => navigate(`./update/${book._id}`)} />
        </span>
      ),
    },
  ];

  function handleDeleteBook(book) {
    deleteBook({
      _id: book._id,
    })
      .unwrap()
      .then(() => {
        setTimeout(() => {
          toast.success('Delete Book Successfully', {
            pauseOnHover: false,
            autoClose: 1000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      })
      .catch(() => {
        toast.error('Error', {
          pauseOnHover: false,
          autoClose: 1000,
        });
      });
  }

  return (
    <>
      <Table
        pagination={{ pageSize: 7 }}
        loading={loading}
        columns={columnsPrev}
        dataSource={data}
      />
      <ReactModal
        isOpen={openModal}
        overlayClassName='modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center '
        shouldCloseOnOverlayClick
        onRequestClose={() => setOpenModal(false)}
        className='modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden'
      >
        <h2 className='clear-both mb-10 text-2xl font-bold text-center '>
          {t('question.areYouSureTo', { action: 'delete this book' })}
        </h2>
        <div className='flex gap-x-3'>
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={() => handleDeleteBook(id)}
          >
            {t('button.accept')}
          </Button>
          <Button transparent fluid onClick={() => setOpenModal(false)}>
            {t('button.cancel')}
          </Button>
        </div>
      </ReactModal>
    </>
  );
}
