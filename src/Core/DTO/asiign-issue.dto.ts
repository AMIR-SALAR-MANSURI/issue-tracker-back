import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignIssueDto {
  @ApiProperty({ example: 1 })
   @IsNumber()
  @IsNotEmpty()
  issueId: number;

  @ApiProperty({ example: 1 })
    @IsNumber()
  @IsNotEmpty()
  userId: string;

//  @ApiProperty({ example: 'john@example.com' })
//     @IsString()
//   @IsNotEmpty()
//   assigendUser: string;

//   @ApiProperty({ example: '0' })
//     @IsNumber()
//   @IsNotEmpty()
//   assignedUserId: number;
}