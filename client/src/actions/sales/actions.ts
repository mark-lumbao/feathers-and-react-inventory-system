import { action, createAsyncAction } from 'typesafe-actions';
import * as TYPES from './types';

export type salesRecordProps = {
  sales: number,
  year: number,
  month: 1 | 2 | 3 | 4 | 5 | 6
      | 7 | 8 | 9 | 10 | 11 | 12,
}

export type SalesStateProps = {
  monthlySales: {
    data: salesRecordProps[],
    fetching: boolean,
  },
};

export const fetchMonthlySales = (payload: { year: string, agent?: string }) => action(
  TYPES.FETCH_SALES_REQUEST,
  payload,
);

export const handleFetchMonthlySales = createAsyncAction(
  TYPES.FETCH_SALES_REQUEST,
  TYPES.FETCH_SALES_SUCCESS,
  TYPES.FETCH_SALES_FAILURE,
)<{ year: string, agent?: string }, salesRecordProps[], Error>();
