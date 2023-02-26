import { toast } from 'react-toastify';

const { default: axios } = require('axios');

export default axios.create({
  baseURL: process.env.REACT_APP_API_AUTH,
});

const SGConnectionInstance = axios.create({
  timeout: 20000,
  baseURL: process.env.REACT_APP_API,
});

SGConnectionInstance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data,
    };
  },
  (error) => {
    const errorCode = error.response.status;
    if (errorCode === 409) {
      toast.error('User has already existed!');
    }
    if (errorCode === 401) {
      toast.error('User not found!');
    }
    if (errorCode === 403) {
      toast.error('Password not match!');
    }
    return Promise.reject(error);
  },
);

export { SGConnectionInstance };
