import { takeLatest, put } from 'redux-saga/effects';
import { Params } from '@feathersjs/feathers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { paginationProps, DEFAULT_PAGINATION } from 'constants/common';
import { agentProps, AgentStateProps } from 'actions/agent/actions';

const {
  agent: agentActions,
  notification: notifActions,
} = actions;

function* fetchAgents({ payload = DEFAULT_PAGINATION }: { payload: paginationProps }) {
  try {
    const { skip, limit } = payload;
    const config: Params = {
      query: { $limit: limit, $skip: skip, $sort: '-createdAt' },
    };

    const response: AgentStateProps = yield SERVICES.agentsService.find(config);

    yield put(agentActions.handleFetchAgentsAsync.success(response));
    yield put(notifActions.addNotification({
      message: 'Successfully Fetched Agents',
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(agentActions.handleFetchAgentsAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* registerAgent({ payload }: { payload: agentProps }) {
  try {
    const response: agentProps = yield SERVICES.agentsService.create(payload);
    yield put(agentActions.handleSubmitAgentAsync.success(response));
    yield put(notifActions.addNotification({
      message: `Successfully Registered ${response.fullName}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(agentActions.handleSubmitAgentAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* updateAgent({ payload: { _id: id, ...rest } }: { payload: agentProps }) {
  try {
    const config: Params = {
    };
    const response = yield SERVICES.agentsService.patch(id, rest, config);

    yield put(agentActions.handleUpdateAgentAsync.success(response));

    yield put(notifActions.addNotification({
      message: `Successfully updated ${id}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(agentActions.handleUpdateAgentAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

function* deleteAgent({ payload }: { payload: string }) {
  try {
    const config: Params = {
    };

    yield SERVICES.agentsService.remove(payload, config);

    yield put(agentActions.handleDeleteAgentAsync.success(payload));

    yield put(notifActions.addNotification({
      message: `Successfully deleted ${payload}`,
      options: { variant: 'success' },
    }));
  } catch (error) {
    yield put(agentActions.handleDeleteAgentAsync.failure(error));
    yield put(notifActions.addNotification({
      message: `${error.name}: ${error.message}`,
      options: { variant: 'error' },
    }));
  }
}

export default function* agentSagas() {
  yield takeLatest(agentActions.handleFetchAgentsAsync.request, fetchAgents);
  yield takeLatest(agentActions.handleSubmitAgentAsync.request, registerAgent);
  yield takeLatest(agentActions.handleUpdateAgentAsync.request, updateAgent);
  yield takeLatest(agentActions.handleDeleteAgentAsync.request, deleteAgent);
}
