import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import find from 'lodash/find';
import TransactionForm from 'forms/transaction';
import { RootState } from 'reducers';
import actions from 'actions';
import { transactionDataProps } from 'actions/transaction/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.transaction.processing,
  data: state.transaction.data,
});

const mapDispatchToProps = ({
  submit: actions.transaction.updateTransaction,
});

export type UpdateTransactionProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const UpdateTransaction = ({
  submitting, submit, data,
}: UpdateTransactionProps) => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<transactionDataProps>();
  useEffect(() => {
    setTransaction(find(data, ({ _id: pId }) => pId === id));
  }, [id]);
  return (
    <TransactionForm
      title="Update Transaction"
      submitHandler={(values) => {
        submit(values);
        setTransaction({ ...transaction, ...values });
      }}
      submitting={submitting}
      // initialValues={transaction} @TODO refactor transactionDataProps to transactionFormProps
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTransaction);
