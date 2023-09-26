import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enum/role.enum';
import { Roles } from '../decorators/role.decorator';
import { User } from '../entities/user.entity';
import { Public } from '../auth/public.decorator'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('admin')
  @Public()
  createAdmin() {
    return this.userService.seedAdmin();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getUsers(page = 1, limit = 10): Promise<User[]> {
    const users = await this.userService.findUsers(page, limit);
    users.map((user) => {
      delete user.password;
    });
    return users;
  }
}
