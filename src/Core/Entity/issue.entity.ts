import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IsEnum } from 'class-validator';

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.issues)
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser: User;

  @Column({ nullable: true })
  assignedUserId: string;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OPEN,
  })
  @IsEnum(Status)
  status: Status;
}
