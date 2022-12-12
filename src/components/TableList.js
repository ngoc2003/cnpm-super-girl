import { Table, Divider, Tag } from "antd";
import Images from "../images/Images";
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';

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
    dataIndex: 'language'
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
  },
  {
    title: "Borrow Amount",
    key: "borrowAmount",
    dataIndex: "borrowAmount",
  },
  {
    title: "Option",
    key: "option",
    render: (text, record) => (
      <span className="flex gap-3">
        <DeleteOutlined></DeleteOutlined>
        {/* <Divider type="vertical" /> */}
        <EditOutlined></EditOutlined>
      </span>
    ),
  },
];

const dataPrev = [
  {
    key: "1",
    name: "Think Python",
    image: Images.logo,
    amount: 20,
    pages: 372,
    language: "English",
    group: "IT",
    author: "Allen B. Downey",
    publisher: "O'Reelly",
    publishYear: 1977,
    edition: 2,
    createdAt: "04/12/2022",
    borrowAmount: 4,
  }
];

export default function TableList({ columns = columnsPrev, data = dataPrev }) {
  return <Table columns={columns} dataSource={data} />;
}
