// Initializes the `transactions` service on path `/transactions`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Transactions } from './transactions.class';
import createModel from '../../models/transactions.model';
import hooks from './transactions.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_TRANSACTIONS]: Transactions & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: [ '$populate' ]
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_TRANSACTIONS, new Transactions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_TRANSACTIONS);

  service.hooks(hooks);
}
