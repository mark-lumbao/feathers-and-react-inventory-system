import { action, createAsyncAction } from 'typesafe-actions';
import { paginationProps } from 'constants/common';
import * as TYPES from './types';

export type clientProps = {
  _id?: string,
  address: string,
  contactNumber: string,
  contactPerson: string,
  name: string,
  salesman: string,
}

export type ClientStateProps = {
  data: clientProps[],
  limit: number,
  skip: number,
  total: number,
  processing: boolean,
}

export const fetchClients = (payload?: Partial<paginationProps>) => action(
  TYPES.FETCH_CLIENTS_REQUEST,
  payload,
);

export const handleFetchClientsAsync = createAsyncAction(
  TYPES.FETCH_CLIENTS_REQUEST,
  TYPES.FETCH_CLIENTS_SUCCESS,
  TYPES.FETCH_CLIENTS_FAILURE,
)<Partial<paginationProps>, ClientStateProps, Error>();

export const submitClient = (payload: clientProps) => action(
  TYPES.SUBMIT_CLIENT_REQUEST,
  payload,
);

export const handleSubmitClientAsync = createAsyncAction(
  TYPES.SUBMIT_CLIENT_REQUEST,
  TYPES.SUBMIT_CLIENT_SUCCESS,
  TYPES.SUBMIT_CLIENT_FAILURE,
)<clientProps, clientProps, Error>();

export const updateClient = (payload: clientProps) => action(
  TYPES.UPDATE_CLIENT_REQUEST,
  payload,
);

export const handleUpdateClientAsync = createAsyncAction(
  TYPES.UPDATE_CLIENT_REQUEST,
  TYPES.UPDATE_CLIENT_SUCCESS,
  TYPES.UPDATE_CLIENT_FAILURE,
)<clientProps, clientProps, Error>();

export const deleteClient = (payload: string) => action(
  TYPES.DELETE_CLIENT_REQUEST,
  payload,
);

export const handleDeleteClientAsync = createAsyncAction(
  TYPES.DELETE_CLIENT_REQUEST,
  TYPES.DELETE_CLIENT_SUCCESS,
  TYPES.DELETE_CLIENT_FAILURE,
)<string, string, Error>();
