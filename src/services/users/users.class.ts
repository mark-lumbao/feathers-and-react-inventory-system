import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Document } from 'mongoose';

export interface User {
  _id?: string;
  email?: string;
  password: string;
  role: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
}

export type IUser = Document & User;

export class Users extends Service<User> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
