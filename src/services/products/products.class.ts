import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Document } from 'mongoose';

export interface Product {
  _id: string;
  name: string;
  price: number;
  details?: string;
  stocks: number;
}

export type IProducts = Product & Document;

export class Products extends Service<Product> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
