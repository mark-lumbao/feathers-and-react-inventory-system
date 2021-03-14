import React from 'react';
import { connect } from 'react-redux';
import TransactionForm from 'forms/transaction';
import { RootState } from 'reducers';
import actions from 'actions';
import * as SERVICES from 'utils/services';
import { optionProps as autoCompleteOption } from 'forms/shared/types';
import { transactionDataProps, transactionFormProps } from 'actions/transaction/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.transaction.processing,
});

const mapDispatchToProps = ({
  onSubmitError: actions.transaction.handleSubmitTransactionAsync.failure,
  onSubmitSucces: actions.transaction.handleSubmitTransactionAsync.success,
  notify: actions.notification.addNotification,
});

export type AddTransactionProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const AddTransaction = ({
  submitting, onSubmitError, onSubmitSucces, notify,
}: AddTransactionProps) => {
  const submit = async (payload: transactionFormProps) => {
    try {
      const { _id: id }: transactionDataProps = await SERVICES
        .transactionsService.create(payload);
      onSubmitSucces();
      notify({
        message: `Successful submitted transaction - ${id}`,
        options: { variant: 'success' },
      });
    } catch (error) {
      onSubmitError(error);
      notify({
        message: `${error.name}: ${error.message}`,
        options: { variant: 'error' },
      });
    }
  };

  return (
    <TransactionForm
      title="Add Transaction"
      submitHandler={(values) => {
        submit({
          ...values,
          agent: (values.agent as unknown as autoCompleteOption).value,
          client: values.client ? (values.client as unknown as autoCompleteOption).value : null,
        });
      }}
      submitting={submitting}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
