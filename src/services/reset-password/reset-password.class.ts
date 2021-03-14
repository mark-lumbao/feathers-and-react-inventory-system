import { NullableId, Params, ServiceMethods } from '@feathersjs/feathers';
import { NotFound, BadRequest } from '@feathersjs/errors';
import { Mongoose } from 'mongoose';
import { IUser } from '../users/users.class';
import { Application } from '../../declarations';

interface Data {
  password: string;
}

interface ServiceOptions {}

export class ResetPassword implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find (): Promise<Data> {
    throw new NotFound();
  }

  async get (): Promise<Data> {
    throw new NotFound();
  }

  async create (): Promise<Data> {
    throw new NotFound();
  }

  async update (): Promise<Data> {
    throw new NotFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    const mongooseClient: Mongoose = this.app.get('mongooseClient');

    const userModel = mongooseClient.model<IUser>('users');

    const resetToken = id;

    const user = await userModel.findOne({ resetToken }).exec();

    if (!user) throw new BadRequest('Your request token is either taken or invalid.');

    await userModel.updateOne({ resetToken }, { password: data.password, resetToken: null });

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove (): Promise<Data> {
    throw new NotFound();
  }
}
