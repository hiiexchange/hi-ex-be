// transaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
// import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
