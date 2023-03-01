import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Label from '../components/Label';
import FormGroup from '../components/FormGroup';
import Button from '../components/Button';
import { handleSignUp as signUp } from '../stores/thunk/auth';
import { AppDispatch } from '../stores';
import { t } from 'i18next';

export default function SignUpPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    dispatch(signUp(values))
      .unwrap()
      .then(() => navigate('/sign-in'));
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
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required(t('required.thisFieldIsRequired')),
        email: Yup.string()
          .email(t('invalid', { name: 'email address' }))
          .required(t('required.thisFieldIsRequired')),
        password: Yup.string()
          .required(t('required.thisFieldIsRequired'))
          .min(8, t('required.passwirdMustMinOf8')),
        term: Yup.bool().oneOf([true], t('required.thisFieldIsRequired')),
      })}
      onSubmit={(values) => {
        handleSignUp(values);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <div className=' mx-auto bg-white w-full smallTablet:max-w-[600px] p-8 smallTablet:rounded-md smallTablet:h-auto h-screen'>
          <h4 className='text-2xl font-semibold pb-8 text-center'>
            <>{t('title.signUp')}</>
          </h4>

          <p className='mb-8 text-center text-xs font-normal text-text3 lg:text-sm lg:mb-6'>
            <>{t('question.alraedyHaveAnAccount')}</>
            <Link to='/sign-in' className='font-medium underline text-primary'>
              <>{t('button.signIn')}</>
            </Link>
          </p>

          <Form className='text-left'>
            {infos.map((info) => (
              <FormGroup key={info.name}>
                <Label>{info.label}</Label>
                <Input
                  placeholder={info.placeholder}
                  icon={info.icon}
                  error={
                    errors[info.name] && touched[info.name]
                      ? errors[info.name]
                      : ''
                  }
                  onChange={(e) => setFieldValue(info.name, e.target.value)}
                ></Input>
              </FormGroup>
            ))}
            <div className='p-2' />

            <Button primary fluid type='submit'>
              <>{t('button.createMyAccount')}</>
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
