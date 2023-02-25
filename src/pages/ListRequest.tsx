import { useSelector } from 'react-redux';
import { Tag, Table, Spin } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useGetUserRequestQuery } from '../stores/services/request';
import { AppState } from '../stores';

const columnsPrev = [
  {
    title: 'Name',
    dataIndex: 'bookName',
    key: 'bookName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (tag: string) => <TagStyle tag={tag} />,
  },
  {
    title: 'Request at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: Date) => (
      <span className={`${!value && 'error-value'}`}>
        {new Date(value).toLocaleString()}
      </span>
    ),
  },
  {
    title: 'Return at',
    dataIndex: 'endedAt',
    key: 'endedAt',
    render: (value: Date) => (
      <span className={`${!value && 'error-value'}`}>
        {value ? new Date(value).toLocaleString() : 'not update'}
      </span>
    ),
  },
  {
    title: 'Link',
    key: 'option',
    render: (value: any) => (
      <Link
        className='italic underline text-blue-500'
        to={`/Library/${value.bookId}`}
      >
        link
      </Link>
    ),
  },
];

function ListRequest() {
  const { user } = useSelector((state: AppState) => state.auth);

  const { data, isFetching } = useGetUserRequestQuery(user._id);

  if (!user) {
    return <Navigate to='/sign-in' />;
  }
  if (isFetching) {
    return (
      <div className='w-full flex items-center justify-center min-h-[80vh]'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='px-10'>
      <div className='text-2xl text-primary font-semibold py-5 '>
        {data.length} books have been founded!
      </div>
      <div className='mb-8 text-sm bg-red-100 text-red-500 py-1 px-2 rounded-md inline-block'>
        NOTE: The largest number of books you can borrow is 5
      </div>
      <Table
        pagination={{ pageSize: 7 }}
        loading={isFetching}
        columns={columnsPrev}
        dataSource={data}
      />
    </div>
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

export default ListRequest;
