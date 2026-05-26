import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => { console.error('API Error:', err.response?.status, err.message); return Promise.reject(err) }
)

export const servicesAPI   = { getAll: () => apiClient.get('/services'),    getById: (id) => apiClient.get(`/services/${id}`) }
export const testimonialsAPI = { getAll: () => apiClient.get('/testimonials') }
export const faqsAPI       = { getAll: () => apiClient.get('/faqs') }
export const teamAPI       = { getAll: () => apiClient.get('/team') }
export default apiClient
