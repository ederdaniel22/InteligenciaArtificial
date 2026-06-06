import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'Maria Silva', description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'maria@exemplo.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    minLength: 6,
    description: 'Senha (mínimo de 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
