import React from 'react';
import { useHistory } from 'react-router-dom';
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
  buttonGroup: {
    display: 'flex',
    '& > button': {
      flex: 1,
    },
  },
}));

const mapStateToProps = (state: RootState) => ({
  submitting: state.auth.processing,
});

const mapDispatchToProps = ({
  submit: actions.auth.requestResetPassword,
});

export type RequestResetPasswordProps = {

} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const RequestResetPassword = ({
  submit, submitting,
}: RequestResetPasswordProps) => {
  const sharedClasses = useSharedStyles();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Form
      onSubmit={async ({ email }) => {
        submit(email);
      }}
      render={({ handleSubmit, form: { reset } }) => (
        <form className={classes.form} onSubmit={(e) => handleSubmit(e).then(reset)}>
          <Paper className={sharedClasses.fieldsRoot}>
            <Typography variant="h5">Email Reset Link</Typography>
            <FieldInputText disabled={submitting} required name="email" type="email" placeholder="Email Address" />
            <div className={classes.buttonGroup}>
              <Button disabled={submitting} color="secondary" variant="contained" className={sharedClasses.submit} type="submit">Send</Button>
              <Button onClick={() => history.goBack()} variant="contained" className={sharedClasses.submit}>Cancel</Button>
            </div>
          </Paper>
        </form>
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);
