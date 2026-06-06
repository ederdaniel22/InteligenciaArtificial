import { JwtStrategy } from './jwt.strategy';
import { JwtPayload } from './auth.service';

describe('JwtStrategy', () => {
  it('retorna o payload em validate (vira request.user)', () => {
    const strategy = new JwtStrategy();
    const payload: JwtPayload = {
      sub: 1,
      email: 'maria@exemplo.com',
      name: 'Maria',
    };

    expect(strategy.validate(payload)).toEqual(payload);
  });
});
