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
import { t } from 'i18next';
import { useAddBookMutation } from '../../../stores/services/book';

function AddBook() {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState('');
  const [types, setTypes] = useState('');

  const [language, setLanguage] = useState('');
  const [type, setType] = useState('');

  const [image, setImage] = useState('');

  const [createBook, { isLoading }] = useAddBookMutation();

  const handleAddNewBook = async (values) => {
    console.log(values);
    createBook({
      ...values,
      type: type,
      language: language,
      image: image,
    })
      .unwrap()
      .then(() => {
        toast.success('Add Book Successfully', {
          pauseOnHover: false,
          autoClose: 1000,
        });
        setTimeout(() => {
          setTimeout(() => {
            navigate('/staff/account/Bookstore');
          }, 1000);
        }, 1000);
      })
      .catch(() => {
        toast.error('Add Book Failed', {
          pauseOnHover: false,
          autoClose: 1000,
        });
      });
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
          name: '',
          amount: '',
          pages: '',
          author: '',
          publisher: '',
          publishYear: '',
          edition: '',
          borrowAmount: 0,
          description: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required(t('fieldIsRequire')),
          amount: Yup.number().required(t('fieldIsRequire')),
          pages: Yup.number().required(t('fieldIsRequire')),
          author: Yup.string().required(t('fieldIsRequire')),
          publisher: Yup.string().required(t('fieldIsRequire')),
          publishYear: Yup.number().required(t('fieldIsRequire')),
          edition: Yup.number().required(t('fieldIsRequire')),
          borrowAmount: Yup.number().required(t('fieldIsRequire')),
          description: Yup.string().required(t('fieldIsRequire')),
        })}
        onSubmit={(values) => {
          handleAddNewBook(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className='bg-white p-3 m-5 h-full'>
            <div className='flex gap-5'>
              <div className='flex-1'>
                <FormGroup>
                  <Label>{t('label.title')}</Label>
                  <Input
                    name='name'
                    placeholder={t('placeholder.title')}
                    error={errors.name && touched.name ? errors.name : ''}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{t('label.bookAmount')}</Label>
                  <Input
                    name='amount'
                    placeholder={t('placeholder.bookAmount')}
                    error={errors.amount && touched.amount ? errors.amount : ''}
                    onChange={(e) => setFieldValue('amount', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{t('label.pageNumber')}</Label>
                  <Input
                    name='pages'
                    placeholder={t('placeholder.pageNumber')}
                    error={errors.pages && touched.pages ? errors.pages : ''}
                    onChange={(e) => setFieldValue('pages', e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className='flex-1'>
                <FormGroup>
                  <Label>{t('label.image')}</Label>
                  <ImageUpload name='image' onChange={setImage} />
                </FormGroup>
              </div>
            </div>
            <div className='flex gap-5'>
              <FormGroup className='flex-1'>
                <Label>{t('label.group')}</Label>
                <MenuDropdown
                  setItem={setType}
                  item={type}
                  fluid
                  data={types}
                />
              </FormGroup>
              <FormGroup className='flex-1'>
                <Label>{t('label.language')}</Label>
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
                <Label>{t('label.author')}</Label>
                <Input
                  name='author'
                  placeholder={t('placeholder.author')}
                  error={errors.author && touched.author ? errors.author : ''}
                  onChange={(e) => setFieldValue('author', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>{t('label.publisher')}</Label>
                <Input
                  name='publisher'
                  placeholder={t('placeholder.publisher')}
                  error={
                    errors.publisher && touched.publisher
                      ? errors.publisher
                      : ''
                  }
                  onChange={(e) => setFieldValue('publisher', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>{t('label.publishYear')}</Label>
                <Input
                  name='publishYear'
                  placeholder={t('placeholder.publishYear')}
                  error={
                    errors.publishYear && touched.publishYear
                      ? errors.publishYear
                      : ''
                  }
                  onChange={(e) => setFieldValue('publishYear', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>{t('label.edition')}</Label>
                <Input
                  name='Edition'
                  placeholder={t('placeholder.edition')}
                  error={
                    errors.edition && touched.edition ? errors.edition : ''
                  }
                  onChange={(e) => setFieldValue('edition', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>{t('label.description')}</Label>
                <TextAreaInput
                  onChange={(e) => setFieldValue('description', e.target.value)}
                  error={
                    errors.description && touched.description
                      ? errors.description
                      : ''
                  }
                  placeholder={t('placeholder.description')}
                />
              </FormGroup>
            </div>
            <div className='flex gap-5'>
              <Button type='submit' isLoading={isLoading} primary fluid>
                {t('button.apply')}
              </Button>
              <Button to='/staff/account/Bookstore' fluid>
                {t('button.cancel')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBook;
