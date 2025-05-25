import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Core/DTO/create-user.dto';
import { User } from 'src/Core/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    return {
      success: 200,
      message: 'ok',
      data: savedUser,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updatedUser: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updatedUser);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
