import { takeLatest, put } from 'redux-saga/effects';
import { Params } from '@feathersjs/feathers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { paginationProps, DEFAULT_PAGINATION } from 'constants/common';
import { transactionDataProps, transactionFormProps, TransactionStateProps } from 'actions/transaction/actions';

const {
  transaction: transactionActions,
  notification: notifActions,
} = actions;

function* fetchTransactions({ payload = DEFAULT_PAGINATION }: { payload: paginationProps }) {
  try {
    const { skip, limit } = payload;
    const config: Params = {
      query: { $limit: limit, $skip: skip, $sort: '-createdAt' },
    };

    const response: TransactionStateProps = yield SERVICES.transactionsService.find(config);

    const newData: transactionDataProps[] = response.data
      .map((data) => ({ ...data, createdAt: new Date(data.createdAt) }));

    yield put(transactionActions.handleFetchTransactionsAsync
      .success({ ...response, data: newData }));
    yield put(notifActions.addNotification({
      message: 'Successfully Fetched Transactions',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(transactionActions.handleFetchTransactionsAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* fetchTransaction({ payload }: { payload: string }) {
  try {
    const config: Params = {
    };

    const { createdAt, ...response } = yield SERVICES.transactionsService.get(payload, config);
    const newData = ({ ...response, createdAt: new Date(createdAt) });

    yield put(transactionActions.handleFetchTransactionAsync
      .success(newData));
    yield put(notifActions.addNotification({
      message: `Successfully Fetched Transaction ${payload}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(transactionActions.handleFetchTransactionAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* submitTransaction({ payload }: { payload: transactionFormProps }) {
  try {
    const { _id: id }: transactionDataProps = yield SERVICES
      .transactionsService.create(payload);
    yield put(transactionActions.handleSubmitTransactionAsync.success());
    yield put(notifActions.addNotification({
      message: `Successful submitted transaction - ${id}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(transactionActions.handleSubmitTransactionAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* transactionSagas() {
  yield takeLatest(transactionActions.handleFetchTransactionsAsync.request, fetchTransactions);
  yield takeLatest(transactionActions.handleFetchTransactionAsync.request, fetchTransaction);
  yield takeLatest(transactionActions.handleSubmitTransactionAsync.request, submitTransaction);
}
