const { default: axios } = require('axios');
// For authen
export default axios.create({
  baseURL: 'https://supergirl-db.vercel.app/api/auth',

  // baseURL: "http://localhost:3001/api/auth",
});
