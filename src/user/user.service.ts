import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find();

    // delete user.password
    return user;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto): Promise<object> {
    const user = await this.userRepository.find({
      where: { email: loginUserDto.email },
    });

    if (user.length <= 0) {
      return { messsage: 'Login failed' };
    }

    const isMatch = await bcrypt.compare(loginUserDto.password,user[0].password)

    if (!isMatch) {
      return { messsage: 'Login failed' };
    }

    return { message: 'Login success' };
  }
}
