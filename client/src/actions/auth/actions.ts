import { action, createAsyncAction } from 'typesafe-actions';
import * as TYPES from './types';

export type userProps = {
  _id: string,
  email: string,
  fullName: string,
  firstName: string,
  middleName: string,
  role: string,
  userName: string,
  lastName: string,
}

export type AuthStateProps = {
  processing?: boolean,
  error?: string,
  accessToken?: string,
  user?: userProps,
}

export interface loginActionProps {
  strategy: string;
  email: string;
  password: string;
}

export type resetPasswordProps = { token: string, password: string };

export const login = (payload: loginActionProps) => action(
  TYPES.LOGIN_REQUEST,
  payload,
);

export const handleAsyncLogin = createAsyncAction(
  TYPES.LOGIN_REQUEST,
  TYPES.LOGIN_SUCCESS,
  TYPES.LOGIN_FAILURE,
)<loginActionProps, AuthStateProps, Error>();

export const requestResetPassword = (payload: string) => action(
  TYPES.REQUEST_RESET_REQUEST,
  payload,
);

export const handlerequestResetPasswordAsync = createAsyncAction(
  TYPES.REQUEST_RESET_REQUEST,
  TYPES.REQUEST_RESET_SUCCESS,
  TYPES.REQUEST_RESET_FAILURE,
)<string, void, Error>();

export const resetPassword = (payload: resetPasswordProps) => action(
  TYPES.RESET_PASSWORD_REQUEST,
  payload,
);

export const handleResetPasswordAsync = createAsyncAction(
  TYPES.RESET_PASSWORD_REQUEST,
  TYPES.RESET_PASSWORD_SUCCESS,
  TYPES.RESET_PASSWORD_FAILURE,
)<resetPasswordProps, void, Error>();

export const signout = () => action(
  TYPES.SIGNOUT_REQUEST,
);
