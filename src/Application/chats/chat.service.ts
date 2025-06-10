// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/Core/Entity/chat.entity';
import { CreateChatDto } from 'src/Core/DTO/chat.dto';
import { v4 as uuidv4 } from 'uuid'; // install with: npm install uuid
import { Message } from 'src/Core/Entity/message.entity';

@Injectable()
export class ChatService {
  private openai = new OpenAI({
    apiKey: process.env.LIARA_API_KEY,
    baseURL: 'https://ai.liara.ir/api/v1/683ee6d5f3e1bc38faca8335',
  });

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async createChat(
    dto: CreateChatDto,
  ): Promise<{ conversationId: number; messages: Message[] }> {
    let chat: Chat | null = null;

    // 1. Find existing chat or create a new one
    if (dto.conversationId) {
      chat = await this.chatRepo.findOne({ where: { id: dto.conversationId } });
    }

    if (!chat) {
      chat = this.chatRepo.create();
      await this.chatRepo.save(chat);
    }

    // 2. Save user message
    const userMessage = this.messageRepo.create({
      role: 'user',
      content: dto.message,
      chat,
    });
    await this.messageRepo.save(userMessage);

    // 3. Generate assistant message
    const completion = await this.openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: dto.message,
        },
      ],
    });

    const assistantMessage = this.messageRepo.create({
      role: 'assistant',
      content: completion.choices[0].message.content || '',
      chat,
    });
    await this.messageRepo.save(assistantMessage);

    // 4. Return all messages in this conversation
    const messages = await this.messageRepo.find({
      where: { chat: { id: chat.id } },
      order: { createdAt: 'ASC' },
    });

    return {
      conversationId: chat.id,
      messages,
    };
  }

  async getHistory(): Promise<Chat[]> {
    return this.chatRepo.find({
      order: { createdAt: 'ASC' },
    });
  }
}
