import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('auth flow', () => {
    const user = {
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      password: 'senha123',
    };

    it('cadastra, faz login e obtém o perfil com o token', async () => {
      await request(app.getHttpServer())
        .post('/signup')
        .send(user)
        .expect(201)
        .expect((res) => {
          const body = res.body as { message: string };
          expect(body.message).toBe('Cadastro realizado com sucesso.');
        });

      const login = await request(app.getHttpServer())
        .post('/login')
        .send({ email: user.email, password: user.password })
        .expect(200);

      const { token } = login.body as { token: string };
      expect(typeof token).toBe('string');

      await request(app.getHttpServer())
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          const body = res.body as { id: number; name: string; email: string };
          expect(typeof body.id).toBe('number');
          expect(body.name).toBe(user.name);
          expect(body.email).toBe(user.email);
        });
    });

    it('rejeita login com senha inválida (401)', async () => {
      await request(app.getHttpServer()).post('/signup').send(user).expect(201);

      await request(app.getHttpServer())
        .post('/login')
        .send({ email: user.email, password: 'errada' })
        .expect(401);
    });

    it('rejeita /profile sem token (401)', () => {
      return request(app.getHttpServer()).get('/profile').expect(401);
    });

    it('rejeita signup com payload inválido (400)', () => {
      return request(app.getHttpServer())
        .post('/signup')
        .send({ name: '', email: 'invalido', password: '123' })
        .expect(400);
    });
  });
});
