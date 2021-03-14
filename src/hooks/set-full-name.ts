// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Mongoose } from 'mongoose';
import { IUser } from '../services/users/users.class';

/**
 * This hook automatically generates the newly registered
 * user's full name based from the given firstName, middleName,
 * and lastName values.
 */
export default (): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data, id } = context;

    const mongooseClient: Mongoose = context.app.get('mongooseClient');

    const userModel = mongooseClient.model<IUser>('users');

    const user = await userModel.findOne({ _id: id });

    const { firstName, middleName, lastName } = data;

    const fullName = `${firstName ? firstName : user?.firstName} ${middleName ? middleName : user?.middleName} ${lastName ? lastName : user?.lastName}`;

    context.data = {
      ...data,
      fullName,
    };

    return context;
  };
};
