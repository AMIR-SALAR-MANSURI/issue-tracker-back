import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sessionToken: string;

  @Column()
  userId: string;

  @Column()
  expires: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
