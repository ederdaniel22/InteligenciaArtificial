import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { JwtPayload } from './auth.service';

/**
 * Estratégia JWT do Passport (padrão da documentação do NestJS).
 *
 * O Passport extrai o token Bearer do header Authorization, valida a assinatura
 * e a expiração usando o segredo configurado e, em caso de sucesso, chama
 * `validate` com o payload decodificado. O retorno de `validate` é injetado em
 * `request.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
