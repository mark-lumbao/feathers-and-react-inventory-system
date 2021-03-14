import { Application } from '../declarations';
import users from './users/users.service';
import products from './products/products.service';
import transactions from './transactions/transactions.service';
import clients from './clients/clients.service';
import requestPasswordReset from './request-password-reset/request-password-reset.service';
import resetPassword from './reset-password/reset-password.service';
import agents from './agents/agents.service';
import monthlySales from './monthly-sales/monthly-sales.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(products);
  app.configure(transactions);
  app.configure(clients);
  app.configure(requestPasswordReset);
  app.configure(resetPassword);
  app.configure(agents);
  app.configure(monthlySales);
}
