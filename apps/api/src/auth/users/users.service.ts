import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * Acesso aos usuários persistidos no PostgreSQL (via repositório do TypeORM).
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

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
  }): Promise<User> {
    const user = this.repo.create({
      name: name.trim(),
      email: UsersService.normalizeEmail(email),
      passwordHash,
    });
    return this.repo.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    const normalized = UsersService.normalizeEmail(email);
    return this.repo.findOne({ where: { email: normalized } });
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
