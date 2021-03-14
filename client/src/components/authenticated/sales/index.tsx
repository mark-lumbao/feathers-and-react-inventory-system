import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box, Typography,
} from '@material-ui/core';
import actions from 'actions';
import { MONTHS } from 'constants/common';
import SalesCard from './partials/sales-card';
import AgentPicker from './partials/agent-picker';
import YearPicker from './partials/year-picker';
import useStyles from './styles';

const mapDispatchToProps = ({
  fetchSales: actions.sales.fetchMonthlySales,
});

export type SalesBoardProps = & typeof mapDispatchToProps;

/**
 * @todo
 * - Implement year picker
 * - Implement fetching state indication
 */
const SalesBoard = ({
  fetchSales,
}: SalesBoardProps) => {
  const classes = useStyles();
  const defaultYear = String(new Date().getFullYear());
  const [year, setYear] = useState(defaultYear);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    /**
     * @note if there is no selected agent,
     * just fetch all monthly transactions
     * without agent filter.
     */
    try {
      const { _id: agent } = selectedAgent;
      fetchSales({ year, agent });
    } catch (_e) {
      fetchSales({ year });
    }
  }, [year, selectedAgent]);

  return (
    <Box component="div" className={classes.root}>
      <Typography variant="h4">Monthly Sales</Typography>
      <Box component="div" className={classes.salesBox}>
        <AgentPicker
          onChange={(a) => {
            setSelectedAgent(a);
          }}
        />
        <Box component="div">
          <YearPicker onChange={(y) => setYear(y)} defaultValue={defaultYear} />
          <Box component="div" className={classes.salesGrid}>
            {MONTHS.map(
              (_v, i) => (
                <SalesCard key={i} className={classes.salesCard} monthIndex={i} year={year} />
              ),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(SalesBoard);
