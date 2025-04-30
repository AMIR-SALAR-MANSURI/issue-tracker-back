import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'John Doe' })
   @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'john@example.com' })
    @IsString()
  @IsNotEmpty()
  type: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsString()
  @IsNotEmpty()
  cost: number;


    @ApiProperty({
    description: 'The image file for the product',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @IsOptional()
  imageUrl: Express.Multer.File; 

      @ApiProperty({ example: 'test' })
    @IsString()
  @IsNotEmpty()
  fileName: string;


  
//  @ApiProperty({ example: 'john@example.com' })
//     @IsString()
//   @IsNotEmpty()
//   assigendUser: string;

//   @ApiProperty({ example: '0' })
//     @IsNumber()
//   @IsNotEmpty()
//   assignedUserId: number;
}