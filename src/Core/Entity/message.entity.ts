// src/chat/chat.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: 'user' | 'assistant';

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Chat, (chat) => chat.message, { onDelete: 'CASCADE' })
  chat: Chat;
}
