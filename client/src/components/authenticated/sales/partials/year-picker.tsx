import React, { useState, useEffect } from 'react';
import {
  Select, MenuItem, FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select: {
    width: 300,
    minWidth: 'max-content',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const YearPicker = ({
  onChange, defaultValue,
}: { onChange: (value: string) => void, defaultValue: string }) => {
  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState(defaultValue);

  const renderDropList = () => {
    /**
     * 10 years before today,
     * up to 30 years from now.
     */
    const year = new Date().getFullYear() - 20;
    return (
      Array.from(new Array(30), (v, i) => <MenuItem key={i} value={year + i}>{year + i}</MenuItem>)
    );
  };

  useEffect(() => { onChange(selectedYear); }, [selectedYear]);

  return (
    <FormControl>
      <Select
        className={classes.select}
        variant="outlined"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value as string)}
      >
        {renderDropList()}
      </Select>
    </FormControl>
  );
};

export default YearPicker;
