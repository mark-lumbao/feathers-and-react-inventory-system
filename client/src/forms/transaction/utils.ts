import { Params } from '@feathersjs/feathers';
import * as SERVICES from 'utils/services';
import { productProps } from 'actions/product/actions';
import { agentProps } from 'actions/agent/actions';
import { clientProps } from 'actions/client/actions';

export const DEFAULT_PRODUCTS_LIMIT = 30;

export const getClients = async ({ skip, keyword }: { skip?: number, keyword?: string }) => {
  const config: Params = {
    query: { $limit: 30, $skip: skip || 0, name: { $regex: keyword } },
  };
  const { data } = await SERVICES.clientsService.find(config);
  return data.map(({ _id: id, name }: clientProps) => ({ value: id, label: name }));
};

export const getAgents = async ({ skip, keyword }: { skip?: number, keyword?: string }) => {
  const config: Params = {
    query: { $limit: 30, $skip: skip || 0, fullName: { $regex: keyword } },
  };
  const { data } = await SERVICES.agentsService.find(config);
  return data.map(({ _id: id, fullName }: agentProps) => ({ value: id, label: fullName }));
};

export type productDataProps = {
  id: string,
  name: string,
  price: number,
  stocks: number,
  quantity?: number,
  invalid?: boolean,
  unit?: string,
}

export type productListDataProps = {
  data: productDataProps[],
  total: number,
}

export const getproducts = async (
  { page, name: productName }: { page: number, name?: string },
): Promise<productListDataProps> => {
  const config: Params = {
    /** @note skip is page value times the number of product per page */
    query: {
      $limit: DEFAULT_PRODUCTS_LIMIT,
      $skip: (page - 1) * DEFAULT_PRODUCTS_LIMIT || 0,
    },
  };
  if (productName) config.query.name = { $regex: productName };
  const { data, total } = await SERVICES.productsService.find(config);
  return ({
    data: data.map(({
      _id: id, name, price, stocks,
    }: productProps) => ({
      id, name, price, stocks,
    })),
    total,
  });
};

export const inputProp = (label: string, required: boolean) => ({
  label,
  placeholder: label,
  required,
});
