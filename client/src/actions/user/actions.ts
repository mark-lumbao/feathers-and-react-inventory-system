import { action, createAsyncAction } from 'typesafe-actions';
import { paginationProps } from 'constants/common';
import * as TYPES from './types';

export type userProps = {
  _id: string,
  email: string,
  firstName: string,
  fullName: string,
  middleName: string,
  role: string,
  userName: string,
  password?: string,
}

export type UserStateProps = {
  data: userProps[],
  limit: number,
  skip: number,
  total: number,
  processing: boolean,
}

export const fetchUsers = (payload?: Partial<paginationProps>) => action(
  TYPES.FETCH_USERS_REQUEST,
  payload,
);

export const handleFetchUsersAsync = createAsyncAction(
  TYPES.FETCH_USERS_REQUEST,
  TYPES.FETCH_USERS_SUCCESS,
  TYPES.FETCH_USERS_FAILURE,
)<Partial<paginationProps>, UserStateProps, Error>();

export const registerUser = (payload: userProps) => action(
  TYPES.REGISTER_USER_REQUEST,
  payload,
);

export const handleRegisterUserAsync = createAsyncAction(
  TYPES.REGISTER_USER_REQUEST,
  TYPES.REGISTER_USER_SUCCESS,
  TYPES.REGISTER_USER_FAILURE,
)<userProps, userProps, Error>();

export const updateUser = (payload: userProps) => action(
  TYPES.UPDATE_USER_REQUEST,
  payload,
);

export const handleUpdateUserAsync = createAsyncAction(
  TYPES.UPDATE_USER_REQUEST,
  TYPES.UPDATE_USER_SUCCESS,
  TYPES.UPDATE_USER_FAILURE,
)<userProps, userProps, Error>();

export const deleteUser = (payload: string) => action(
  TYPES.DELETE_USER_REQUEST,
  payload,
);

export const handleDeleteUserAsync = createAsyncAction(
  TYPES.DELETE_USER_REQUEST,
  TYPES.DELETE_USER_SUCCESS,
  TYPES.DELETE_USER_FAILURE,
)<string, string, Error>();
