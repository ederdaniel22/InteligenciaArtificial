import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

/**
 * Armazenamento de usuários em memória (apenas para fins didáticos — sem ORM/DB).
 * Os dados são perdidos a cada restart do servidor.
 */
@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private seq = 1;

  private static normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  create({
    name,
    email,
    passwordHash,
  }: {
    name: string;
    email: string;
    passwordHash: string;
  }): User {
    const user: User = {
      id: this.seq++,
      name: name.trim(),
      email: UsersService.normalizeEmail(email),
      passwordHash,
    };
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const normalized = UsersService.normalizeEmail(email);
    return this.users.find((user) => user.email === normalized);
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findAll(): User[] {
    return this.users;
  }
}
