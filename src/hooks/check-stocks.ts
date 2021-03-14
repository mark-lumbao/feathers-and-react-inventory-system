// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Mongoose } from 'mongoose';
import { Transaction } from '../services/transactions/transactions.class';
import { IProducts } from '../services/products/products.class';

/**
 * This hook checks stocks from database then
 * deducts requested stocks to each requested products.
 */
export default (): Hook => {
  return async (context: HookContext<Transaction>): Promise<HookContext<Transaction>> => {
    const products = context.data?.products;
    const mongooseClient: Mongoose = context.app.get('mongooseClient');
    const productModel = mongooseClient.model<IProducts>('products');

    /**
     * @NOTE the block below checks if the requested products have
     * enough stocks.
     */
    const getErrors = async () => {
      let err: string[] = [];

      for (const id in products) {
        const { product, quantity } = products[parseInt(id)];
        const queriedProduct = await productModel.findOne({ _id: product }).exec();
        if (queriedProduct) {
          if (queriedProduct?.stocks < quantity) {
            err = [...err, (product as string)];
          }
        }
      }

      return err;
    };

    const stockErrors = await getErrors();
    if (stockErrors.length > 0) {
      console.error(`Insufficcient stocks for ${stockErrors}`);
      throw new BadRequest(`Insufficcient stocks for ${stockErrors}`, stockErrors);
    }

    return context;
  };
};
