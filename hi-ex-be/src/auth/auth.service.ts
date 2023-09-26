import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

type Props = {
  email: string,
  password: string
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithUserName(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
      // console.log(password)
    }
    return null;
  }

  async login({ email, password }: Props) {
    // Check if the user exists
    const existingUser = await this.userService.findOneWithUserName(email);

    if (existingUser) {
      // User exists, validate credentials
      const user = await this.validateUser(email, password);

      if (!user) {
        // Authentication failed, return an error or throw an exception
        throw new Error('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        role: user.role,
      };

      return {
        ...user,
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } else {
      // User doesn't exist, create a new user
      const newUser = await this.userService.create({ email, password });

      const payload = {
        sub: newUser.id,
        role: newUser.role,
      };

      return {
        ...newUser,
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }
  }

  async refreshToken(email: string) {
    const payload = {
      email: email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
