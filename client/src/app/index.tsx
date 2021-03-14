import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import AuthRoute from 'components/shared/auth-route';

const PublicRoutes = lazy(() => import('containers/public'));
const AuthRoutes = lazy(() => import('containers/authenticated'));
const NotFound = lazy(() => import('components/shared/not-found'));
const NavBar = lazy(() => import('components/shared/navbar'));

const App = () => (
  <Suspense fallback={(
    <div
      style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      Loading components
    </div>
  )}
  >
    <Router>
      <NavBar />
      <Switch>
        <AuthRoute path={ROUTES.AUTH_DASHBOARD} component={AuthRoutes} />
        <Route path={ROUTES.HOME} component={PublicRoutes} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Suspense>
);

export default App;
