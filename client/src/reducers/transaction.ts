import { createReducer } from 'typesafe-actions';
import filter from 'lodash/filter';
import {
  TransactionStateProps, handleFetchTransactionsAsync, handleFetchTransactionAsync,
  handleSubmitTransactionAsync,
} from 'actions/transaction/actions';
import { DEFAULT_PAGINATION } from 'constants/common';

const INITIAL_STATES: TransactionStateProps = {
  data: [],
  limit: 30,
  skip: DEFAULT_PAGINATION.skip,
  total: 0,
  processing: false,
};

const fetchTransactionsHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchTransactionsAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchTransactionsAsync.success,
    (state, { payload }) => ({ ...state, ...payload, processing: false }))
  .handleAction(handleFetchTransactionsAsync.failure,
    (state) => ({ ...state, processing: false }));

const fetchTransactionHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchTransactionAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchTransactionAsync.success,
    (state, { payload }) => ({
      ...state,
      data: [
        // eslint-disable-next-line no-underscore-dangle
        ...filter(state.data, (t) => t._id !== payload._id),
        payload,
      ],
      processing: false,
    }))
  .handleAction(handleFetchTransactionAsync.failure,
    (state) => ({ ...state, processing: false }));

const submitTransactionHandler = createReducer(INITIAL_STATES)
  .handleAction(handleSubmitTransactionAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleSubmitTransactionAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleSubmitTransactionAsync.failure,
    (state) => ({ ...state, processing: false }));

export default createReducer(INITIAL_STATES, {
  ...fetchTransactionsHandler.handlers,
  ...fetchTransactionHandler.handlers,
  ...submitTransactionHandler.handlers,
});
