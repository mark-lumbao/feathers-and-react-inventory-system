import React from 'react';
import { connect } from 'react-redux';
import ProductForm from 'forms/product';
import { RootState } from 'reducers';
import actions from 'actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.product.processing,
});

const mapDispatchToProps = ({
  submit: actions.product.submitProduct,
});

export type AddProductProps = {
  /** Add custo props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const AddProduct = ({
  submitting, submit,
}: AddProductProps) => (
  <ProductForm
    submitHandler={(values) => {
      submit({
        ...values,
        price: values.price,
        stocks: values.stocks,
      });
    }}
    title="Add Product"
    submitting={submitting}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
