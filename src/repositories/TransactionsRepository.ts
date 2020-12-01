import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import CategoriesRepository from './CategoriesRepository';
import Category from '../models/Category';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = await this.find();

    let income = 0;
    let outcome = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') income += transaction.value;
      else {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public async findAll(): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await transactionsRepository.find();

    const categoriesRepository = getCustomRepository(CategoriesRepository);

    transactions.forEach(async (transaction, index) => {
      const category = await categoriesRepository.findOne(
        transaction.category_id,
      );
      transactions[index].category = category as Category;

      delete transactions[index].category_id;
    });

    return transactions;
  }
}

export default TransactionsRepository;
