import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/domain/entities/transactions.entity';
import { ITransactionRepository } from 'src/domain/interfaces/transactions.interface';
import { Repository } from 'typeorm';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getTransactionByAccountId(idAccount: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { account: { id: idAccount } },
    });
  }

  async saveTransaction(transaction: Transaction): Promise<Transaction> {
    return await this.transactionRepository.save(transaction);
  }
}
