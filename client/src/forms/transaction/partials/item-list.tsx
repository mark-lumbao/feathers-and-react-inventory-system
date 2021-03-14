import React, { useState, useEffect } from 'react';
import {
  List, ListItem, ListItemIcon,
  ListItemText, Checkbox,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import find from 'lodash/find';
import floor from 'lodash/floor';
import useStyles from 'forms/transaction/styles';
import { getproducts, productDataProps, DEFAULT_PRODUCTS_LIMIT } from 'forms/transaction/utils';

export type ProductItemListProps = {
  searchedItem: string,
  checkList: productDataProps[],
  itemSelectHandler: (value: productDataProps) => () => void,
  submitSucceeded?: boolean,
};

const ProductItemList = ({
  itemSelectHandler, checkList, searchedItem, submitSucceeded,
}: ProductItemListProps) => {
  const classes = useStyles();
  const [products, setProducts] = useState<productDataProps[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  /**
   * Fetch on every search, page change, or successful submit
   */
  useEffect(() => {
    getproducts({ page, name: searchedItem }).then(({ data, total: totalProducts }) => {
      setProducts(data);
      setTotal(totalProducts);
    });
  }, [page, searchedItem, submitSucceeded]);

  return (
    <>
      <List className={classes.productListRoot}>
        {products.map((value) => (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            onClick={itemSelectHandler(value)}
            disabled={Boolean(find(checkList, (v) => v.id === value.id))}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={Boolean(find(checkList, (v) => v.id === value.id))}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': value.id }}
              />
            </ListItemIcon>
            <ListItemText id={value.id} primary={value.name} />
          </ListItem>
        ))}
      </List>
      <Pagination
        className={classes.pagination}
        /** @note add one to count if total has a remainder when divided by 5 */
        count={(
          total % DEFAULT_PRODUCTS_LIMIT)
          ? floor(total / DEFAULT_PRODUCTS_LIMIT) + 1
          : floor(total / DEFAULT_PRODUCTS_LIMIT)}
        onChange={(_event, newPage) => setPage(newPage)}
      />
    </>
  );
};

export default ProductItemList;
