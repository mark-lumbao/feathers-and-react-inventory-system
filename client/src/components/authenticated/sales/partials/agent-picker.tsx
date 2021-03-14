import React, { useEffect, useState } from 'react';
import floor from 'lodash/floor';
import {
  List, ListItem, Paper, ListItemText,
  ListSubheader, Avatar, ListItemIcon,
  TextField, InputAdornment, Box,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Search } from '@material-ui/icons';
import useStyles from 'components/authenticated/sales/styles';
import { getAgents } from 'components/authenticated/sales/utils';
import { agentProps } from 'actions/agent/actions';

export type AgentPickerProps = {
  onChange: (agent: agentProps) => void,
};

const AgentPicker = ({
  onChange,
}: AgentPickerProps) => {
  const classes = useStyles();
  const limit = 15;

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [fullName, setFullName] = useState('');
  const [agents, setAgents] = useState<agentProps[]>([]);
  const [selected, setSelected] = useState<agentProps>(null);

  useEffect(() => {
    getAgents({ page, limit, fullName }).then(({ data, total: totalAgents }) => {
      setAgents(data);
      setTotal(totalAgents);
    });
  }, [page, fullName]);

  return (
    <Box component={Paper} className={classes.agentPicker}>
      <List
        subheader={(
          <ListSubheader className={classes.agentListSubheader}>
            Agents
            <TextField
              onChange={(e) => setFullName(e.target.value)}
              variant="outlined"
              placeholder="Search Agent"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </ListSubheader>
        )}
        className={classes.agentListBox}
      >
        {agents.map((agent, key) => (
          <ListItem
            button
            selected={agent === selected}
            key={key}
            onClick={() => {
              /**
               * @note perform deselection when selected agent is already selected.
               * This will set the selected agent to null.
               */
              if (agent === selected) {
                setSelected(null);
                onChange(null);
              } else {
                setSelected(agent);
                onChange(agent);
              }
            }}
          >
            <ListItemIcon><Avatar /></ListItemIcon>
            <ListItemText primary={agent.fullName} />
          </ListItem>
        ))}
      </List>
      <Pagination
        /** @note add one to count if total has a remainder when divided by the value of limit */
        count={(
          total % limit)
          ? floor(total / limit) + 1
          : floor(total / limit)}
        onChange={(_event, newPage) => setPage(newPage)}
      />
    </Box>
  );
};

export default AgentPicker;
