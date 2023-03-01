import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import { AppDispatch, AppState } from '../stores';
import { handleSignIn as SignIn } from '../stores/thunk/auth';

function SignInPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === 1) {
        navigate('/staff');
      } else navigate('/');
    }
  }, [navigate, user]);

  const handleSignIn = () => {
    setLoading(true);
    if (!email || !password) {
      toast.error('Values not valid');
      setLoading(false);
    } else {
      dispatch(SignIn({ email, password }))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className=' mx-auto bg-white w-full smallTablet:max-w-[600px] p-8 smallTablet:rounded-md h-screen smallTablet:h-auto'>
      <h4 className='text-2xl font-semibold pb-8 text-center'>
        <>{t('button.signIn')}</>
      </h4>
      <p className='mb-8 text-center text-xs font-normal text-text3 lg:text-sm lg:mb-6'>
        <>{t('question.dontHaveAnAccount')}</>
        <Link to='/sign-up' className='font-medium underline text-primary'>
          <>{t('button.signUp')}</>
        </Link>
      </p>
      <FormGroup>
        <Label>{t('label.email')}</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='abc@gmail.com'
        />
      </FormGroup>
      <FormGroup>
        <Label>{t('label.password')}</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          icon
        />
      </FormGroup>

      <div className='p-2' />
      <Button isLoading={loading} onClick={handleSignIn} fluid primary>
        <>{t('button.signIn')}</>
      </Button>
    </div>
  );
}

export default SignInPage;
