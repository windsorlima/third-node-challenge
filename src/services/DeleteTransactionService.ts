// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<number> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);
    await transactionRepository.delete(id);

    return 204;
  }
}

export default DeleteTransactionService;
