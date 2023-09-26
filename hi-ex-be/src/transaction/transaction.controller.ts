import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionGuard } from './guards/transaction.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/role.enum';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('user')
  @UseGuards(TransactionGuard)
  getTransactions(@Request() req) {
    const userId = req.user.user;
    return this.transactionService.getTransactionsByUserId(userId);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }

  @Post()
  async createTransaction(@Request() req, @Body() createTransactionDto) {
    const userId = req.user.user;
    const { inputToken, outputToken, inputAmount, outputAmount, address } =
      createTransactionDto;

    const transaction = await this.transactionService.createTransaction(
      userId,
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      address,
    );

    return transaction;
  }

  @Patch(':id/confirm')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async togglePending(@Param('id') id: number): Promise<string> {
    try {
      const transaction = await this.transactionService.findTransactionById(id);

      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }

      transaction.isPending = !transaction.isPending;

      // Save the updated transaction
      await this.transactionService.updateTransaction(transaction);

      return `Transaction ${id} confirmed successfully`;
    } catch (error) {
      throw new Error('Unable to update the transaction.');
    }
  }
}
