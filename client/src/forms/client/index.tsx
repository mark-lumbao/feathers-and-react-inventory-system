import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-final-form';
import { Typography, Paper, Button } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import { clientProps } from 'actions/client/actions';
import ActionButton from 'components/shared/extended-icon-button';
import FieldTextInput from 'forms/shared/fields/input';
import useFormStyles from 'forms/shared/styles';
import useStyle from './styles';

export interface ClientFormProps {
  title: string;
  submitHandler: <T extends clientProps>(values: T) => void;
  submitting?: boolean;
  initialValues?: clientProps;
}

const ClientForm = ({
  submitHandler, title, initialValues, submitting = false,
}: ClientFormProps) => {
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
        onSubmit={async (values: clientProps) => submitHandler(values)}
        render={({ handleSubmit, form: { reset } }) => (
          <form className={classes.root} onSubmit={(event) => handleSubmit(event).then(reset)}>
            <Paper className={sharedClasses.fieldsRoot}>
              <FieldTextInput label="Name" disabled={submitting} required name="name" placeholder="Client Name" />
              <FieldTextInput label="Address" disabled={submitting} required name="address" placeholder="Address" />
              <FieldTextInput label="Salesman" disabled={submitting} required name="salesman" placeholder="Salesman" />
              <FieldTextInput label="Contact Person" disabled={submitting} required name="contactPerson" placeholder="Contact Person" />
              <FieldTextInput label="Contact" disabled={submitting} required name="contactNumber" placeholder="Contact" />
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

export default ClientForm;
