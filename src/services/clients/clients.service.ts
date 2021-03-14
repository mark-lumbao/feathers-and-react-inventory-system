// Initializes the `clients` service on path `/clients`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Clients } from './clients.class';
import createModel from '../../models/clients.model';
import hooks from './clients.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_CLIENTS]: Clients & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_CLIENTS, new Clients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_CLIENTS);

  service.hooks(hooks);
}
