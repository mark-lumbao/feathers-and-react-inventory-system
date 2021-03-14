// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_USERS]: Users & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_USERS, new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_USERS);

  service.hooks(hooks);
}
