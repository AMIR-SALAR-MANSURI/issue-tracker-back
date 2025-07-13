// src/chat/chat.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ChatService } from 'src/Application/chats/chat.service';
import { CreateChatDto } from 'src/Core/DTO/chat.dto';
import { Chat } from 'src/Core/Entity/chat.entity';
import { Message } from 'src/Core/Entity/message.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  //   async chat(@Body() message: CreateChatDto) {
  //     if (!message) throw new BadRequestException('Message is required');
  //     return await this.chatService.createChat(message);
  //   }
  @Get()
  async history() {
    return await this.chatService.getHistory();
  }
  @Post('/create')
  async chat(
    @Body() body: CreateChatDto,
  ): Promise<{ conversationId: string; messages: Message[] }> {
    return this.chatService.createChat(body);
  }

  @Get('/getConvers/:id')
  async getChat(@Param('id') id: string): Promise<{ id: string }> {
    return this.chatService.getConver(id);
  }
}
