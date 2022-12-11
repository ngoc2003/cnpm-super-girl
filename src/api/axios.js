const {default: axios} = require('axios')
// For authen
export default axios.create({
    baseURL: 'https://crowfundingdb.vercel.app/api/auth'
})