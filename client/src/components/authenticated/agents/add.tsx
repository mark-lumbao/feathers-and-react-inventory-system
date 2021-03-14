import React from 'react';
import { connect } from 'react-redux';
import AgentForm from 'forms/agent';
import { RootState } from 'reducers';
import actions from 'actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.agent.processing,
});

const mapDispatchToProps = ({
  submit: actions.agent.submitAgent,
});

export type RegisterAgentProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const RegisterAgent = ({
  submitting, submit,
}: RegisterAgentProps) => (
  <AgentForm
    title="Register Agent"
    submitHandler={(values) => {
      submit(values);
    }}
    submitting={submitting}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAgent);
