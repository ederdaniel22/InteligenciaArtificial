import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', '127.0.0.1'),
        port: config.get<number>('DB_PORT', 5433),
        username: config.get<string>('DB_USER', 'alura'),
        password: config.get<string>('DB_PASSWORD', 'alura'),
        database: config.get<string>('DB_NAME', 'alura_auth'),
        entities: [User],
        // Cria/atualiza o schema a partir das entidades. Apenas para
        // desenvolvimento/didático — em produção use migrations.
        synchronize: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
