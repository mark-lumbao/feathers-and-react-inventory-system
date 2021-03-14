import { takeLatest, put } from 'redux-saga/effects';
import * as SERVICES from 'utils/services';
import actions from 'actions';

function* fetchMonthlySalesAsync({ payload: query }: { payload: { year: string, agent?: string }}) {
  try {
    const response = yield SERVICES.salesService.find({
      query,
    });
    yield put(actions.sales.handleFetchMonthlySales.success(response));
    yield put(actions.notification.addNotification({
      message: 'Successfully fetched sales record',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(actions.sales.handleFetchMonthlySales.failure(error));
    yield put(actions.notification.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* salesSagas() {
  yield takeLatest(actions.sales.handleFetchMonthlySales.request, fetchMonthlySalesAsync);
}
