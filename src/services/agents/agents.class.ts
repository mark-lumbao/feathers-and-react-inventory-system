import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Document } from 'mongoose';

export interface Agent {
  _id?: string;
  firstName: string,
  middleName: string,
  lastName: string,
  fullName: string,
}

export type IAgent = Document & Agent;

export class Agents extends Service<Agent> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
