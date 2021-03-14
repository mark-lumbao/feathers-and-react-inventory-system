import { createReducer } from 'typesafe-actions';
import filter from 'lodash/filter';
import {
  UserStateProps, handleFetchUsersAsync, handleRegisterUserAsync,
  handleUpdateUserAsync, handleDeleteUserAsync,
} from 'actions/user/actions';
import { DEFAULT_PAGINATION } from 'constants/common';

const INITIAL_STATES: UserStateProps = {
  data: [],
  limit: DEFAULT_PAGINATION.limit,
  skip: DEFAULT_PAGINATION.skip,
  total: 0,
  processing: false,
};

const fetchUsersHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchUsersAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchUsersAsync.success,
    (state, { payload }) => ({ ...state, ...payload, processing: false }))
  .handleAction(handleFetchUsersAsync.failure,
    (state) => ({ ...state, processing: false }));

const registerUserHandler = createReducer(INITIAL_STATES)
  .handleAction(handleRegisterUserAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleRegisterUserAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleRegisterUserAsync.failure,
    (state) => ({ ...state, processing: false }));

const updateUserHandler = createReducer(INITIAL_STATES)
  .handleAction(handleUpdateUserAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleUpdateUserAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleUpdateUserAsync.failure,
    (state) => ({ ...state, processing: false }));

const deleteUserHandler = createReducer(INITIAL_STATES)
  .handleAction(handleDeleteUserAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleDeleteUserAsync.success,
    (state, { payload }) => ({
      ...state,
      data: filter(state.data, ({ _id: id }) => id !== payload),
      processing: false,
    }))
  .handleAction(handleDeleteUserAsync.failure,
    (state) => ({ ...state, processing: false }));

export default createReducer(INITIAL_STATES, {
  ...fetchUsersHandler.handlers,
  ...registerUserHandler.handlers,
  ...updateUserHandler.handlers,
  ...deleteUserHandler.handlers,
});
