import { createReducer } from 'typesafe-actions';
import filter from 'lodash/filter';
import {
  ProductStateProps, handleFetchProductsAsync, handleSubmitProductAsync,
  handleUpdateProductAsync, handleDeleteProductAsync,
} from 'actions/product/actions';
import { DEFAULT_PAGINATION } from 'constants/common';

const INITIAL_STATES: ProductStateProps = {
  data: [],
  limit: 30,
  skip: DEFAULT_PAGINATION.skip,
  total: 0,
  processing: false,
};

const fetchProductsHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchProductsAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchProductsAsync.success,
    (state, { payload }) => ({ ...state, ...payload, processing: false }))
  .handleAction(handleFetchProductsAsync.failure,
    (state) => ({ ...state, processing: false }));

const submitProductHandler = createReducer(INITIAL_STATES)
  .handleAction(handleSubmitProductAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleSubmitProductAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleSubmitProductAsync.failure,
    (state) => ({ ...state, processing: false }));

const updateProductHandler = createReducer(INITIAL_STATES)
  .handleAction(handleUpdateProductAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleUpdateProductAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleUpdateProductAsync.failure,
    (state) => ({ ...state, processing: false }));

const deleteProductHandler = createReducer(INITIAL_STATES)
  .handleAction(handleDeleteProductAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleDeleteProductAsync.success,
    (state, { payload }) => ({
      ...state,
      data: filter(state.data, ({ _id: id }) => id !== payload),
      processing: false,
    }))
  .handleAction(handleDeleteProductAsync.failure,
    (state) => ({ ...state, processing: false }));

export default createReducer(INITIAL_STATES, {
  ...fetchProductsHandler.handlers,
  ...submitProductHandler.handlers,
  ...updateProductHandler.handlers,
  ...deleteProductHandler.handlers,
});
