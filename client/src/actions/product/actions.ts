import { action, createAsyncAction } from 'typesafe-actions';
import { paginationProps } from 'constants/common';
import * as TYPES from './types';

export type productProps = {
  _id?: string,
  name: string,
  price: number,
  details?: string,
  stocks: number,
}

export type ProductStateProps = {
  data: productProps[],
  limit: number,
  skip: number,
  total: number,
  processing: boolean,
}

export const fetchProducts = (payload?: Partial<paginationProps>) => action(
  TYPES.FETCH_PRODUCTS_REQUEST,
  payload,
);

export const handleFetchProductsAsync = createAsyncAction(
  TYPES.FETCH_PRODUCTS_REQUEST,
  TYPES.FETCH_PRODUCTS_SUCCESS,
  TYPES.FETCH_PRODUCTS_FAILURE,
)<Partial<paginationProps>, ProductStateProps, Error>();

export const submitProduct = (payload: productProps) => action(
  TYPES.SUBMIT_PRODUCT_REQUEST,
  payload,
);

export const handleSubmitProductAsync = createAsyncAction(
  TYPES.SUBMIT_PRODUCT_REQUEST,
  TYPES.SUBMIT_PRODUCT_SUCCESS,
  TYPES.SUBMIT_PRODUCT_FAILURE,
)<productProps, productProps, Error>();

export const updateProduct = (payload: productProps) => action(
  TYPES.UPDATE_PRODUCT_REQUEST,
  payload,
);

export const handleUpdateProductAsync = createAsyncAction(
  TYPES.UPDATE_PRODUCT_REQUEST,
  TYPES.UPDATE_PRODUCT_SUCCESS,
  TYPES.UPDATE_PRODUCT_FAILURE,
)<productProps, productProps, Error>();

export const deleteProduct = (payload: string) => action(
  TYPES.DELETE_PRODUCT_REQUEST,
  payload,
);

export const handleDeleteProductAsync = createAsyncAction(
  TYPES.DELETE_PRODUCT_REQUEST,
  TYPES.DELETE_PRODUCT_SUCCESS,
  TYPES.DELETE_PRODUCT_FAILURE,
)<string, string, Error>();
