import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import find from 'lodash/find';
import AgentForm from 'forms/agent';
import { RootState } from 'reducers';
import actions from 'actions';
import { agentProps } from 'actions/agent/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.agent.processing,
  data: state.agent.data,
});

const mapDispatchToProps = ({
  submit: actions.agent.updateAgent,
});

export type UpdateUserProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const UpdateUser = ({
  submitting, submit, data,
}: UpdateUserProps) => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<agentProps>();
  useEffect(() => {
    setAgent(find(data, ({ _id: pId }) => pId === id));
  }, [id]);
  return (
    <AgentForm
      title="Update Agent"
      submitHandler={(values) => {
        submit(values);
        setAgent({ ...agent, ...values });
      }}
      submitting={submitting}
      initialValues={agent}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
