// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from 'src/EndPoint/chat/chat.controller';
import { Chat } from 'src/Core/Entity/chat.entity';
import { Message } from 'src/Core/Entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
