// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    email: { type: String, unique: true, lowercase: true },
    userName: { type: String, unique: true, required: true, },
    password: { type: String },
    role: { type: String, required: true },
    firstName: { type: String, trim: true, required: true },
    middleName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true },
    resetToken: { type: String, unique: true },

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
