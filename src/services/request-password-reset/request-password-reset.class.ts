import { ServiceMethods } from '@feathersjs/feathers';
import { NotFound, BadRequest, NotAcceptable } from '@feathersjs/errors';
import { Mongoose } from 'mongoose';
import { Application } from '../../declarations';
import { IUser } from '../users/users.class';
import { uuid, sendMail } from '../../utils';

interface Data {
  email: string;
  info: any;
}

interface ServiceOptions {}

export class RequestPasswordReset implements ServiceMethods<Data> {
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

  /**
   * @param email
   * @FEATURE
   * Generate and send a reset link with a unique token to the email provided.
   */
  async create (data: Data): Promise<Data> {
    const { email } = data;

    if (!email) throw new BadRequest('Email not provided.'); // error if email is not provided

    const mongooseClient: Mongoose = this.app.get('mongooseClient');

    const userModel = mongooseClient.model<IUser>('users');

    const user = await userModel.findOne({ email }).exec();

    if (!user) throw new NotAcceptable(`User with email ${email} is not found.`); // error if no users owning the provided email is found.

    const uniqueToken = uuid();

    try {
      await userModel.updateOne({ email }, { resetToken: uniqueToken }).exec();
    } catch (e) {
      throw new BadRequest(e);
    }

    // only use static ports on development
    const port = process.env.NODE_ENV === 'development' ? `:${this.app.get('port')}` : null;

    const resetUrl = `${process.env.NODE_ENV === 'development' && 'http://'}${this.app.get('host')}${port}/reset/${uniqueToken}`;

    /**
     * @TODO create a better email template
     */
    const emailContent = `<a href="${resetUrl}">${resetUrl}</a>`;

    try {
      const info = await sendMail({
        from: 'your-email@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Reset Password Url', // Subject line
        html: emailContent,
      });
      data.info = info;
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  async update (): Promise<Data> {
    throw new NotFound();
  }

  async patch (): Promise<Data> {
    throw new NotFound();
  }

  async remove (): Promise<Data> {
    throw new NotFound();
  }
}
