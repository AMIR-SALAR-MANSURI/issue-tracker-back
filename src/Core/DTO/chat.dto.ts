import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiPropertyOptional({ example: 'c39e55f6-562d-4a67-bb2a-c17216ec7e25' })
  @IsOptional()
  @IsString()
  conversationId?: string;
  @ApiProperty({
    description: 'The user message to send to the AI',
    example: 'سلام، حالت چطوره؟',
  })
  @IsString()
  message: string;
}
