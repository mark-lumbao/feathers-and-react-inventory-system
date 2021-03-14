import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Form } from 'react-final-form';
import FieldInput from 'forms/shared/fields/input';
import actions from 'actions';
import { RootState } from 'reducers';
import * as ROUTES from 'constants/routes';
import useStyle from './styles';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login: actions.auth.login,
};

export type LoginFormProps = ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const LoginForm = ({ login, auth: { processing, accessToken } }: LoginFormProps) => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <Form
      onSubmit={async ({ username: email, password }) => {
        login({
          strategy: 'local',
          email,
          password,
        });
      }}
      render={({ handleSubmit, form: { reset } }) => (
        <form
          className={classes.root}
          onSubmit={(e) => handleSubmit(e).then(reset)}
        >
          <FieldInput
            disabled={processing || Boolean(accessToken)}
            required
            type="text"
            placeholder="Username"
            name="username"
          />
          <FieldInput
            disabled={processing || Boolean(accessToken)}
            required
            type="password"
            placeholder="Password"
            name="password"
          />
          <Button
            disabled={processing || Boolean(accessToken)}
            color="secondary"
            variant="contained"
            type="submit"
          >
            {processing ? 'Logging in ...' : 'Login'}
          </Button>
          {Boolean(accessToken) && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push(ROUTES.AUTH_DASHBOARD)}
            >
              Go to Dashboard
            </Button>
          )}
          <Link
            style={{ textAlign: 'center' }}
            to={ROUTES.REQUEST_RESET_PASSWORD}
          >
            Forgot Password
          </Link>
        </form>
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
