import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidade de usuário persistida no PostgreSQL via TypeORM.
 * O TypeORM cria/atualiza a tabela `users` a partir destas colunas
 * (synchronize habilitado — ver app.module.ts).
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;
}
