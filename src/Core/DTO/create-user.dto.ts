import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Issue } from '../Entity/issue.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
   @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
    @IsString()
  @IsNotEmpty()
  email: string;


 
}