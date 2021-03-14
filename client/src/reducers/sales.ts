import { createReducer } from 'typesafe-actions';
import {
  handleFetchMonthlySales, SalesStateProps,
} from 'actions/sales/actions';

const INITIAL_STATES: SalesStateProps = {
  monthlySales: {
    data: [],
    fetching: false,
  },
};

const fetchMonthlySalesHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchMonthlySales.request,
    (state) => ({
      ...state,
      monthlySales: { ...state.monthlySales, fetching: true },
    }))
  .handleAction(handleFetchMonthlySales.success,
    (state, { payload }) => ({
      ...state,
      monthlySales: {
        ...state.monthlySales,
        data: payload,
        fetching: false,
      },
    }))
  .handleAction(handleFetchMonthlySales.failure,
    (state) => ({
      ...state,
      monthlySales: { ...state.monthlySales, fetching: false },
    }));

export default createReducer(INITIAL_STATES, {
  ...fetchMonthlySalesHandler.handlers,
});
