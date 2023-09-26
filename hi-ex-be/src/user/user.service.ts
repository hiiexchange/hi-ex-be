import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { Role } from '../enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findOneWithUserName(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  
  async seedAdmin() {
    try {
      const existingAdmin = await this.userRepo.findOne({
        where: { email: process.env.ADMIN_EMAIL },
      });

      if (!existingAdmin) {
        // Create the admin user
        const admin = new User();
        admin.password = process.env.ADMIN_PASSWORD;
        admin.email = process.env.ADMIN_EMAIL;
        admin.role = Role.ADMIN;

        await this.userRepo.save(admin);
        console.log('Admin user added successfully.');
      } else {
        console.log('Admin user already exists.');
      }
    } catch (error) {
      console.error('Error seeding admin:', error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async updateUserRole(email: string, role: Role): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user || user === null) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const userToUpdate = {
      ...user,
      role,
    };

    const updatedUser = await this.userRepo.save(userToUpdate);
    delete updatedUser.password;
    return updatedUser;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({
      id,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({
      email,
    });
  }

  async findUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }

  async remove(id: number): Promise<string> {
    const user = await this.findById(id);

    if (!user || user === null) {
      throw new NotFoundException();
    }
    await this.userRepo.delete(id);

    return `We are sorry to let you go ${user.email}`;
  }
}
