import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ProfileResponseDto } from '../dto/profile-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar os usuários cadastrados (sem a senha)' })
  @ApiOkResponse({ type: ProfileResponseDto, isArray: true })
  findAll(): ProfileResponseDto[] {
    return this.usersService.findAll().map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}
