import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import AuthRoute from 'components/shared/auth-route';
import useStyle from './styles';

const Dashboard = lazy(() => import('components/authenticated/dashboard'));
const ProductsBoard = lazy(() => import('components/authenticated/products'));
const ClientsBoard = lazy(() => import('components/authenticated/clients'));
const UsersBoard = lazy(() => import('components/authenticated/users'));
const AgentsBoard = lazy(() => import('components/authenticated/agents'));
const SalesBoard = lazy(() => import('components/authenticated/sales'));
const NotFound = lazy(() => import('components/shared/not-found'));
const DrawerNav = lazy(() => import('components/shared/drawer'));
const TransactionPreview = lazy(() => import('components/shared/transaction-previewer'));

/** Form Components */
const FormAddProduct = lazy(() => import('components/authenticated/products/add'));
const FormUpdateProduct = lazy(() => import('components/authenticated/products/update'));
const FormAddClient = lazy(() => import('components/authenticated/clients/add'));
const FormUpdateClient = lazy(() => import('components/authenticated/clients/update'));
const FormAddTransaction = lazy(() => import('components/authenticated/dashboard/add'));
const FormUpdateTransaction = lazy(() => import('components/authenticated/dashboard/update'));
const FormUserRegistration = lazy(() => import('components/authenticated/users/add'));
const FormUpdateUser = lazy(() => import('components/authenticated/users/update'));
const FormSubmitAgent = lazy(() => import('components/authenticated/agents/add'));
const FormUpdateAgent = lazy(() => import('components/authenticated/agents/update'));

const AuthRoutes = () => {
  const classes = useStyle();

  return (
    <>
      <DrawerNav />
      <div className={classes.content}>
        <Switch>
          <AuthRoute path={ROUTES.FORM_ADD_USER} exact component={FormUserRegistration} />
          <AuthRoute path={ROUTES.FORM_UPDATE_USER} exact component={FormUpdateUser} />
          <AuthRoute path={ROUTES.FORM_ADD_AGENT} exact component={FormSubmitAgent} />
          <AuthRoute path={ROUTES.FORM_UPDATE_AGENT} exact component={FormUpdateAgent} />
          <AuthRoute path={ROUTES.FORM_ADD_CLIENT} exact component={FormAddClient} />
          <AuthRoute path={ROUTES.FORM_UPDATE_CLIENT} exact component={FormUpdateClient} />
          <AuthRoute path={ROUTES.FORM_ADD_PRODUCT} exact component={FormAddProduct} />
          <AuthRoute path={ROUTES.FORM_UPDATE_PRODUCT} exact component={FormUpdateProduct} />
          <AuthRoute path={ROUTES.FORM_ADD_TRANSACTION} exact component={FormAddTransaction} />
          <AuthRoute
            path={ROUTES.FORM_UPDATE_TRANSACTION}
            exact
            component={FormUpdateTransaction}
          />
          <AuthRoute path={ROUTES.PREVIEW_TRANSACTION} component={TransactionPreview} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD_SALES} exact component={SalesBoard} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD_PRODUCTS} exact component={ProductsBoard} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD_CLIENTS} exact component={ClientsBoard} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD_USERS} exact component={UsersBoard} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD_AGENTS} exact component={AgentsBoard} />
          <AuthRoute path={ROUTES.AUTH_DASHBOARD} exact component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
};

export default AuthRoutes;
