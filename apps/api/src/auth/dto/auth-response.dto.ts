import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'Login realizado com sucesso.' })
  message: string;

  @ApiProperty({
    required: false,
    description: 'JWT de acesso (retornado no login)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token?: string;
}
