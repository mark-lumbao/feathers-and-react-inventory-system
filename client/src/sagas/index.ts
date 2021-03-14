import { all } from 'redux-saga/effects';
import authSagas from './auth';
import transactionSagas from './transaction';
import productSagas from './product';
import clientSagas from './client';
import userSagas from './user';
import agentSagas from './agent';
import salesSagas from './sales';

export default function* rootSaga() {
  yield all([
    /**
     * @NOTE
     * Add all your sagas inside this array.
     */
    authSagas(),
    transactionSagas(),
    productSagas(),
    clientSagas(),
    userSagas(),
    agentSagas(),
    salesSagas(),
  ]);
}
