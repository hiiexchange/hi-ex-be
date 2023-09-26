import {
  ManyToOne,
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  inputToken: string;

  @Column({ nullable: false })
  outputToken: string;

  @Column({ type: 'numeric', nullable: false, precision: 10, scale: 5 })
  inputAmount: number;

  @Column({ type: 'numeric', nullable: false, precision: 10, scale: 5 })
  outputAmount: number;

  @Column({ default: true }) // true for pending, false for completed
  isPending: boolean;

  @Column({ nullable: false })
  address: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
