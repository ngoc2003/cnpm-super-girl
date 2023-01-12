import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Label from '../components/Label';
import FormGroup from '../components/FormGroup';
import Button from '../components/Button';

export default function SignUpPage() {
  // const dispatch = useDispatch();
  const [acceptTerm, setAcceptTerm] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    try {
      // dispatch(signUp(values));
      navigate('/');
    } catch (err) {
      console.log(values);
    }
  };
  const infos = [
    {
      name: 'name',
      label: 'Full name *',
      placeholder: 'John Doe',
      icon: false,
    },
    {
      name: 'email',
      label: 'Email address *',
      placeholder: 'example@gmail.com',
      icon: false,
    },
    {
      name: 'password',
      label: 'Password *',
      placeholder: 'Type your own password here',
      icon: true,
    },
  ];

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', term: false }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required!'),
        email: Yup.string()
          .email('Invalid email address')
          .required('This field is required!'),
        password: Yup.string()
          .required('This field is required!')
          .min(8, 'Password must at least 8 char'),
        term: Yup.bool().oneOf([true], 'Accept Terms is required!'),
      })}
      onSubmit={(values) => {
        handleSignUp(values);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <div className=' mx-auto bg-white w-full max-w-[600px] p-8 rounded-md'>
          <h4 className='text-2xl font-semibold pb-8 text-center'>Sign Up</h4>

          <p className='mb-8 text-center text-xs font-normal text-text3 lg:text-sm lg:mb-6'>
            Already have an account?{' '}
            <Link to='/sign-in' className='font-medium underline text-primary'>
              Sign in
            </Link>
          </p>

          <Form className='text-left'>
            {infos.map((info) => (
              <FormGroup key={info.name}>
                <Label>{info.label}</Label>
                <Input
                  name={info.name}
                  placeholder={info.placeholder}
                  icon={info.icon}
                  error={
                    errors[info.name] && touched[info.name]
                      ? errors[info.name]
                      : ''
                  }
                  onChange={(e) => setFieldValue(info.name, e.target.value)}
                >
                  {info.icon && info.icon}
                </Input>
              </FormGroup>
            ))}
            <div className='flex items-start mb-5 gap-x-5'>
              <Checkbox
                name='term'
                checked={acceptTerm}
                onClick={() => {
                  setFieldValue('term', !acceptTerm);
                  setAcceptTerm(!acceptTerm);
                }}
              >
                <p className='flex-1 text-xs lg:text-sm text-text2 dark:text-text3'>
                  I agree to the{' '}
                  <span className='underline cursor-pointer text-secondary'>
                    Terms os Use
                  </span>{' '}
                  and have read and understand the{' '}
                  <span className='underline cursor-pointer text-secondary'>
                    Privacy policy
                  </span>{' '}
                </p>
              </Checkbox>
            </div>
            {touched.term && errors.term && (
              <p className='pb-4 -mt-5 text-sm font-medium pointer-events-none text-error'>
                {errors.term}
              </p>
            )}

            <Button primary fluid type='submit'>
              Create my account
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

// export default SignUpPage
