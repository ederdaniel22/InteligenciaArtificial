const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

async function post<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message ?? response.statusText)
  }

  return data as T
}

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

export async function signup(values: SignupRequest): Promise<AuthResponse> {
  return post<AuthResponse>(`${API_BASE_URL}/signup`, values)
}

export async function login(values: LoginRequest): Promise<AuthResponse> {
  return post<AuthResponse>(`${API_BASE_URL}/login`, values)
}
