import { createReducer } from 'typesafe-actions';
import actions from 'actions';
import { AuthStateProps } from 'actions/auth/actions';
import * as TYPES from 'actions/auth/types';

const INITIAL_STATE: AuthStateProps = {
  processing: false,
};

const { auth: authActions } = actions;

const authActionsHandler = createReducer(INITIAL_STATE)
  .handleAction(authActions.handleAsyncLogin.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(authActions.handleAsyncLogin.success,
    (state, { payload }) => ({
      ...state, ...payload, processing: false, error: null,
    }))
  .handleAction(authActions.handleAsyncLogin.failure,
    (state, { payload }) => ({
      ...state,
      processing: false,
      error: `${payload.name}: ${payload.message}`,
      user: null,
      accessToken: null,
    }));

const requestResetHandler = createReducer(INITIAL_STATE)
  .handleAction(authActions.handlerequestResetPasswordAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(authActions.handlerequestResetPasswordAsync.success,
    (state) => ({
      ...state,
      processing: false,
    }))
  .handleAction(authActions.handlerequestResetPasswordAsync.failure,
    (state) => ({
      ...state,
      processing: false,
    }));

const passwordResetHandler = createReducer(INITIAL_STATE)
  .handleAction(authActions.handleResetPasswordAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(authActions.handleResetPasswordAsync.success,
    (state) => ({
      ...state,
      processing: false,
    }))
  .handleAction(authActions.handleResetPasswordAsync.failure,
    (state) => ({
      ...state,
      processing: false,
    }));

export default createReducer(INITIAL_STATE, {
  ...authActionsHandler.handlers,
  ...requestResetHandler.handlers,
  ...passwordResetHandler.handlers,
}).handleType(TYPES.SIGNOUT_REQUEST,
  () => (INITIAL_STATE));
