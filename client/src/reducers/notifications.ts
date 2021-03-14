import { createReducer } from 'typesafe-actions';
import { NotificationStateProps } from 'actions/notification/actions';
import * as TYPES from 'actions/notification/types';

const INITIAL_STATE: NotificationStateProps = [];

export default createReducer(INITIAL_STATE)
  .handleType(TYPES.ADD_NOTIFICATION,
    (state, { payload }) => [...state, payload]);
