import React, { useEffect, useState } from 'react';
import replace from 'lodash/replace';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import { OpenInNew, AddCircle } from '@material-ui/icons';
import { RootState } from 'reducers';
import actions from 'actions';
import { transactionDataProps } from 'actions/transaction/actions';
import DataTable, { headerProps } from 'components/shared/table';
import ActionButton from 'components/shared/extended-icon-button';
import * as ROUTES from 'constants/routes';
import { addZeroes, numberWithCommas } from 'utils';

const mapDispatchToProps = ({
  fetchTransactions: actions.transaction.fetchTransactions,
});

const mapStateToProps = (state: RootState) => ({
  ...state.transaction,
});

const headers: headerProps[] = [
  { title: 'Client' },
  { title: 'Date Created', align: 'right' },
  { title: 'Agent', align: 'right' },
  { title: 'Payment', align: 'right' },
  { title: 'Actions', align: 'right' },
];

export type DashboardProps = {
  /** Insert Custom Props here */
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Dashboard = ({
  fetchTransactions, data, total, skip, limit, processing,
}: DashboardProps) => {
  const [pageLimit, setPageLimit] = useState(limit);
  const [pageSkip, setPageSkip] = useState(skip);
  const history = useHistory();

  useEffect(() => { fetchTransactions({ skip, limit }); }, []);

  useEffect(() => {
    fetchTransactions({ skip: pageSkip, limit: pageLimit });
  }, [pageLimit, pageSkip]);

  return (
    <>
      <Typography variant="h4">
        Transactions
        <ActionButton
          tooltipProps={({ title: 'Register an Agent' })}
          buttonProps={({ color: 'primary', onClick: () => history.push(ROUTES.FORM_ADD_TRANSACTION) })}
          icon={<AddCircle fontSize="large" />}
        />
      </Typography>
      <br />
      <DataTable<transactionDataProps>
        data={data}
        meta={({
          total, limit, skip, processing,
        })}
        headers={headers}
        pageLimitHandler={(l) => setPageLimit(l)}
        pageSkipHandler={(s) => setPageSkip(s)}
        render={(values) => (
          values.length > 0 ? values.map(({
            _id: id, agent, totalPrice, client, terms, createdAt,
          }) => (
            <TableRow key={id}>
              <TableCell component="th"><Typography variant="body2">{client ? client.name : 'No client specified'}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{createdAt && createdAt.toDateString()}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{agent ? agent.fullName : 'Unkown agent'}</Typography></TableCell>
              <TableCell align="right">
                <Typography variant="body2">
                  {numberWithCommas(
                    addZeroes(String(
                      Math.round((totalPrice + Number.EPSILON) * 100) / 100,
                    )),
                  )}
                  <Typography component="span" variant="body2" color="secondary">{` - ${terms}`}</Typography>
                </Typography>
              </TableCell>
              <TableCell align="right">
                {/* List of action buttons */}
                <ActionButton
                  tooltipProps={({ title: 'View Details' })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { history.push(replace(ROUTES.PREVIEW_TRANSACTION, ':id', id)); },
                  })}
                  icon={<OpenInNew />}
                />
              </TableCell>
            </TableRow>
          ))
            : (
              <TableRow>
                <TableCell colSpan={headers.length}>
                  <Typography variant="caption">No Contents Found</Typography>
                </TableCell>
              </TableRow>
            )
        )}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
