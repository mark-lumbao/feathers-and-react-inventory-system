import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import find from 'lodash/find';
import ProductForm from 'forms/product';
import { RootState } from 'reducers';
import actions from 'actions';
import { productProps } from 'actions/product/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.product.processing,
  data: state.product.data,
});

const mapDispatchToProps = ({
  submit: actions.product.updateProduct,
});

export type UpdateProductProps = {
  /** Add custo props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const UpdateProduct = ({
  submitting, submit, data,
}: UpdateProductProps) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<productProps>();
  useEffect(() => {
    setProduct(find(data, ({ _id: pId }) => pId === id));
  }, [id]);
  return (
    <ProductForm
      initialValues={product}
      submitHandler={(values) => {
        submit({
          ...values,
          price: values.price,
          stocks: values.stocks,
        });
        setProduct({ ...product, ...values });
      }}
      title="Update Product"
      submitting={submitting}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
