import React from 'react';
import { connect } from 'react-redux';
import RegistrationForm from 'forms/registration';
import { RootState } from 'reducers';
import actions from 'actions';
import { uuid } from 'utils';

const mapStateToProps = (state: RootState) => ({
  submitting: state.user.processing,
});

const mapDispatchToProps = ({
  submit: actions.user.registerUser,
});

export type RegisterUserProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const RegisterUser = ({
  submitting, submit,
}: RegisterUserProps) => (
  <RegistrationForm
    title="Register User"
    submitHandler={(values) => {
      const password = uuid();
      submit({
        ...values, password, placeholderPassword: password, role: 'admin',
      });
    }}
    submitting={submitting}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
