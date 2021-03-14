import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RootState } from 'reducers';
import actions from 'actions';
import * as ROUTES from 'constants/routes';

const { notification } = actions;

const mapStateToProps = (state: RootState) => ({
  token: state.auth.accessToken,
});

const mapDispatchToProps = ({
  notify: notification.addNotification,
});

export type AuthRouteProps = RouteProps
  & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps
  & {
  /**
   * Add in your custom props here
   */
}

const AuthRoute = ({
  component: Component, token, notify, ...rest
}: AuthRouteProps) => {
  useEffect(() => {
    if (!token) {
      notify({
        message: 'Invalid Access: No authentication token found',
        options: { variant: 'error' },
      });
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => (
        token
          ? <Component {...props} />
          : <Redirect to={ROUTES.HOME} />
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
