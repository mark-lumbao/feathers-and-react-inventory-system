import { action, createAsyncAction } from 'typesafe-actions';
import { paginationProps } from 'constants/common';
import { clientProps } from 'actions/client/actions';
import { agentProps } from 'actions/agent/actions';
import { productProps } from 'actions/product/actions';
import * as TYPES from './types';

export type transactionProductProps = {
  _id?: string,
  product: string | productProps,
  unit: string,
  quantity: number,
}

export type transactionFormProps = {
  _id: string,
  terms: string,
  totalPrice: number,
  agent: string,
  client?: string,
  products: transactionProductProps[],
}

export type transactionDataProps = {
  _id: string,
  terms: string,
  createdAt: Date,
  totalPrice: number,
  agent: agentProps,
  client: clientProps,
  products: transactionProductProps[],
}

export type TransactionStateProps = {
  data: transactionDataProps[],
  limit: number,
  skip: number,
  total: number,
  processing: boolean,
}

export const fetchTransactions = (payload?: Partial<paginationProps>) => action(
  TYPES.FETCH_TRANSACTIONS_REQUEST,
  payload,
);

export const handleFetchTransactionsAsync = createAsyncAction(
  TYPES.FETCH_TRANSACTIONS_REQUEST,
  TYPES.FETCH_TRANSACTIONS_SUCCESS,
  TYPES.FETCH_TRANSACTIONS_FAILURE,
)<Partial<paginationProps>, TransactionStateProps, Error>();

export const fetchTransaction = (payload: string) => action(
  TYPES.FETCH_TRANSACTION_REQUEST,
  payload,
);

export const handleFetchTransactionAsync = createAsyncAction(
  TYPES.FETCH_TRANSACTION_REQUEST,
  TYPES.FETCH_TRANSACTION_SUCCESS,
  TYPES.FETCH_TRANSACTION_FAILURE,
)<string, transactionDataProps, Error>();

export const submitTransaction = (payload: transactionFormProps) => action(
  TYPES.ADD_TRANSACTION_REQUEST,
  payload,
);

export const handleSubmitTransactionAsync = createAsyncAction(
  TYPES.ADD_TRANSACTION_REQUEST,
  TYPES.ADD_TRANSACTION_SUCCESS,
  TYPES.ADD_TRANSACTION_FAILURE,
)<transactionFormProps, void, Error>();

export const updateTransaction = (payload: transactionFormProps) => action(
  TYPES.UPDATE_TRANSACTION_REQUEST,
  payload,
);

export const handleUpdateTransactionAsync = createAsyncAction(
  TYPES.UPDATE_TRANSACTION_REQUEST,
  TYPES.UPDATE_TRANSACTION_SUCCESS,
  TYPES.UPDATE_TRANSACTION_FAILURE,
)<transactionFormProps, transactionDataProps, Error>();
