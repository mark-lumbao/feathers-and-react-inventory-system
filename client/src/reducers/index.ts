import { combineReducers } from 'redux';
import authReducers from './auth';
import notificationReducers from './notifications';
import transactionReducers from './transaction';
import productReducers from './product';
import clientReducers from './client';
import userReducers from './user';
import agentReducers from './agent';
import salesReducers from './sales';

const rootReducer = combineReducers({
  auth: authReducers,
  notifications: notificationReducers,
  transaction: transactionReducers,
  product: productReducers,
  client: clientReducers,
  user: userReducers,
  agent: agentReducers,
  sales: salesReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
