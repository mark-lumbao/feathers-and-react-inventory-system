import { ActionType } from 'typesafe-actions';
import * as authActions from './auth/actions';
import * as notificationActions from './notification/actions';
import * as transactionActions from './transaction/actions';
import * as productActions from './product/actions';
import * as clientActions from './client/actions';
import * as userActions from './user/actions';
import * as agentActions from './agent/actions';
import * as salesActions from './sales/actions';

const rootAction = ({
  auth: authActions,
  notification: notificationActions,
  transaction: transactionActions,
  product: productActions,
  client: clientActions,
  user: userActions,
  agent: agentActions,
  sales: salesActions,
});

export type RootAction = ActionType<typeof rootAction>;

export default rootAction;
