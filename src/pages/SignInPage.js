import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import { signIn } from '../store/auth/auth-slice';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      if (user.role === 1) {
        navigate('/staff');
      } else navigate('/');
    }
  }, [navigate, user]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);
  const handleSignIn = () => {
    if (!email || !password) {
      toast.error('Values not valid');
      setLoading(false);
    } else {
      console.log(dispatch(signIn({ email, password })));
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <div className=' mx-auto bg-white w-full max-w-[600px] p-8 rounded-md'>
      <h4 className='text-2xl font-semibold pb-8 text-center'>Sign In</h4>
      <FormGroup>
        <Label>Email *</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='abc@gmail.com'
        />
      </FormGroup>
      <FormGroup>
        <Label>Password *</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          icon
        />
      </FormGroup>
      <div className='text-sm text-right'>
        Dont have an account?{' '}
        <Link className='text-primary' to='/sign-up'>
          Sign up here
        </Link>
      </div>
      <div className='p-2' />
      <Button isLoading={loading} onClick={handleSignIn} fluid primary>
        Sign In
      </Button>
    </div>
  );
}

export default SignInPage;
