import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard que aciona a estratégia 'jwt' do Passport (ver jwt.strategy.ts).
 * Equivalente a `@UseGuards(AuthGuard('jwt'))`, encapsulado numa classe própria.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
