import { action, createAsyncAction } from 'typesafe-actions';
import { paginationProps } from 'constants/common';
import * as TYPES from './types';

export type agentProps = {
  _id?: string,
  firstName: string,
  middleName: string,
  lastName: string,
  fullName: string,
}

export type AgentStateProps = {
  data: agentProps[],
  limit: number,
  skip: number,
  total: number,
  processing: boolean,
}

export const fetchAgents = (payload?: Partial<paginationProps>) => action(
  TYPES.FETCH_AGENTS_REQUEST,
  payload,
);

export const handleFetchAgentsAsync = createAsyncAction(
  TYPES.FETCH_AGENTS_REQUEST,
  TYPES.FETCH_AGENTS_SUCCESS,
  TYPES.FETCH_AGENTS_FAILURE,
)<Partial<paginationProps>, AgentStateProps, Error>();

export const submitAgent = (payload: agentProps) => action(
  TYPES.SUBMIT_AGENT_REQUEST,
  payload,
);

export const handleSubmitAgentAsync = createAsyncAction(
  TYPES.SUBMIT_AGENT_REQUEST,
  TYPES.SUBMIT_AGENT_SUCCESS,
  TYPES.SUBMIT_AGENT_FAILURE,
)<agentProps, agentProps, Error>();

export const updateAgent = (payload: agentProps) => action(
  TYPES.UPDATE_AGENT_REQUEST,
  payload,
);

export const handleUpdateAgentAsync = createAsyncAction(
  TYPES.UPDATE_AGENT_REQUEST,
  TYPES.UPDATE_AGENT_SUCCESS,
  TYPES.UPDATE_AGENT_FAILURE,
)<agentProps, agentProps, Error>();

export const deleteAgent = (payload: string) => action(
  TYPES.DELETE_AGENT_REQUEST,
  payload,
);

export const handleDeleteAgentAsync = createAsyncAction(
  TYPES.DELETE_AGENT_REQUEST,
  TYPES.DELETE_AGENT_SUCCESS,
  TYPES.DELETE_AGENT_FAILURE,
)<string, string, Error>();
