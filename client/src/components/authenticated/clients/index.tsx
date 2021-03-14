import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import replace from 'lodash/replace';
import {
  Typography, TableRow, TableCell,
} from '@material-ui/core';
import { Delete, AddCircle, Edit } from '@material-ui/icons';
import actions from 'actions';
import { RootState } from 'reducers';
import DataTable, { headerProps } from 'components/shared/table';
import ActionButton from 'components/shared/extended-icon-button';
import * as ROUTES from 'constants/routes';

const mapDispatchToProps = ({
  fetchClients: actions.client.fetchClients,
  deleteClient: actions.client.deleteClient,
});

const mapStateToProps = (state: RootState) => ({
  ...state.client,
});

const headers: headerProps[] = [
  { title: 'Client Name' },
  { title: 'Address', align: 'right' },
  { title: 'Contact Number', align: 'right' },
  { title: 'Contact Person', align: 'right' },
  { title: 'Salesman', align: 'right' },
  { title: 'Actions', align: 'right' },
];

export type ClientsBoardProps = {
  /** Insert Custom Props here */
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ClientsBoard = ({
  fetchClients, deleteClient, data, total, skip, limit, processing,
}: ClientsBoardProps) => {
  const history = useHistory();
  const [pageLimit, setPageLimit] = useState(limit);
  const [pageSkip, setPageSkip] = useState(skip);

  useEffect(() => { fetchClients({ skip, limit }); }, []);
  useEffect(() => {
    fetchClients({ skip: pageSkip, limit: pageLimit });
  }, [pageLimit, pageSkip]);
  return (
    <>
      <Typography variant="h4">
        Clients
        <ActionButton
          tooltipProps={({ title: 'Add New Client' })}
          buttonProps={({ color: 'primary', onClick: () => history.push(ROUTES.FORM_ADD_CLIENT) })}
          icon={<AddCircle fontSize="large" />}
        />
      </Typography>
      <br />
      <DataTable
        data={data}
        meta={({
          total, limit, skip, processing,
        })}
        headers={headers}
        pageLimitHandler={(l) => setPageLimit(l)}
        pageSkipHandler={(s) => setPageSkip(s)}
        render={(values) => (
          values.length > 0 ? values.map(({
            _id: id, name, address, contactNumber, contactPerson, salesman,
          }) => (
            <TableRow key={id}>
              <TableCell component="th"><Typography variant="body2">{name}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{address}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{contactNumber}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{contactPerson}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{salesman}</Typography></TableCell>
              <TableCell align="right">
                {/* List of action buttons */}
                <ActionButton
                  tooltipProps={({ title: `Update ${name}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { history.push(replace(ROUTES.FORM_UPDATE_CLIENT, ':id', id)); },
                  })}
                  icon={<Edit />}
                />
                <ActionButton
                  tooltipProps={({ title: `Remove ${name}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { deleteClient(id); },
                  })}
                  icon={<Delete />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientsBoard);
