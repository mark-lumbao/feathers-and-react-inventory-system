// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import * as ROUTES from '../constants/routes';

/**
 * Converts all Decimal128 type properties of transaction fetch results.
 */
export default (): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.path === ROUTES.API_TRANSACTIONS) {
      if (context.method === 'find') {
        context.result.data = context.result.data.map((d: any) => ({
          ...d,
          totalPrice: parseFloat(d.totalPrice),
          /**
           * @NOTE
           * Conversion are disabled on transaction
           * find method since product items here
           * are not pre-loaded
           */
        }));
      } else if (context.method === 'get') {
        context.result.totalPrice = parseFloat(context.result.totalPrice);
        context.result.products = context.result.products.map((p: any) => {
          try {
            return ({
              ...p,
              product: {
                ...p.product,
                price: parseFloat(p.product.price),
              },
            });
          } catch (_err) { return p; }
        });
      }
    } else if (context.path === ROUTES.API_PRODUCTS) {
      if (context.method === 'find') {
        context.result.data = context.result.data.map((d: any) => ({
          ...d,
          price: parseFloat(d.price),
        }));
      } else if (context.method === 'get') {
        context.result.price = parseFloat(context.result.price);
      }
    }

    return context;
  };
};
