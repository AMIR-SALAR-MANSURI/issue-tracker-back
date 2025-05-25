import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/Application/users/users.service';
import { CreateUserDto } from 'src/Core/DTO/create-user.dto';
import { User } from 'src/Core/Entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  //   @Put(':id')
  //   async update(
  //     @Param('id') id: number,
  //     // @Body() updateUserDto: UpdateUserDto,
  //   ): Promise<User> {
  //     return await this.usersService.update(+id, updateUserDto);
  //   }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<void> {
  //   return await this.usersService.delete(+id);
  // }

  //   @Patch(':id')
  //     async assigned(@Param('id') id :number):Promise<User>{

  //     }
}
