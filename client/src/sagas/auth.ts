import { takeLatest, put, all } from 'redux-saga/effects';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { loginActionProps, resetPasswordProps } from 'actions/auth/actions';

const {
  auth: authActions,
  notification: notifActions,
} = actions;

function* loginAsync({ payload }: { payload: loginActionProps }) {
  try {
    const response = yield SERVICES.authenticationService.create(payload);
    yield put(authActions.handleAsyncLogin.success(response));
    yield put(notifActions.addNotification({
      message: 'User Authenticated',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(authActions.handleAsyncLogin.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* requestResetAsync({ payload }: { payload: string }) {
  try {
    yield SERVICES.requestResetService.create({ email: payload });
    yield put(authActions.handlerequestResetPasswordAsync.success());
    yield put(notifActions.addNotification({
      message: 'Request link sent, please check your email.',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(authActions.handlerequestResetPasswordAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* resetPassword({ payload: { token, password } }: { payload: resetPasswordProps }) {
  try {
    const response = yield SERVICES.resetPasswordService(token).patch(null, { password });
    yield all([
      yield put(authActions.handleResetPasswordAsync.success(response)),
      yield put(notifActions.addNotification({
        message: 'Successful password reset',
        options: { variant: 'success' },
      })),
    ]);
  } catch (error) {
    yield put(authActions.handleResetPasswordAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* authSagas() {
  yield takeLatest(authActions.handleAsyncLogin.request, loginAsync);
  yield takeLatest(authActions.handlerequestResetPasswordAsync.request, requestResetAsync);
  yield takeLatest(authActions.handleResetPasswordAsync.request, resetPassword);
}
