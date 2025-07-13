// src/chat/chat.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  // @ManyToOne(() => Message, (message) => message.chatId, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'chatId' })
  // messages: Message;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
