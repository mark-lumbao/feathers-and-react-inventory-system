// Initializes the `request-password-reset` service on path `/request-password-reset`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RequestPasswordReset } from './request-password-reset.class';
import hooks from './request-password-reset.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_REQUEST_PASSWORD_RESET]: RequestPasswordReset & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_REQUEST_PASSWORD_RESET, new RequestPasswordReset(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_REQUEST_PASSWORD_RESET);

  service.hooks(hooks);
}
