import { takeLatest, put } from 'redux-saga/effects';
import { Params } from '@feathersjs/feathers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { paginationProps, DEFAULT_PAGINATION } from 'constants/common';
import { productProps, ProductStateProps } from 'actions/product/actions';

const {
  product: productActions,
  notification: notifActions,
} = actions;

function* fetchProducts({ payload = DEFAULT_PAGINATION }: { payload: paginationProps }) {
  try {
    const { skip, limit } = payload;
    const config: Params = {
      query: { $limit: limit, $skip: skip, $sort: 'createdAt' },
    };

    const response: ProductStateProps = yield SERVICES.productsService.find(config);

    yield put(productActions.handleFetchProductsAsync.success(response));
    yield put(notifActions.addNotification({
      message: 'Successfully Fetched Products',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(productActions.handleFetchProductsAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* submitProduct({ payload }: { payload: productProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.productsService.create(payload, config);

    yield put(productActions.handleSubmitProductAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully added ${payload.name}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(productActions.handleSubmitProductAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* updateProduct({ payload: { _id: id, ...rest } }: { payload: productProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.productsService.patch(id, rest, config);

    yield put(productActions.handleUpdateProductAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully updated ${id}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(productActions.handleUpdateProductAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* deleteProduct({ payload }: { payload: string }) {
  try {
    const config: Params = {
    };

    yield SERVICES.productsService.remove(payload, config);

    yield put(productActions.handleDeleteProductAsync.success(payload));

    yield put(notifActions.addNotification({
      message: `Successfully deleted ${payload}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(productActions.handleDeleteProductAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* productSagas() {
  yield takeLatest(productActions.handleFetchProductsAsync.request, fetchProducts);
  yield takeLatest(productActions.handleSubmitProductAsync.request, submitProduct);
  yield takeLatest(productActions.handleUpdateProductAsync.request, updateProduct);
  yield takeLatest(productActions.handleDeleteProductAsync.request, deleteProduct);
}
