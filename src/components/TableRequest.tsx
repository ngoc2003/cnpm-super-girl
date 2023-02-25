import ReactModal from 'react-modal';
import { useState } from 'react';
import { Table, Tag, Button as BtnAntd, Tooltip, MenuProps } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Button from './Button';
import MenuDropdown from './MenuDropdown';
import { t } from 'i18next';
import { useUpdateStatusRequestMutation } from '../stores/services/request';
import { RequestType } from '../stores/services/typing';

const menuDropdownOptions = [
  {
    label: <Tag color='gold'>Pending</Tag>,
    key: 'pending',
  },
  {
    label: <Tag color='green'>Success</Tag>,
    key: 'success',
  },
  {
    label: <Tag color='blue'>Returned</Tag>,
    key: 'returned',
  },
  {
    label: <Tag color='red'>Cancelled</Tag>,
    key: 'cancelled',
  },
];

interface TableRequestProps {
  data: RequestType[];
  loading: boolean;
}

function TableRequest({ data, loading }: TableRequestProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [item, setItem] = useState<RequestType | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const [updateStatusRequest, { isLoading }] = useUpdateStatusRequestMutation();

  const columnsPrev = [
    {
      title: 'Name',
      dataIndex: 'bookName',
      key: 'name',
      width: '250px',
      render: (value) => (
        <Tooltip placement='top' title={value}>
          <div className='overflow-text-custom'>{value}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Reader',
      dataIndex: 'userName', // người mượn
      key: 'reader',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (tag) => <TagStyle tag={tag} />,
    },
    {
      title: 'Request at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => <span>{new Date(value).toLocaleString()}</span>,
    },
    {
      title: 'Return at',
      dataIndex: 'endedAt',
      key: 'endedAt',
      render: (value) => (
        <span className={`${!value && 'error-value'}`}>
          {value ? new Date(value).toLocaleString() : 'not update'}
        </span>
      ),
    },
    {
      title: 'Option',
      key: 'option',
      render: (value) => {
        console.log(value);
        return (
          <BtnAntd
            disabled={value?.status === 'returned' ?? false}
            icon={
              <UnorderedListOutlined
                onClick={() => {
                  console.log(value);
                  setOpenModal(true);
                  setItem(value);
                }}
              />
            }
          />
        );
      },
    },
  ];
  async function handleChangeStatus() {
    updateStatusRequest({
      ...item,
      status: newStatus,
      endedAt: newStatus === 'returned' ? new Date() : item?.endedAt,
    });
    setOpenModal(false);
    toast.success('Update status Successfully', {
      pauseOnHover: false,
      autoClose: 1000,
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
          <>{t('title.update', { item: 'status' })}</>
        </h2>
        <div className='my-5 text-center'>
          From
          <TagStyle tag={item?.status} />
          to{' '}
          <MenuDropdown
            width='120px'
            item={newStatus}
            setItem={setNewStatus}
            data={menuDropdownOptions}
          />
        </div>
        <div className='flex gap-x-3'>
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={handleChangeStatus}
          >
            <>{t('button.accept')}</>
          </Button>
          <Button transparent fluid onClick={() => setOpenModal(false)}>
            <>{t('button.cancel')}</>
          </Button>
        </div>
      </ReactModal>
    </>
  );
}

function TagStyle({ tag, onClick = () => {} }) {
  let color = 'red';
  if (tag === 'pending') {
    color = 'gold';
  } else if (tag === 'success') {
    color = 'green';
  } else if (tag === 'returned') {
    color = 'blue';
  }
  return (
    <Tag onClick={onClick} color={color}>
      {tag?.toUpperCase()}
    </Tag>
  );
}
export default TableRequest;
