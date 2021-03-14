import { takeLatest, put } from 'redux-saga/effects';
import { Params } from '@feathersjs/feathers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { paginationProps, DEFAULT_PAGINATION } from 'constants/common';
import { userProps, UserStateProps } from 'actions/user/actions';

const {
  user: userActions,
  notification: notifActions,
} = actions;

function* fetchUsers({ payload = DEFAULT_PAGINATION }: { payload: paginationProps }) {
  try {
    const { skip, limit } = payload;
    const config: Params = {
      query: { $limit: limit, $skip: skip, $sort: '-createdAt' },
    };

    const response: UserStateProps = yield SERVICES.usersService.find(config);

    yield put(userActions.handleFetchUsersAsync.success(response));
    yield put(notifActions.addNotification({
      message: 'Successfully Fetched Users',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(userActions.handleFetchUsersAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* registerUser({ payload }: { payload: userProps }) {
  try {
    const response: userProps = yield SERVICES.usersService.create(payload);
    yield put(userActions.handleRegisterUserAsync.success(response));
    yield put(notifActions.addNotification({
      message: `Successfully Registered ${response.fullName}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(userActions.handleRegisterUserAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* updateUser({ payload: { _id: id, ...rest } }: { payload: userProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.usersService.patch(id, rest, config);

    yield put(userActions.handleUpdateUserAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully updated ${id}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(userActions.handleUpdateUserAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* deleteUser({ payload }: { payload: string }) {
  try {
    const config: Params = {
    };

    yield SERVICES.usersService.remove(payload, config);

    yield put(userActions.handleDeleteUserAsync.success(payload));

    yield put(notifActions.addNotification({
      message: `Successfully deleted ${payload}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(userActions.handleDeleteUserAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* agentSagas() {
  yield takeLatest(userActions.handleFetchUsersAsync.request, fetchUsers);
  yield takeLatest(userActions.handleRegisterUserAsync.request, registerUser);
  yield takeLatest(userActions.handleUpdateUserAsync.request, updateUser);
  yield takeLatest(userActions.handleDeleteUserAsync.request, deleteUser);
}
