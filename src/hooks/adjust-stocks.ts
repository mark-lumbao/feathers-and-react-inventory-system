// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Mongoose } from 'mongoose';
import { Transaction } from '../services/transactions/transactions.class';
import { IProducts } from '../services/products/products.class';

/**
 * This hook checks stocks from database then
 * deducts requested stocks to each requested products.
 */
export default (): Hook => {
  return async (context: HookContext<Transaction>): Promise<HookContext<Transaction>> => {
    const products = context.result?.products;
    const mongooseClient: Mongoose = context.app.get('mongooseClient');
    const productModel = mongooseClient.model<IProducts>('products');

    /**
     * @NOTE the block below deducts requested number of stocks
     * from each requested product.
     */
    const deductRequestedStocks = async () => {
      for (const id in products) {
        const { product, quantity } = products[parseInt(id)];
        const queriedProduct = await productModel.findOne({ _id: product }).exec();

        if (queriedProduct) {
          const newStock = queriedProduct?.stocks - quantity;
          await productModel
            .findOneAndUpdate({ _id: product }, { stocks: newStock }).exec();
        }
      }
    };

    await deductRequestedStocks();

    return context;
  };
};
