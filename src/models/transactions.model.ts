// transactions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'transactions';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },

    }],
    totalPrice: { type: Schema.Types.Decimal128, required: true },
    agent: { type: Schema.Types.ObjectId, ref: 'agents', required: true },
    terms: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'clients' },
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
