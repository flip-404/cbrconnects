import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { Authorization: 'Bearer your-auth-token' },
})

export default api
