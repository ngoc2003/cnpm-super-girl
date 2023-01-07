import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import ImageUpload from '../../../utils/ImageUpload';
import Input from '../../../components/Input';
import MenuDropdown from '../../../components/MenuDropdown';
import Button from '../../../components/Button';
import { apiURL, TitleDocument } from '../../../config/config';
import TextAreaInput from '../../../components/TextAreaInput';

function AddBook() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState('');
  const [types, setTypes] = useState('');

  const [language, setLanguage] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');

  const handleAddNewBook = async (values) => {
    try {
      const response = await axios.post(`${apiURL}/books/create`, {
        ...values,
        type,
        language,
        image,
      });
      if (response.status === 200) {
        toast.success('Add Book Successfully', {
          pauseOnHover: false,
          autoClose: 1000,
        });
        setIsLoading(false);
        setTimeout(() => {
          setTimeout(() => {
            navigate('/staff/account/Bookstore');
          }, 1000);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const data = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(data);
    }
    async function fetchTypeList() {
      const responseGroup = await axios.get(`${apiURL}/groups/all`);
      const responseType = await axios.get(`${apiURL}/types/all`);
      const data = responseGroup.data.map((gr) => {
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
      setTypes(data);
    }
    fetchLanguageList();
    fetchTypeList();
    document.title = `${TitleDocument} | Add`;
  }, []);
  return (
    <div className='bg-lightGray  w-full'>
      <Formik
        initialValues={{
          name: '', //
          amount: '', //
          pages: '', //
          author: '', //
          publisher: '', //
          publishYear: '', //
          edition: '',
          borrowAmount: 0, //
          description: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('This field is required!'),
          amount: Yup.number().required('This field is required!'),
          pages: Yup.number().required('This field is required!'),
          author: Yup.string().required('This field is required!'),
          publisher: Yup.string().required('This field is required!'),
          publisherYear: Yup.number().required('This field is required!'),
          edition: Yup.number().required('This field is required!'),
          borrowAmount: Yup.number().required('This field is required!'),
          description: Yup.string().required('This field is required!'),
        })}
        onSubmit={(values) => {
          handleAddNewBook(values);
          setIsLoading(true);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className='bg-white p-3 m-5 h-full'>
            <div className='flex gap-5'>
              <div className='flex-1'>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    name='name'
                    placeholder='Title'
                    error={errors.name && touched.name ? errors.name : ''}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Book's Amount</Label>
                  <Input
                    name='amount'
                    placeholder='Amount'
                    error={errors.amount && touched.amount ? errors.amount : ''}
                    onChange={(e) => setFieldValue('amount', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Page Number</Label>
                  <Input
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
                  <ImageUpload name='image' onChange={setImage} />
                </FormGroup>
              </div>
            </div>
            <div className=' flex gap-5'>
              <FormGroup className='flex-1'>
                <Label>Group</Label>
                <MenuDropdown
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
                  error={errors.author && touched.author ? errors.author : ''}
                  onChange={(e) => setFieldValue('author', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Publisher</Label>
                <Input
                  name='publisher'
                  placeholder='Publisher'
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
                  error={
                    errors.edition && touched.edition ? errors.edition : ''
                  }
                  onChange={(e) => setFieldValue('edition', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextAreaInput
                  onChange={(e) => setFieldValue('description', e.target.value)}
                  error={
                    errors.description && touched.description
                      ? errors.description
                      : ''
                  }
                  placeholder='Description'
                />
              </FormGroup>
            </div>
            <div className='flex gap-5'>
              <Button type='submit' isLoading={isLoading} primary fluid>
                Apply
              </Button>
              {/* to="/staff/account/Bookstore" */}
              <Button
                onClick={() => navigate('/staff/account/Bookstore')}
                fluid
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBook;
