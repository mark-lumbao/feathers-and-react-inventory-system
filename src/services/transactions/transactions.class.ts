import { Params, Paginated, Id } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Product } from '../products/products.class';
import { Agent } from '../agents/agents.class';
import { Client } from '../clients/clients.class';
import { Document } from 'mongoose';

export interface Transaction {
  _id: string;
  products: {
    product: Product | string,
    quantity: number,
    unit: string,
  }[];
  totalPrice: number;
  agent: Agent;
  terms: string;
  client?: Client;
}

export type ITransaction = Transaction & Document;

export class Transactions extends Service<Transaction> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  find(params?: Params): Promise<Transaction[] | Paginated<Transaction>> {
    return super.find({ ...params, query: {
      ...params?.query,
      $populate: [
        {
          path: 'agent',
          select: [ // this can be a single string 'property' or an array ['propertyA', 'propertyB']
            '-password',
            '-resetToken',
          ]
        },
        'client'
      ],
    } });
  }

  get(id: Id, params?: Params): Promise<Transaction> {
    return super.get(id, { ...params, query: {
      ...params?.query,
      $populate: [
        'products.product',
        {
          path: 'agent',
          select: [ // this can be a single string 'property' or an array ['propertyA', 'propertyB']
            '-password',
            '-resetToken',
          ]
        },
        'client'
      ],
    } });
  }
}
