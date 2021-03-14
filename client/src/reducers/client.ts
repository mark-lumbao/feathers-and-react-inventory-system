import { createReducer } from 'typesafe-actions';
import filter from 'lodash/filter';
import {
  ClientStateProps, handleFetchClientsAsync, handleSubmitClientAsync,
  handleUpdateClientAsync, handleDeleteClientAsync,
} from 'actions/client/actions';
import { DEFAULT_PAGINATION } from 'constants/common';

const INITIAL_STATES: ClientStateProps = {
  data: [],
  limit: DEFAULT_PAGINATION.limit,
  skip: DEFAULT_PAGINATION.skip,
  total: 0,
  processing: false,
};

const fetchProductsHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchClientsAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchClientsAsync.success,
    (state, { payload }) => ({ ...state, ...payload, processing: false }))
  .handleAction(handleFetchClientsAsync.failure,
    (state) => ({ ...state, processing: false }));

const submitClientHandler = createReducer(INITIAL_STATES)
  .handleAction(handleSubmitClientAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleSubmitClientAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleSubmitClientAsync.failure,
    (state) => ({ ...state, processing: false }));

const updateClientHandler = createReducer(INITIAL_STATES)
  .handleAction(handleUpdateClientAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleUpdateClientAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleUpdateClientAsync.failure,
    (state) => ({ ...state, processing: false }));

const deleteClientHandler = createReducer(INITIAL_STATES)
  .handleAction(handleDeleteClientAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleDeleteClientAsync.success,
    (state, { payload }) => ({
      ...state,
      data: filter(state.data, ({ _id: id }) => id !== payload),
      processing: false,
    }))
  .handleAction(handleDeleteClientAsync.failure,
    (state) => ({ ...state, processing: false }));

export default createReducer(INITIAL_STATES, {
  ...fetchProductsHandler.handlers,
  ...submitClientHandler.handlers,
  ...updateClientHandler.handlers,
  ...deleteClientHandler.handlers,
});
