import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import find from 'lodash/find';
import UserForm from 'forms/registration';
import { RootState } from 'reducers';
import actions from 'actions';
import { userProps } from 'actions/user/actions';

const mapStateToProps = (state: RootState) => ({
  submitting: state.user.processing,
  data: state.user.data,
});

const mapDispatchToProps = ({
  submit: actions.user.updateUser,
});

export type UpdateUserProps = {
  /** Add custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const UpdateUser = ({
  submitting, submit, data,
}: UpdateUserProps) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<userProps>();
  useEffect(() => {
    setUser(find(data, ({ _id: pId }) => pId === id));
  }, [id]);
  return (
    <UserForm
      title="Update User"
      submitHandler={(values) => {
        submit(values);
        setUser({ ...user, ...values });
      }}
      submitting={submitting}
      initialValues={user}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
