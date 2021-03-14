import { createReducer } from 'typesafe-actions';
import filter from 'lodash/filter';
import {
  AgentStateProps, handleFetchAgentsAsync, handleSubmitAgentAsync,
  handleUpdateAgentAsync, handleDeleteAgentAsync,
} from 'actions/agent/actions';
import { DEFAULT_PAGINATION } from 'constants/common';

const INITIAL_STATES: AgentStateProps = {
  data: [],
  limit: DEFAULT_PAGINATION.limit,
  skip: DEFAULT_PAGINATION.skip,
  total: 0,
  processing: false,
};

const fetchAgentsHandler = createReducer(INITIAL_STATES)
  .handleAction(handleFetchAgentsAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleFetchAgentsAsync.success,
    (state, { payload }) => ({ ...state, ...payload, processing: false }))
  .handleAction(handleFetchAgentsAsync.failure,
    (state) => ({ ...state, processing: false }));

const submitAgentHandler = createReducer(INITIAL_STATES)
  .handleAction(handleSubmitAgentAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleSubmitAgentAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleSubmitAgentAsync.failure,
    (state) => ({ ...state, processing: false }));

const updateAgentHandler = createReducer(INITIAL_STATES)
  .handleAction(handleUpdateAgentAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleUpdateAgentAsync.success,
    (state) => ({ ...state, processing: false }))
  .handleAction(handleUpdateAgentAsync.failure,
    (state) => ({ ...state, processing: false }));

const deleteAgentHandler = createReducer(INITIAL_STATES)
  .handleAction(handleDeleteAgentAsync.request,
    (state) => ({ ...state, processing: true }))
  .handleAction(handleDeleteAgentAsync.success,
    (state, { payload }) => ({
      ...state,
      data: filter(state.data, ({ _id: id }) => id !== payload),
      processing: false,
    }))
  .handleAction(handleDeleteAgentAsync.failure,
    (state) => ({ ...state, processing: false }));

export default createReducer(INITIAL_STATES, {
  ...fetchAgentsHandler.handlers,
  ...submitAgentHandler.handlers,
  ...updateAgentHandler.handlers,
  ...deleteAgentHandler.handlers,
});
