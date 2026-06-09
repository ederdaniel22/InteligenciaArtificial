import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getProfile, listUsers, login, logout, signup } from './auth'
import { api } from './api'
import { getToken } from './token'

vi.mock('./api', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

const mockedApi = vi.mocked(api)

describe('auth service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('signup posts to /signup and returns the response', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { message: 'Cadastro realizado com sucesso.' },
    })

    const result = await signup({
      name: 'Maria',
      email: 'maria@exemplo.com',
      password: 'senha123',
    })

    expect(mockedApi.post).toHaveBeenCalledWith('/signup', {
      name: 'Maria',
      email: 'maria@exemplo.com',
      password: 'senha123',
    })
    expect(result.message).toBe('Cadastro realizado com sucesso.')
  })

  it('login posts to /login and persists the token', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { message: 'Login realizado com sucesso.', token: 'jwt-123' },
    })

    await login({ email: 'maria@exemplo.com', password: 'senha123' })

    expect(mockedApi.post).toHaveBeenCalledWith('/login', {
      email: 'maria@exemplo.com',
      password: 'senha123',
    })
    expect(getToken()).toBe('jwt-123')
  })

  it('login without a token does not persist anything', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { message: 'Login realizado com sucesso.' },
    })

    await login({ email: 'maria@exemplo.com', password: 'senha123' })

    expect(getToken()).toBeNull()
  })

  it('getProfile fetches /profile', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: { id: 1, name: 'Maria', email: 'maria@exemplo.com' },
    })

    const profile = await getProfile()

    expect(mockedApi.get).toHaveBeenCalledWith('/profile')
    expect(profile).toEqual({ id: 1, name: 'Maria', email: 'maria@exemplo.com' })
  })

  it('listUsers fetches /users', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Maria', email: 'maria@exemplo.com' }],
    })

    const users = await listUsers()

    expect(mockedApi.get).toHaveBeenCalledWith('/users')
    expect(users).toHaveLength(1)
  })

  it('logout clears the stored token', () => {
    localStorage.setItem('auth_token', 'jwt-123')

    logout()

    expect(getToken()).toBeNull()
  })
})
