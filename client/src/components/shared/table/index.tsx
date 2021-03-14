import React, { ReactNode, useState } from 'react';
import {
  Table, TableProps, TableHead, TableCell,
  TablePagination, LinearProgress, Paper,
  Typography, TableBody, TableRow,
} from '@material-ui/core';
import useStyle from './styles';

export type headerProps = {
  title: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
};

export interface DataTableProps <T extends {}> extends TableProps{
  data: T[];
  headers?: headerProps[];
  meta?: {
    total: number,
    limit: number,
    skip: number,
    processing?: boolean,
  };
  tableRootClassName?: string;
  hasPagination?: boolean;
  pageLimitHandler?: (limit: number) => void;
  pageSkipHandler?: (skip: number) => void;
  render: (values: T[]) => ReactNode;
}

const DataTable = <T extends {}>({
  data, headers, render, meta, pageLimitHandler,
  hasPagination = true, pageSkipHandler, tableRootClassName,
  ...tableProps
}: DataTableProps<T>) => {
  const [page, setPage] = useState(0);
  const classes = useStyle();

  return (
    <Paper className={`${classes.tableRoot} ${tableRootClassName}`}>
      <Table {...tableProps}>
        {headers && (
          <TableHead>
            <TableRow>
              {headers.map(({ title, align }, key) => (
                <TableCell align={align} variant="head" component="th" key={key}>
                  <Typography variant="h6">{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {render(data)}
        </TableBody>
      </Table>
      {meta && meta.processing && <LinearProgress color="secondary" />}
      {hasPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 15, 30, 40]}
          component="div"
          count={meta.total}
          rowsPerPage={meta.limit}
          page={page}
          onChangePage={(event: unknown, newPage: number) => {
            setPage(newPage);
            pageSkipHandler(newPage * meta.limit);
          }}
          onChangeRowsPerPage={(event) => {
            pageLimitHandler(Number(event.target.value));
            pageSkipHandler(0);
            setPage(0);
          }}
        />
      )}
    </Paper>
  );
};

export default DataTable;
