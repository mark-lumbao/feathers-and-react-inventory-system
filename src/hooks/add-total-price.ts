// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Transaction } from '../services/transactions/transactions.class';
import { Mongoose } from 'mongoose';
import { IProducts } from '../services/products/products.class';

/**
 * This hook inserts the total price for all transactions entry.
 */
export default (): Hook => {
  return async (context: HookContext<Transaction>): Promise<HookContext<Transaction>> => {
    const data = context.data;
    const mongooseClient: Mongoose = context.app.get('mongooseClient');
    const productModel = mongooseClient.model<IProducts>('products');

    /**
     * @NOTE this hook returns a BadRequest error
     * if no products are provided in the request.
     */
    if (!data?.products || data?.products.length <= 0) {
      console.error('Not products provided!');
      throw new BadRequest('Not products were provided!');
    }

    /**
     * @NOTE the code below sums all product prices then
     * insert it to the request's data for final processing.
     */
    let totalPrice = 0;
    const computeTotalPrice = async() => {
      if (data) {
        for (const item in data.products) {
          const fetchedProduct = await productModel.findOne({ '_id': data.products[item].product}).exec();
          /** @NOTE if one product in the list is invalid. Return a BadRequest error. */
          if(!fetchedProduct) {
            throw new BadRequest(`Product ${data.products[item].product} not found`);
          }
          const price = parseFloat(fetchedProduct?.price.toString() as string) * data.products[item].quantity;
          totalPrice += price;
        }
      }
    };

    await computeTotalPrice();

    if (context.data) {
      context.data.totalPrice = totalPrice;
    }

    return context;
  };
};
