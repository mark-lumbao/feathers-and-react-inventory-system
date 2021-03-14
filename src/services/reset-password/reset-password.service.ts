// Initializes the `reset-password` service on path `/reset-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ResetPassword } from './reset-password.class';
import hooks from './reset-password.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_RESET_PASSWORD]: ResetPassword & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_RESET_PASSWORD, new ResetPassword(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_RESET_PASSWORD);

  service.hooks(hooks);
}
