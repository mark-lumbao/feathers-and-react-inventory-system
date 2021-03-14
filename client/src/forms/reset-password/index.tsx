import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FieldInputText from 'forms/shared/fields/input';
import useSharedStyles from 'forms/shared/styles';
import { RootState } from 'reducers';
import actions from 'actions';

const useStyles = makeStyles(() => createStyles({
  form: {
    maxWidth: 400,
    padding: 20,
  },
}));

const mapStateToProps = (state: RootState) => ({
  submitting: state.auth.processing,
});

const mapDispatchToProps = ({
  submit: actions.auth.resetPassword,
});

export type ResetPasswordProps = {
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export type resetFormProps = { password: string, confirm: string };

const ResetPassword = ({
  submit, submitting,
}: ResetPasswordProps) => {
  const sharedClasses = useSharedStyles();
  const classes = useStyles();
  const { token } = useParams<{ token: string }>();

  const isEqual = (values: resetFormProps) => values.confirm === values.password;

  return (
    <Form
      onSubmit={async ({ password, confirm }) => {
        if (confirm === password) submit({ token, password });
      }}
      render={({ handleSubmit, form: { reset }, values }) => (
        <form className={classes.form} onSubmit={(e) => handleSubmit(e).then(reset)}>
          <Paper className={sharedClasses.fieldsRoot}>
            <Typography variant="h5">Submit New Password</Typography>
            <FieldInputText disabled={submitting} required name="password" type="password" placeholder="New Password" />
            <FieldInputText disabled={submitting} required name="confirm" type="password" placeholder="Confirm Password" />
            <Button disabled={submitting || !isEqual(values as resetFormProps)} color="secondary" variant="contained" className={sharedClasses.submit} type="submit">Submit</Button>
          </Paper>
        </form>
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
