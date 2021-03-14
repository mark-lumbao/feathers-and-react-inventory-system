// Initializes the `products` service on path `/products`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Products } from './products.class';
import createModel from '../../models/products.model';
import hooks from './products.hooks';
import * as ROUTES from '../../constants/routes';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [ROUTES.API_PRODUCTS]: Products & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(ROUTES.API_PRODUCTS, new Products(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ROUTES.API_PRODUCTS);

  service.hooks(hooks);
}
