import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormGroup from '../../components/FormGroup';
import Label from '../../components/Label';
import ImageUpload from '../../utils/ImageUpload';
import Input from '../../components/Input';
import MenuDropdown from '../../components/MenuDropdown';
import Button from '../../components/Button';
import { apiURL, TitleDocument } from '../../config/config';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../stores/services/user';
import { MenuProps, Spin } from 'antd';

const sexs = [
  { label: 'Male', key: 'Male' },
  { label: 'Female', key: 'Female' },
];

const ethnics = [{ label: 'Kinh', key: 'Kinh' }];

function UpdateUser() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, isFetching } = useGetUserQuery(slug);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [languages, setLanguages] = useState<MenuProps['items'] | null>(null);

  const [language, setLanguage] = useState('');
  const [sex, setSex] = useState('');
  const [image, setImage] = useState('');
  const [ethnic, setEthnic] = useState('');

  useEffect(() => {
    if (data) {
      setSex(data.sex);
      setImage(data.image);
      setEthnic(data.ethnic);
      setLanguage(data.language);
    }
  }, [data]);

  const handleUpdateBook = async (values) => {
    updateUser({
      ...data,
      ...values,
      sex,
      language,
      image,
      ethnic,
    }).then(() => {
      toast.success('Update Employee Successfully', {
        pauseOnHover: false,
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(`/staff/account/${data.role === 1 ? 'Employee' : 'Readers'}`);
      }, 1000);
    });
  };
  useEffect(() => {
    async function fetchLanguageList() {
      const response = await axios.get(`${apiURL}/languages/all`);
      const dataTemp = response.data.map((item) => ({
        label: item.name,
        key: item.name,
      }));
      setLanguages(dataTemp);
    }

    fetchLanguageList();
    document.title = `${TitleDocument} | Update Employee`;
  }, []);

  if (isFetching) {
    return (
      <div className='w-full flex items-center justify-center min-h-[80vh]'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='bg-lightGray  w-full'>
      <Formik
        initialValues={{
          image: image,
          name: data.name,
          sex: sex,
          ethnic: ethnic,
          language: language,
          cccd: data.cccd,
          birth: data.birth,
          location: data.location,
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
                  <Label>Name</Label>
                  <Input
                    defaultValue={data.name}
                    name='name'
                    placeholder='Name'
                    error={errors.name && touched.name ? errors.name : ''}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>CCCD</Label>
                  <Input
                    defaultValue={data.cccd}
                    name='cccd'
                    placeholder='Cccd'
                    error={errors.cccd && touched.cccd ? errors.cccd : ''}
                    onChange={(e) => setFieldValue('cccd', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    defaultValue={data.location}
                    name='location'
                    placeholder='Location'
                    error={
                      errors.location && touched.location ? errors.location : ''
                    }
                    onChange={(e) => setFieldValue('location', e.target.value)}
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
                <Label>Sex</Label>
                <MenuDropdown
                  defaultValue={sex}
                  setItem={setSex}
                  item={sex}
                  fluid
                  data={sexs}
                />
              </FormGroup>
              <FormGroup className='flex-1'>
                <Label>Language</Label>
                <MenuDropdown
                  setItem={setLanguage}
                  defaultValue={language}
                  item={language}
                  data={languages}
                  fluid
                />
              </FormGroup>
              <FormGroup className='flex-1'>
                <Label>Ethnic</Label>
                <MenuDropdown
                  setItem={setEthnic}
                  defaultValue={ethnic}
                  item={ethnic}
                  data={ethnics}
                  fluid
                />
              </FormGroup>
            </div>

            <div className='flex gap-5'>
              <Button type='submit' isLoading={isLoading} primary fluid>
                Update
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/staff/account/${
                      data.role === 1 ? 'Employee' : 'Readers'
                    }`,
                  )
                }
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

export default UpdateUser;
