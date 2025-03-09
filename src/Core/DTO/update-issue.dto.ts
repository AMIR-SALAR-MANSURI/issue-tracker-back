import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateIssueDto {
//   @ApiProperty({ example: 1 })
//   @IsNumber()
//   @IsNotEmpty()
//   id: number;

  @ApiProperty({ example: 'John Doe' })
   @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'john@example.com' })
    @IsString()
  @IsNotEmpty()
  description: string;

//  @ApiProperty({ example: 'john@example.com' })
//     @IsString()
//   @IsNotEmpty()
//   assigendUser: string;

//   @ApiProperty({ example: '0' })
//     @IsNumber()
//   @IsNotEmpty()
//   assignedUserId: number;
}