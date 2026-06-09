import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';

/** Conteúdo assinado no JWT. */
export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
}

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: SignupDto): Promise<AuthResponseDto> {
    if (await this.usersService.findByEmail(dto.email)) {
      throw new ConflictException('Este email já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    return { message: 'Cadastro realizado com sucesso.' };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    const passwordMatches =
      user && (await bcrypt.compare(dto.password, user.passwordHash));

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const token = await this.jwtService.signAsync(payload);

    return { message: 'Login realizado com sucesso.', token };
  }

  async getProfile(userId: number): Promise<ProfileResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, name: user.name, email: user.email };
  }
}
