import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  const signAsync = jest.fn().mockResolvedValue('signed-token');

  beforeEach(async () => {
    signAsync.mockClear();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: JwtService, useValue: { signAsync } },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  const credentials = {
    name: 'Maria',
    email: 'Maria@Exemplo.com',
    password: 'senha123',
  };

  describe('register', () => {
    it('cadastra um novo usuário', async () => {
      await expect(authService.register(credentials)).resolves.toEqual({
        message: 'Cadastro realizado com sucesso.',
      });
    });

    it('rejeita email duplicado (case-insensitive)', async () => {
      await authService.register(credentials);
      await expect(
        authService.register({ ...credentials, email: 'maria@exemplo.com' }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('retorna um token quando a senha está correta', async () => {
      await authService.register(credentials);

      const result = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      expect(result).toEqual({
        message: 'Login realizado com sucesso.',
        token: 'signed-token',
      });
      expect(signAsync).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'maria@exemplo.com', name: 'Maria' }),
      );
    });

    it('lança UnauthorizedException com senha incorreta', async () => {
      await authService.register(credentials);
      await expect(
        authService.login({ email: credentials.email, password: 'errada' }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('lança UnauthorizedException para usuário inexistente', async () => {
      await expect(
        authService.login({ email: 'ninguem@exemplo.com', password: 'x' }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
