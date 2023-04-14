import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { Spin, Checkbox, Button } from 'antd';
import Search from '../components/Search';
import Book from '../components/Book/Book';
import MotionDefault from '../layouts/motions/MotionDefault';
import { BookType } from '../stores/services/typing';
import { useLazySearchBooksQuery } from '../stores/services/book';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import MenuDropdown from '../components/MenuDropdown';
import { UnorderedListOutlined } from '@ant-design/icons';
import useMediaQuery from '../hooks/useMediaQuery';

const options = [
  { label: "Book's name", value: 'name' },
  { label: 'Author', value: 'author' },
  { label: 'Year', value: 'year' },
];

function LibraryPage() {
  const [books, setBooks] = useState<BookType[] | null>(null);
  const { state } = useLocation();
  const value = state?.value || '';
  const [searchValue, setSearchValue] = useState(value);
  const [loading, setLoading] = useState(true);
  const isTablet = useMediaQuery('(max-width: 900px)');

  const [searchBooks, { isFetching }] = useLazySearchBooksQuery();

  const handleSearch = async () => {
    searchBooks({
      filter: searchValue.trim(),
    })
      .unwrap()
      .then((response) => {
        if (response) {
          setBooks(response);
          setLoading(false);
        }
      });
  };

  function handleChange(e) {
    if (e.key === 'Enter') {
      handleSearch();
    } else {
      setSearchValue(e.target.value);
    }
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MotionDefault>
      {loading ? (
        <div className='flex items-center justify-center w-full'>
          <Spin />
        </div>
      ) : (
        <div className='lg:grid grid-cols-3 xxl:grid-cols-4'>
          <div className='bg-lightGray px-5 py-5 '>
            <Search
              loading={isFetching}
              defaultValue={value}
              onClick={handleSearch}
              onKeyUp={handleChange}
              max={false}
            />
            {isTablet && (
              <Button
                type='text'
                className='mx-auto flex items-center justify-center mt-5'
                onClick={() => setIsOpenFilterMenu(!isOpenFilterMenu)}
              >
                <UnorderedListOutlined />
              </Button>
            )}
            {!isTablet || isOpenFilterMenu ? (
              <>
                <div className='border-t border-t-gray-200 my-5'></div>
                <p className='italic text-xs text-red-400'>
                  This section below is not supported yet !
                </p>

                <div className='flex flex-col gap-5 '>
                  <div>
                    <h4>Key to search</h4>
                    <Checkbox.Group
                      className='lg:grid grid-cols-2 gap-2 p-3'
                      options={options}
                      defaultValue={['Pear']}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <h4>Advance</h4>
                    <div className='grid grid-cols-3 gap-5 p-3'>
                      <p className='text-sm text-gray-500'>Language</p>
                      <MenuDropdown
                        className='col-span-2'
                        item={'vietnamese'}
                        setItem={() => {}}
                        data={[{ label: 'Vietnamese', key: 'vietnamese' }]}
                      />
                      <p className='text-sm text-gray-500'>Type</p>
                      <MenuDropdown
                        className='col-span-2'
                        item={'1'}
                        setItem={() => {}}
                        data={[{ label: '1', key: '1' }]}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <div className='px-10 col-span-2 xxl:col-span-3'>
            <div className='text-xl text-center md:text-left sm:text-2xl text-primary font-semibold py-5 '>
              {books.length} books has been founded!
            </div>
            <div className='flex flex-wrap gap-5 justify-evenly'>
              {!!books.length &&
                books.map((item) => (
                  <Book to={`/Library/${item._id}`} data={item} key={v4()} />
                ))}
            </div>
          </div>
        </div>
      )}
    </MotionDefault>
  );
}

export default LibraryPage;
