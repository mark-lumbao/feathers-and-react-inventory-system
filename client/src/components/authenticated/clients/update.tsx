import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import find from 'lodash/find';
import ClientForm from 'forms/client';
import { RootState } from 'reducers';
import actions from 'actions';
import { clientProps } from 'actions/client/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.client.processing,
  data: state.client.data,
});

const mapDispatchToProps = ({
  submit: actions.client.updateClient,
});

export type UpdateClientProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const UpdateClient = ({
  submitting, submit, data,
}: UpdateClientProps) => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<clientProps>();
  useEffect(() => {
    setClient(find(data, ({ _id: pId }) => pId === id));
  }, [id]);
  return (
    <ClientForm
      title="Update Client"
      submitHandler={(values) => {
        submit(values);
        setClient({ ...client, ...values });
      }}
      submitting={submitting}
      initialValues={client}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClient);
