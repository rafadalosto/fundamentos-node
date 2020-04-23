import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumReducer = (accumulator: number, value: number): number =>
      accumulator + value;
    const incomes = this.transactions
      .map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0;
      })
      .reduce(sumReducer, 0);

    const outcomes = this.transactions
      .map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0;
      })
      .reduce(sumReducer, 0);

    const balance: Balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
