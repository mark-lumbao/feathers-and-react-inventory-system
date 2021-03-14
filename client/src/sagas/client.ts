import { takeLatest, put } from 'redux-saga/effects';
import { Params } from '@feathersjs/feathers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { paginationProps, DEFAULT_PAGINATION } from 'constants/common';
import { ClientStateProps, clientProps } from 'actions/client/actions';

const {
  client: clientActions,
  notification: notifActions,
} = actions;

function* fetchClients({ payload = DEFAULT_PAGINATION }: { payload: paginationProps }) {
  try {
    const { skip, limit } = payload;
    const config: Params = {
      query: { $limit: limit, $skip: skip, $sort: '-createdAt' },
    };

    const response: ClientStateProps = yield SERVICES.clientsService.find(config);

    yield put(clientActions.handleFetchClientsAsync.success(response));
    yield put(notifActions.addNotification({
      message: 'Successfully Fetched Clients',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(clientActions.handleFetchClientsAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* submitClient({ payload }: { payload: clientProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.clientsService.create(payload, config);

    yield put(clientActions.handleSubmitClientAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully added ${payload.name}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(clientActions.handleSubmitClientAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* submitUpdate({ payload: { _id: id, ...rest } }: { payload: clientProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.clientsService.patch(id, rest, config);

    yield put(clientActions.handleUpdateClientAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully updated ${rest.name}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(clientActions.handleUpdateClientAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* deleteClient({ payload }: { payload: string }) {
  try {
    const config: Params = {
    };

    yield SERVICES.clientsService.remove(payload, config);

    yield put(clientActions.handleDeleteClientAsync.success(payload));

    yield put(notifActions.addNotification({
      message: `Successfully deleted ${payload}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(clientActions.handleDeleteClientAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* clientSagas() {
  yield takeLatest(clientActions.handleFetchClientsAsync.request, fetchClients);
  yield takeLatest(clientActions.handleSubmitClientAsync.request, submitClient);
  yield takeLatest(clientActions.handleUpdateClientAsync.request, submitUpdate);
  yield takeLatest(clientActions.handleDeleteClientAsync.request, deleteClient);
}
