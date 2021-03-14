import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

export interface Client {
  _id: string;
  name: string,
  address: string,
  salesman: string,
  contactPerson: string,
  contactNumber: string,
}

export class Clients extends Service<Client> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
