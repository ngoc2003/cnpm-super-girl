import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface MenuDropdownProps {
  fluid?: boolean;
  data: MenuProps['items'];
  item: string;
  name?: string;
  width?: string;
  defaultValue?: string | number;
  setItem: Dispatch<SetStateAction<any>>;
  className?: string;
}
function MenuDropdown({
  fluid = false,
  data,
  item = '',
  name = 'Select',
  width = '250px',
  defaultValue,
  setItem,
  className = '',
}: MenuDropdownProps) {
  const handleMenuClick = (e) => {
    setItem(e.key);
  };
  const menu = {
    items: data,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown
      menu={{
        ...menu,
        selectable: true,
        defaultSelectedKeys: [`${defaultValue}`],
      }}
      className={`rounded-md  ${
        fluid ? 'w-full' : `w-[${width}] ${className}`
      } `}
      trigger={['click']}
    >
      <Button block>
        <span className='capitalize'>{item || name}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default MenuDropdown;
