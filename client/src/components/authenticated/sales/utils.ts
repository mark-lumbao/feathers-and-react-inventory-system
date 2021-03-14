import { Params } from '@feathersjs/feathers';
import { AgentStateProps } from 'actions/agent/actions';
import * as SERVICES from 'utils/services';

// eslint-disable-next-line import/prefer-default-export
export const getAgents = async (
  { page, limit, fullName: name }: { page: number, limit: number, fullName?: string },
): Promise<Partial<AgentStateProps>> => {
  const config: Params = {
    /** @note skip is page value times the number of agents per page */
    query: {
      $limit: limit,
      $skip: (page - 1) * limit || 0,
    },
  };
  if (name) config.query.fullName = { $regex: name };
  const { data, total } = await SERVICES.agentsService.find(config);
  return ({
    data,
    total,
  });
};
