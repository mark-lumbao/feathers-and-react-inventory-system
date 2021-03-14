import React, { useEffect, useState } from 'react';
import {
  Typography, TextField,
} from '@material-ui/core';
import { productDataProps } from 'forms/transaction/utils';
import useStyles from 'forms/transaction/styles';
import ProductItemList from './item-list';
import SelectedProductList from './selected-item-list';

export type ProductsFieldProps = {
  onChangeValue: (values: productDataProps[]) => void,
  hasInvalidItem: (value: boolean) => void,
  submitSucceeded?: boolean,
}

/**
 * @param onChangeValue exports values of selected products
 * @param hasInvalidItem checks if products field has invalid items
 * @param submitSucceeded determines if the form containing
 * this component has submitted successfully
 */
const ProductsField = ({ onChangeValue, hasInvalidItem, submitSucceeded }: ProductsFieldProps) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<productDataProps[]>([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    hasInvalidItem(checked.some((i) => i.invalid));
    onChangeValue(checked);
  }, [checked]);

  /** Performs a reset on submit success */
  useEffect(() => { if (submitSucceeded) setChecked([]); }, [submitSucceeded]);

  const handleItemSelect = (value: productDataProps) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      /** @note default value of quantity is one */
      newChecked.push({ ...value, quantity: 1 });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Typography className={classes.productsFieldSubTitles} variant="h6">Select from Products</Typography>
      <TextField onChange={(event) => setSearch(event.target.value)} placeholder="Search a product" />
      <ProductItemList
        searchedItem={search}
        checkList={checked}
        itemSelectHandler={handleItemSelect}
        submitSucceeded={submitSucceeded}
      />
      <SelectedProductList checked={checked} setChecked={setChecked} />
    </>
  );
};

export default ProductsField;
