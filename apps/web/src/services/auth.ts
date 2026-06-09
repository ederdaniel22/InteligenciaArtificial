import { api } from './api'
import { clearToken, setToken } from './token'

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token?: string
}

export interface ProfileResponse {
  id: number
  name: string
  email: string
}

export async function signup(values: SignupRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/signup', values)
  return data
}

export async function login(values: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/login', values)
  if (data.token) {
    setToken(data.token)
  }
  return data
}

export async function getProfile(): Promise<ProfileResponse> {
  const { data } = await api.get<ProfileResponse>('/profile')
  return data
}

export async function listUsers(): Promise<ProfileResponse[]> {
  const { data } = await api.get<ProfileResponse[]>('/users')
  return data
}

export function logout(): void {
  clearToken()
}
