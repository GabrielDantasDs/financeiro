import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { Roles } from '../authorization/decorators/roles.decorator';
import { Role } from '../authorization/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  //@Roles(Role.Admin)
  @IsPublic()
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.UserService.create(data);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Post('/')
  findByEmail(@Body() email: string) {
    return this.UserService.findByEmail(email);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(+id);
  }
}
