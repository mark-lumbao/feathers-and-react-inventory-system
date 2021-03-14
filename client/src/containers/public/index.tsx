import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import useStyle from './styles';

const LoginForm = lazy(() => import('forms/login'));
const Home = lazy(() => import('components/public/home'));
const RequestResetPasswordForm = lazy(() => import('forms/request-reset-password'));
const ResetPasswordForm = lazy(() => import('forms/reset-password'));
const NotFound = lazy(() => import('components/shared/not-found'));

const PublicRoutes = () => {
  const classes = useStyle();
  return (
    <div className={classes.content}>
      <Switch>
        <Route path={ROUTES.LOGIN} exact component={LoginForm} />
        <Route path={ROUTES.REQUEST_RESET_PASSWORD} exact component={RequestResetPasswordForm} />
        <Route path={ROUTES.RESET} exact component={ResetPasswordForm} />
        <Route path={ROUTES.HOME} exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default PublicRoutes;
