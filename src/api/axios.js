const { default: axios } = require('axios');

export default axios.create({
  baseURL: 'https://supergirl-db.vercel.app/api/auth',
  // baseURL: 'http://localhost:3001/api/auth',
});

const SGConnectionInstance = axios.create({
  timeout: 20000,
  baseURL: process.env.REACT_APP_API,
});

SGConnectionInstance.interceptors.response.use(
  (response) => ({
    ...response,
    data: response.data,
  }),
  (error) => Promise.reject(error),
);

export { SGConnectionInstance };
