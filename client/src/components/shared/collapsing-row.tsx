import React, { ReactNode, useState } from 'react';
import {
  TableRow, Collapse, TableCell, IconButton,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  openIcon: {
    background: theme.palette.primary.main,
    color: '#fff',
  },
  closeIcon: {
    background: theme.palette.background.default,
  },
}));

export type CollapsingRowProps = {
  children: ReactNode,
  collapseContent: {
    /** content of the collapsing section */
    children: ReactNode,
    /** column span for the collapse content row */
    span: number,
  },
};

/**
 * @param children - actual cell content
 * @param collapseContent
 * @collapseContent children - content of the collapsing section
 * @collapseContent span - column span for the collapse content row
 */
const CollapsingRow = ({
  children, collapseContent: { children: colChildren, span },
}: CollapsingRowProps) => {
  const [open, setCollapseState] = useState(false);
  const classes = useStyles();
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setCollapseState(!open)}>
            {
              open ? <KeyboardArrowUpIcon className={classes.openIcon} />
                : <KeyboardArrowDownIcon className={classes.closeIcon} />
            }
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      <TableRow style={{ display: open ? 'table-row' : 'none' }}>
        <TableCell colSpan={span}>
          <Collapse in={open}>
            {colChildren}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsingRow;
