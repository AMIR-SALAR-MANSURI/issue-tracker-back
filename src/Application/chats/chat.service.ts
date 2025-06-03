// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/Core/Entity/chat.entity';
import { CreateChatDto } from 'src/Core/DTO/chat.dto';
import { v4 as uuidv4 } from 'uuid'; // install with: npm install uuid

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {
    this.openai = new OpenAI({
      baseURL: 'https://ai.liara.ir/api/v1/683ee6d5f3e1bc38faca8335',
      apiKey: process.env.LIARA_API_KEY,
    });
  }

  async createChat(message: CreateChatDto): Promise<{
    conversationId: string;
    messages: Chat[];
  }> {
    let { conversationId } = message;

    // If no conversation ID, generate a new one
    if (!conversationId) {
      conversationId = uuidv4();
    }

    // Save user message
    const userMessage = this.chatRepository.create({
      role: 'user',
      content: message.message,
      conversationId,
    });
    await this.chatRepository.save(userMessage);

    // Call OpenAI
    const completion = await this.openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: message.message }],
    });

    const assistantMessage = this.chatRepository.create({
      role: 'assistant',
      content: completion.choices[0].message.content || '',
      conversationId,
    });
    await this.chatRepository.save(assistantMessage);

    // Get all messages for this conversation
    const messages = await this.chatRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });

    return {
      conversationId: conversationId as string,
      messages,
    };
  }

  async getHistory(): Promise<Chat[]> {
    return this.chatRepository.find({
      order: { createdAt: 'ASC' },
    });
  }
}
