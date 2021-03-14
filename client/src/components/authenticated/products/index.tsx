import React, { useEffect, useState } from 'react';
import replace from 'lodash/replace';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import { Edit, AddCircle, Delete } from '@material-ui/icons';
import actions from 'actions';
import { RootState } from 'reducers';
import DataTable, { headerProps } from 'components/shared/table';
import ActionButton from 'components/shared/extended-icon-button';
import * as ROUTES from 'constants/routes';
import { addZeroes, numberWithCommas } from 'utils';

const mapDispatchToProps = ({
  fetchProducts: actions.product.fetchProducts,
  deleteProduct: actions.product.deleteProduct,
});

const mapStateToProps = (state: RootState) => ({
  ...state.product,
});

const headers: headerProps[] = [
  { title: 'Product Name' },
  { title: 'Price', align: 'right' },
  { title: 'Details', align: 'right' },
  { title: 'Stocks Left', align: 'right' },
  { title: 'Actions', align: 'right' },
];

export type ProductsBoardProps = {
  /** Insert Custom Props here */
} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ProductsBoard = ({
  fetchProducts, deleteProduct, data, total, skip, limit, processing,
}: ProductsBoardProps) => {
  const [pageLimit, setPageLimit] = useState(limit);
  const [pageSkip, setPageSkip] = useState(skip);
  const history = useHistory();

  useEffect(() => { fetchProducts({ skip, limit }); }, []);
  useEffect(() => {
    fetchProducts({ skip: pageSkip, limit: pageLimit });
  }, [pageLimit, pageSkip]);
  return (
    <>
      <Typography variant="h4">
        Products
        <ActionButton
          tooltipProps={({ title: 'Add New Product' })}
          buttonProps={({ color: 'primary', onClick: () => history.push(ROUTES.FORM_ADD_PRODUCT) })}
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
            _id: id, price, stocks, name, details = 'No value',
          }) => (
            <TableRow key={id}>
              <TableCell component="th"><Typography variant="body2">{name}</Typography></TableCell>
              <TableCell align="right">
                <Typography variant="body2">
                  {numberWithCommas(
                    addZeroes(String(
                      Math.round((price + Number.EPSILON) * 100) / 100,
                    )),
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right"><Typography variant="body2">{details}</Typography></TableCell>
              <TableCell align="right"><Typography variant="body2">{stocks}</Typography></TableCell>
              <TableCell align="right">
                {/* List of action buttons */}
                <ActionButton
                  tooltipProps={({ title: `Update ${name}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { history.push(replace(ROUTES.FORM_UPDATE_PRODUCT, ':id', id)); },
                  })}
                  icon={<Edit />}
                />
                <ActionButton
                  tooltipProps={({ title: `Delete ${name}` })}
                  buttonProps={({
                    color: 'secondary',
                    onClick: () => { deleteProduct(id); },
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsBoard);
