import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-final-form';
import { Typography, Paper, Button } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import { agentProps } from 'actions/agent/actions';
import ActionButton from 'components/shared/extended-icon-button';
import FieldTextInput from 'forms/shared/fields/input';
import useFormStyles from 'forms/shared/styles';
import useStyle from './styles';

export interface AgentFormProps {
  title: string;
  submitHandler: <T extends agentProps>(values: T) => void;
  submitting?: boolean;
  initialValues?: agentProps;
}

const AgentForm = ({
  submitHandler, title, initialValues, submitting = false,
}: AgentFormProps) => {
  const history = useHistory();
  const sharedClasses = useFormStyles();
  const classes = useStyle();
  return (
    <>
      <Typography variant="h4">
        <ActionButton
          tooltipProps={({ title: 'Go Back', placement: 'left' })}
          buttonProps={({ color: 'primary', onClick: () => history.goBack() })}
          icon={<ArrowLeft fontSize="default" />}
        />
        {title}
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={async (values: agentProps) => submitHandler(values)}
        render={({ handleSubmit, form: { reset } }) => (
          <form className={classes.root} onSubmit={(event) => handleSubmit(event).then(reset)}>
            <Paper className={sharedClasses.fieldsRoot}>
              <FieldTextInput label="First Name" disabled={submitting} required name="firstName" placeholder="First Name" />
              <FieldTextInput label="Middle Name" disabled={submitting} required name="middleName" placeholder="Middle Name" />
              <FieldTextInput label="Last Name" disabled={submitting} required name="lastName" placeholder="Last Name" />
              <Button
                disabled={submitting}
                className={sharedClasses.submit}
                type="submit"
                color="secondary"
                variant="contained"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Paper>
          </form>
        )}
      />
    </>
  );
};

export default AgentForm;
