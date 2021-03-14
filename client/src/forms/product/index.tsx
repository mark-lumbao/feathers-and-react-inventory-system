import React from 'react';
import { Form } from 'react-final-form';
import { Typography, Paper, Button } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ActionButton from 'components/shared/extended-icon-button';
import FieldTextInput from 'forms/shared/fields/input';
import { productProps } from 'actions/product/actions';
import useFormStyle from 'forms/shared/styles';
import useStyle from './styles';

export interface ProductFormProps {
  title: string;
  submitHandler: <T extends productProps>(values: T) => void;
  submitting?: boolean;
  initialValues?: productProps;
}

const ProductForm = ({
  title, submitHandler, submitting = false, initialValues,
}: ProductFormProps) => {
  const history = useHistory();
  const sharedClasses = useFormStyle();
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
        onSubmit={async (values: productProps) => submitHandler(values)}
        render={({ handleSubmit, form: { reset } }) => (
          <form className={classes.root} onSubmit={(event) => handleSubmit(event).then(reset)}>
            <Paper className={sharedClasses.fieldsRoot}>
              <FieldTextInput autoComplete="off" label="Name" disabled={submitting} required name="name" placeholder="Product Name" />
              <FieldTextInput label="Price" type="number" disabled={submitting} required name="price" placeholder="Product Price" />
              <FieldTextInput label="Details" multiline disabled={submitting} name="details" placeholder="Details" />
              <FieldTextInput label="Stocks" type="number" disabled={submitting} required name="stocks" placeholder="Stocks" />
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

export default ProductForm;
