import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;

function Book({ data, to }) {
  const components = (
    <Card
      hoverable
      cover={<img alt='Cover' className='h-[300px]' src={data.image} />}
    >
      <Meta className='h-[100px]' title={data.name} description={data.author} />
    </Card>
  );
  return to ? <Link to={to}>{components}</Link> : components;
}

export default Book;
