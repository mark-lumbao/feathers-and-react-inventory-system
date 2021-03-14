// Initializes the `agents` service on path `/agents`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Agents } from './agents.class';
import createModel from '../../models/agents.model';
import hooks from './agents.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_AGENTS]: Agents & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_AGENTS, new Agents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_AGENTS);

  service.hooks(hooks);
}
