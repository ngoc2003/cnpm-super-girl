import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import ImageUpload from '../../../utils/ImageUpload';
import Input from '../../../components/Input';
import MenuDropdown from '../../../components/MenuDropdown';
import Button from '../../../components/Button';
import ReactQuill from 'react-quill';
import { apiURL, TitleDocument } from '../../../config/config';
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '../../../stores/services/book';
import { Spin } from 'antd';
import { t } from 'i18next';

function UpdateBook() {
  const { slug } = useParams();
  const { data, isFetching } = useGetBookQuery(slug);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [languages, setLanguages] = useState('');
  const [types, setTypes] = useState('');

  const [language, setLanguage] = useState(data?.language || '');
  const [type, setType] = useState(data?.type || '');
  const [image, setImage] = useState(data?.image || '');

  const handleUpdateBook = async (values) => {
    updateBook({
      ...data,
      ...values,
      type: type,
      language: language,
      image: image,
    })
      .then(() => {
        toast.success('Update Book Successfully', {
          pauseOnHover: false,
          autoClose: 1000,
        });
        setTimeout(() => {
          setTimeout(() => {
            navigate('/staff/account/Bookstore');
          }, 1000);
        });
      })
      .catch(() => {
        toast.error('Update Book Failed', {
          pauseOnHover: false,
          autoClose: 1000,
        });
      });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['link'],
          [{ color: ['#FFFFFF', '#e60000', '#000'] }],
          ['code-block'],
        ],
      },
    }),
    [],
  );

  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const dataTemp = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(dataTemp);
    }
    async function fetchTypeList() {
      const responseGroup = await axios.get(`${apiURL}/groups/all`);
      const responseType = await axios.get(`${apiURL}/types/all`);
      const dataTemp = responseGroup.data.map((gr) => {
        const temp = {
          label: gr.name,
          key: gr.key,
        };
        const children = responseType.data
          .filter((tp) => tp.group === temp.key)
          .map((item) => ({ label: item.name, key: item.key }));
        const result = children.length
          ? { ...temp, children: [...children] }
          : temp;
        return result;
      });
      setTypes(dataTemp);
    }
    fetchLanguageList();
    fetchTypeList();
    document.title = `${TitleDocument} | Update`;
  }, []);

  if (isFetching) {
    return (
      <div className='flex w-full h-[80vh] items-center justify-center'>
        <Spin />;
      </div>
    );
  }

  return (
    <div className='bg-lightGray  w-full'>
      <Formik
        initialValues={{
          image: image,
          name: data?.name || '',
          amount: data?.amount || '',
          pages: data?.pages || '',
          language: language,
          type: type,
          author: data?.author || '',
          publisher: data?.publisher || '',
          publishYear: data?.publishYear || '',
          edition: data?.edition || '',
          borrowAmount: data?.borrowAmount || '',
          description: data?.description || '',
        }}
        onSubmit={(values) => {
          handleUpdateBook(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className='bg-white p-3 m-5 h-full'>
            <div className='flex gap-5'>
              <div className='flex-1'>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    defaultValue={data.name}
                    name='name'
                    placeholder='Title'
                    error={errors.name && touched.name ? errors.name : ''}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Book's Amount</Label>
                  <Input
                    defaultValue={data.amount}
                    name='amount'
                    placeholder='Amount'
                    error={errors.amount && touched.amount ? errors.amount : ''}
                    onChange={(e) => setFieldValue('amount', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Page Number</Label>
                  <Input
                    defaultValue={data.pages}
                    name='pages'
                    placeholder='Pages'
                    error={errors.pages && touched.pages ? errors.pages : ''}
                    onChange={(e) => setFieldValue('pages', e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className='flex-1'>
                <FormGroup>
                  <Label>Image</Label>
                  <ImageUpload
                    defaultValue={data.image}
                    name='image'
                    onChange={setImage}
                  />
                </FormGroup>
              </div>
            </div>
            <div className=' flex gap-5'>
              <FormGroup className='flex-1'>
                <Label>Group</Label>
                <MenuDropdown
                  defaultValue={data.type}
                  setItem={setType}
                  item={type}
                  fluid
                  data={types}
                />
              </FormGroup>
              <FormGroup className='flex-1'>
                <Label>Language</Label>
                <MenuDropdown
                  setItem={setLanguage}
                  defaultValue={data.language}
                  item={language}
                  data={languages}
                  fluid
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label>Author</Label>
                <Input
                  name='author'
                  placeholder='Author'
                  defaultValue={data.author}
                  error={errors.author && touched.author ? errors.author : ''}
                  onChange={(e) => setFieldValue('author', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Publisher</Label>
                <Input
                  name='publisher'
                  placeholder='Publisher'
                  defaultValue={data.publisher}
                  error={
                    errors.publisher && touched.publisher
                      ? errors.publisher
                      : ''
                  }
                  onChange={(e) => setFieldValue('publisher', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Publish Year</Label>
                <Input
                  name='publishYear'
                  placeholder='Publish Year'
                  defaultValue={data.publishYear}
                  error={
                    errors.publishYear && touched.publishYear
                      ? errors.publishYear
                      : ''
                  }
                  onChange={(e) => setFieldValue('publishYear', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Edition</Label>
                <Input
                  name='Edition'
                  placeholder='Edition'
                  defaultValue={data.edition}
                  error={
                    errors.edition && touched.edition ? errors.edition : ''
                  }
                  onChange={(e) => setFieldValue('edition', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>{t('label.description')}</Label>
                <Field name='description'>
                  {({ field }) => (
                    <div>
                      <ReactQuill
                        defaultValue={data.description}
                        theme='snow'
                        modules={modules}
                        value={field.value}
                        onChange={field.onChange(field.name)}
                        placeholder={t('placeholder.description')}
                      />
                    </div>
                  )}
                </Field>
              </FormGroup>
            </div>
            <div className='flex gap-5'>
              <Button type='submit' isLoading={isLoading} primary fluid>
                Update
              </Button>
              <Button to='/staff/account/Bookstore' fluid>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateBook;
