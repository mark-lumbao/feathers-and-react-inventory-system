import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { PDFViewer } from '@react-pdf/renderer';
import { LinearProgress } from '@material-ui/core';
import { RootState } from 'reducers';
import { fetchTransaction, transactionDataProps } from 'actions/transaction/actions';
import TransactionDocument from './partials/document';

const mapStateToProps = (state: RootState) => ({
  transactions: state.transaction.data,
});

const mapDispathToProps = ({
  fetch: fetchTransaction,
});

export type TransactionPreviewerProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispathToProps;

const TransactionPreviewer = ({
  transactions, fetch,
}: TransactionPreviewerProps) => {
  const { id } = useParams<{ id: string }>();

  const [transaction, setTransaction] = useState<transactionDataProps>(
    find(transactions, ({ _id: tId }) => tId === id),
  );

  useEffect(() => { fetch(id); }, []);

  useEffect(() => {
    setTransaction(find(transactions, ({ _id: tId }) => tId === id));
  }, [transactions]);

  return (
    transaction && typeof transaction.products[0].product !== 'string' ? (
      <PDFViewer style={{ width: '100%', minHeight: 800 }}>
        <TransactionDocument transaction={transaction} />
      </PDFViewer>
    ) : (
      <LinearProgress color="secondary" />
    )
  );
};

export default connect(mapStateToProps, mapDispathToProps)(TransactionPreviewer);
