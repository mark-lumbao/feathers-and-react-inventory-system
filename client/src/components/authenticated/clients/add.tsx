import React from 'react';
import { connect } from 'react-redux';
import ClientForm from 'forms/client';
import { RootState } from 'reducers';
import actions from 'actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.client.processing,
});

const mapDispatchToProps = ({
  submit: actions.client.submitClient,
});

export type AddClientProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const AddClient = ({
  submitting, submit,
}: AddClientProps) => (
  <ClientForm
    title="Add Client"
    submitHandler={(values) => submit(values)}
    submitting={submitting}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);
