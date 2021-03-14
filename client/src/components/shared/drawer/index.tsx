import React, { lazy } from 'react';
import {
  Drawer, List,
} from '@material-ui/core';
import {
  Dashboard, People, ShoppingCart,
  RecentActors, AccountBalance,
} from '@material-ui/icons';
import * as ROUTES from 'constants/routes';
import useStyle from './styles';

const MenuItem = lazy(() => import('components/shared/drawer-menu-item'));

const DrawerNav = () => {
  const classes = useStyle();

  return (
    <Drawer className={classes.root} variant="permanent">
      <List className={classes.listRoot}>
        <MenuItem
          icon={<Dashboard />}
          title="Dashboard"
          path={ROUTES.AUTH_DASHBOARD}
        />
        <MenuItem
          icon={<AccountBalance />}
          title="Sales"
          path={ROUTES.AUTH_DASHBOARD_SALES}
        />
        <MenuItem
          icon={<ShoppingCart />}
          title="Products"
          path={ROUTES.AUTH_DASHBOARD_PRODUCTS}
        />
        <MenuItem
          icon={<RecentActors />}
          title="Clients"
          path={ROUTES.AUTH_DASHBOARD_CLIENTS}
        />
        <MenuItem
          icon={<People />}
          title="Agents"
          path={ROUTES.AUTH_DASHBOARD_AGENTS}
        />
        <MenuItem
          icon={<People />}
          title="Users"
          path={ROUTES.AUTH_DASHBOARD_USERS}
        />
      </List>
    </Drawer>
  );
};

export default DrawerNav;
