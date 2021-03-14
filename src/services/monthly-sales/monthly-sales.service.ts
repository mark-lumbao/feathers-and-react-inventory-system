// Initializes the `monthly-sales` service on path `/monthly-sales`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { MonthlySales } from './monthly-sales.class';
import hooks from './monthly-sales.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_MONTHLY_SALES]: MonthlySales & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_MONTHLY_SALES, new MonthlySales(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_MONTHLY_SALES);

  service.hooks(hooks);
}
