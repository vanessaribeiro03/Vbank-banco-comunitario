import { Transaction } from '../entities/transactions.entity';

export interface ITransactionRepository {
  getTransactionByAccountId(idAccount: string): Promise<Transaction[]>;
  saveTransaction(transaction: Transaction): Promise<Transaction>;
}
