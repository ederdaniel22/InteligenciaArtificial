import axios from 'axios'
import { clearToken, getToken } from './token'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        clearToken()
      }
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message
      return Promise.reject(new Error(message))
    }
    return Promise.reject(error)
  },
)
