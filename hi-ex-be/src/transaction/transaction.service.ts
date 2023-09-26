// transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionRepository.find({
        where: { user: { id: userId } },
      });
      return transactions;
    } catch (error) {
      throw new Error(`Unable to fetch transactions for user ID ${userId}`);
    }
  }

  async getAllTransactions() {
    try {
      const transactions = await this.transactionRepository.find();
      return transactions;
    } catch (error) {
      throw new Error(`Unable to fetch transactions`);
    }
  }

  async createTransaction(
    userId: number,
    inputToken: string,
    outputToken: string,
    inputAmount: number,
    outputAmount: number,
    address: string
  ): Promise<string> {
    try {
      // Fetch the user based on userId
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const transaction = this.transactionRepository.create({
        user,
        inputToken,
        outputToken,
        inputAmount,
        outputAmount,
        address
      });

      const savedTransaction =
        await this.transactionRepository.save(transaction);
      return `Transaction ${savedTransaction.id} created successfully`;
    } catch (error) {
      throw new Error('Unable to create the transaction.');
      console.error('Error creating transaction:', error);
    }
  }

  // Find a transaction by ID
  async findTransactionById(id: number): Promise<Transaction | undefined> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id: id },
      });
      return transaction;
    } catch (error) {
      throw new Error(`Unable to find transaction with ID ${id}`);
    }
  }

  // Update a transaction
  async updateTransaction(transaction: Transaction): Promise<void> {
    try {
      await this.transactionRepository.save(transaction);
    } catch (error) {
      throw new Error(`Unable to update transaction with ID ${transaction.id}`);
    }
  }
}
