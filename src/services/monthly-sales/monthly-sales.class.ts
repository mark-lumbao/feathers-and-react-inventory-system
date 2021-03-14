import { Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Mongoose, Types } from 'mongoose';
import { Forbidden } from '@feathersjs/errors';
import { Application } from '../../declarations';
import { ITransaction } from '../transactions/transactions.class';

interface Data {}

interface ServiceOptions {}

export class MonthlySales implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find (params: Params): Promise<Data[] | Paginated<Data>> {
    const mongooseClient: Mongoose = this.app.get('mongooseClient');
    const transactionsModel = mongooseClient.model<ITransaction>('transactions');

    const { query } = params;
    const year = query?.year || 0;
    const agent = query?.agent;

    /**
     * Only use agent query param when present
     */
    const match = agent
      ? {
        $match: {
          createdAt: {
            $gt: new Date(`${year}-1`),
            $lte: new Date(`${year}-12`),
          },
          agent: new Types.ObjectId(agent),
        },
      } : {
        $match: {
          createdAt: {
            $gt: new Date(`${year}-1`),
            $lte: new Date(`${year}-12`),
          },
        },
      };

    const monthlySales = await transactionsModel.aggregate([
      match,
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          sales: { $sum: '$totalPrice' },
        }
      },
      {
        $sort: {
          '_id.month': 1
        },
      }
    ]);

    return monthlySales.map(({ sales, _id }) => ({
      sales: parseFloat(sales),
      ..._id,
    }));
  }

  async get (): Promise<Data> {
    return new Forbidden();
  }

  async create (): Promise<Data> {
    return new Forbidden();
  }

  async update (): Promise<Data> {
    return new Forbidden();
  }

  async patch (): Promise<Data> {
    return new Forbidden();
  }

  async remove (): Promise<Data> {
    return new Forbidden();
  }
}
