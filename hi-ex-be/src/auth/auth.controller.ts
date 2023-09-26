import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';
import { Public } from './public.decorator';
// import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
// import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Public()
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    // check if email exist
    const emailExist = await this.userService.findByEmail(createUserDto.email);
    if (emailExist) {
      throw new UnprocessableEntityException('User already exists');
    }
    const newUser = await this.userService.create(createUserDto);
    return this.authService.refreshToken(newUser.email);
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user.email);
  }
}
