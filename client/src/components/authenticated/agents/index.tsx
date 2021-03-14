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
  fetchAgents: actions.agent.fetchAgents,
  deleteAgent: actions.agent.deleteAgent,
});

const mapStateToProps = (state: RootState) => ({
  ...state.agent,
});

const headers: headerProps[] = [
  { title: 'Name' },
  { title: 'Actions', align: 'right' },
];

export type AgentsBoardProps = {
  /** Insert Custom Props here */
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AgentsBoard = ({
  fetchAgents, data, total, skip, limit, processing, deleteAgent,
}: AgentsBoardProps) => {
  const history = useHistory();
  const [pageLimit, setPageLimit] = useState(limit);
  const [pageSkip, setPageSkip] = useState(skip);

  useEffect(() => { fetchAgents({ skip, limit }); }, []);
  useEffect(() => {
    fetchAgents({ skip: pageSkip, limit: pageLimit });
  }, [pageLimit, pageSkip]);
  return (
    <>
      <Typography variant="h4">
        Agents
        <ActionButton
          tooltipProps={({ title: 'Register an Agent' })}
          buttonProps={({ color: 'primary', onClick: () => history.push(ROUTES.FORM_ADD_AGENT) })}
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
            _id: id, fullName, firstName,
          }) => (
            <TableRow key={id}>
              <TableCell component="th"><Typography variant="body2">{fullName}</Typography></TableCell>
              <TableCell align="right">
                {/* List of action buttons */}
                <ActionButton
                  tooltipProps={({ title: `Update ${firstName}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { history.push(replace(ROUTES.FORM_UPDATE_AGENT, ':id', id)); },
                  })}
                  icon={<Edit />}
                />
                <ActionButton
                  tooltipProps={({ title: `Remove ${firstName}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { deleteAgent(id); },
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentsBoard);
