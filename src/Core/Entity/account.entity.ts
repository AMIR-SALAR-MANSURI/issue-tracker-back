import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  provider: string;

  @Column()
  providerAccountId: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  expires_at: number;

  @Column({ nullable: true })
  token_type: string;

  @Column({ nullable: true })
  scope: string;

  @Column({ nullable: true })
  id_token: string;

  @Column({ nullable: true })
  session_state: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
