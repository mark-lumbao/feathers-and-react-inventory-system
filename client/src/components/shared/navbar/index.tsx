import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppBar, Toolbar, Typography, Menu, IconButton, Box,
} from '@material-ui/core';
import {
  AccountCircle, ExitToApp, Dashboard, VpnKey,
} from '@material-ui/icons';
import MenuItem from 'components/shared/menu-item';
import { RootState } from 'reducers';
import * as ROUTES from 'constants/routes';
import actions from 'actions';
import logo from 'assets/images/inventory.png';
import useStyle from './styles';

const mapStateToProps = (state: RootState) => ({
  token: state.auth.accessToken,
});

const mapDispatchToProps = ({
  signOut: actions.auth.signout,
  notify: actions.notification.addNotification,
});

export type NavBarProps = {
  /** @NOTE add in custom props here */
} & ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const NavBar = ({
  token, signOut, notify,
}: NavBarProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const classes = useStyle();
  const isMenuOpen = Boolean(menuAnchor);
  const history = useHistory();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolBar}>
        <Box
          component="div"
          className={classes.title}
          onClick={() => history.push(ROUTES.HOME)}
        >
          <img src={logo} alt="logo" style={{ width: 40 }} />
          <Typography variant="h6">
            Company Name
          </Typography>
        </Box>
        {token && (
          <>
            <IconButton
              className={classes.menuButton}
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={isMenuOpen}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem
                title="Dashboard"
                path={ROUTES.AUTH_DASHBOARD}
                icon={<Dashboard style={{ marginRight: 10 }} />}
                extraCallBack={() => setMenuAnchor(null)}
              />
              <MenuItem
                title="Reset Password"
                path={ROUTES.REQUEST_RESET_PASSWORD}
                icon={<VpnKey style={{ marginRight: 10 }} />}
                extraCallBack={() => setMenuAnchor(null)}
              />
              <MenuItem
                title="Signout"
                icon={<ExitToApp style={{ marginRight: 10 }} />}
                extraCallBack={() => {
                  try {
                    signOut();
                    notify({ message: 'Successfully signed out!', options: { variant: 'success' } });
                  } catch (error) {
                    notify({ message: `SIGNOUT_ERROR: ${error.message}!`, options: { variant: 'error' } });
                  }
                  setMenuAnchor(null);
                }}
              />
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
