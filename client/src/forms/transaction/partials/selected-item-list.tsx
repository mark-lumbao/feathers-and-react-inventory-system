import React from 'react';
import {
  Typography, TableRow, TableCell,
  IconButton, TextField,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import sumBy from 'lodash/sumBy';
import filter from 'lodash/filter';
import Table from 'components/shared/table';
import useStyles from 'forms/transaction/styles';
import { productDataProps } from '../utils';

export type SelectedProductListProps = {
  checked: productDataProps[],
  setChecked: React.Dispatch<React.SetStateAction<productDataProps[]>>,
}

const SelectedProductList = ({
  checked, setChecked,
}: SelectedProductListProps) => {
  const classes = useStyles();

  return (
    checked.length > 0 && (
      <>
        <Typography className={classes.productsFieldSubTitles} variant="h6">Selected Products</Typography>
        <Table
          headers={[{ title: 'Name' }, { title: 'Quantity' }, { title: 'Unit' }, { title: 'Price', align: 'right' }, { title: '' }]}
          tableRootClassName="selected-products"
          size="small"
          data={checked}
          hasPagination={false}
          render={(values) => (
            values.map((product, index) => (
              <TableRow>
                <TableCell width={100} align="left">{product.name}</TableCell>
                <TableCell>
                  <TextField
                    error={product.quantity > product.stocks}
                    helperText={product.quantity > product.stocks && `only ${product.stocks} left`}
                    required
                    defaultValue={product.quantity || 1}
                    type="number"
                    onChange={(event) => {
                      const newProd = {
                        ...product,
                        quantity: Number(event.target.value),
                        invalid: Number(event.target.value) > product.stocks,
                      };
                      const newChecked = [...checked];
                      newChecked[index] = newProd;
                      setChecked(newChecked);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    defaultValue={product.unit || null}
                    type="text"
                    onChange={(event) => {
                      const newProd = { ...product, unit: event.target.value };
                      const newChecked = [...checked];
                      newChecked[index] = newProd;
                      setChecked(newChecked);
                    }}
                  />
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell style={{ width: 20 }}>
                  <IconButton onClick={() => setChecked(filter(checked, (p) => p !== product))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        />
        <Typography className={classes.totalPriceLabel} variant="h6">
          Total:
          {`${sumBy(checked, (p) => p.price * (p.quantity || 0))}`}
        </Typography>
      </>
    )
  );
};

export default SelectedProductList;
