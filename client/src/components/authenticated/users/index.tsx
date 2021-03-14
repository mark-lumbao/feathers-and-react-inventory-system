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
  fetchUsers: actions.user.fetchUsers,
  deleteUser: actions.user.deleteUser,
});

const mapStateToProps = (state: RootState) => ({
  ...state.user,
});

const headers: headerProps[] = [
  { title: 'Name' },
  { title: 'Email', align: 'right' },
  { title: 'Username', align: 'right' },
  { title: 'Actions', align: 'right' },
];

export type UsersBoardProps = {
  /** Insert Custom Props here */
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UsersBoard = ({
  fetchUsers, data, total, skip, limit, processing, deleteUser,
}: UsersBoardProps) => {
  const history = useHistory();
  const [pageLimit, setPageLimit] = useState(limit);
  const [pageSkip, setPageSkip] = useState(skip);

  useEffect(() => { fetchUsers({ skip, limit }); }, []);
  useEffect(() => {
    fetchUsers({ skip: pageSkip, limit: pageLimit });
  }, [pageLimit, pageSkip]);
  return (
    <>
      <Typography variant="h4">
        Users
        <ActionButton
          tooltipProps={({ title: 'Register a User' })}
          buttonProps={({ color: 'primary', onClick: () => history.push(ROUTES.FORM_ADD_USER) })}
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
            _id: id, email, fullName, userName, firstName,
          }) => (
            <TableRow key={id}>
              <TableCell component="th"><Typography variant="body2">{fullName}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{email}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{userName}</Typography></TableCell>
              <TableCell align="right">
                {/* List of action buttons */}
                <ActionButton
                  tooltipProps={({ title: `Update ${firstName}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { history.push(replace(ROUTES.FORM_UPDATE_USER, ':id', id)); },
                  })}
                  icon={<Edit />}
                />
                <ActionButton
                  tooltipProps={({ title: `Remove ${fullName}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { deleteUser(id); },
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersBoard);
