import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-final-form';
import { Typography, Paper, Button } from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import { transactionProductProps, transactionFormProps } from 'actions/transaction/actions';
import ActionButton from 'components/shared/extended-icon-button';
import FieldTextInput from 'forms/shared/fields/input';
import useFormStyles from 'forms/shared/styles';
import FieldAgents from 'forms/shared/agents-field';
import FieldClients from 'forms/shared/clients-field';
import ProductsField from './partials/products';
import useStyle from './styles';
import { TransactionFormProps } from './types';

const TransactionForm = ({
  submitHandler, title, initialValues, submitting = false,
}: TransactionFormProps) => {
  const history = useHistory();
  const sharedClasses = useFormStyles();
  const classes = useStyle();

  const [products, setProducts] = useState<transactionProductProps[]>([]);
  const [hasError, setErrorState] = useState(false);

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
        onSubmit={async (values: transactionFormProps) => submitHandler({ ...values, products })}
        render={({ handleSubmit, submitSucceeded, form: { reset } }) => (
          <form className={classes.root} onSubmit={(event) => handleSubmit(event).then(reset)}>
            <Paper className={sharedClasses.fieldsRoot}>
              <FieldAgents />
              <FieldClients />
              <FieldTextInput
                name="terms"
                placeholder="Payment Terms"
                required
              />
              <ProductsField
                hasInvalidItem={(bool) => setErrorState(bool)}
                onChangeValue={(values) => {
                  setProducts(values.map(({
                    id: product, quantity, unit,
                  }) => ({ product, quantity, unit })));
                }}
                submitSucceeded={submitSucceeded}
              />
              <Button
                disabled={submitting || hasError || products.length < 1}
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

export default TransactionForm;
