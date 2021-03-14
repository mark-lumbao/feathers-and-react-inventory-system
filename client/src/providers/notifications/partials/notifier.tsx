import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import reverse from 'lodash/reverse';
import { RootState } from 'reducers';
import actions from 'actions';

const mapStateToProps = (state: RootState) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = ({
  signOut: actions.auth.signout,
});

export type NotifierProps =
  ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const Notifier = ({ notifications }: NotifierProps) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (notifications.length > 0) {
      const { message, options } = reverse(notifications)[0];

      enqueueSnackbar(
        message,
        options,
      );
    }
  }, [notifications]);
  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
