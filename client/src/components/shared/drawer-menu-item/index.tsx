import React, { ReactElement, HTMLAttributes } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  ListItem, ListItemAvatar, ListItemText, Avatar,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type styleProps = { isActive: boolean };
const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    '& > svg': {
      backgroundColor: ({ isActive }: styleProps) => isActive
      && theme.palette.secondary.main,
    },
    backgroundColor: ({ isActive }: styleProps) => isActive
    && theme.palette.secondary.main,
  },
  item: {
    color: ({ isActive }: styleProps) => isActive && theme.palette.secondary.main,
    '& span': {
      fontWeight: ({ isActive }: styleProps) => ((isActive) ? 'bold' : 'inherit'),
    },
  },
}));

export interface DrawerItemProps
  extends HTMLAttributes<ReactElement> {
  icon: ReactElement;
  title: string;
  path: string;
}

const DrawerItem = ({
  icon, title, path,
}: DrawerItemProps) => {
  const history = useHistory();
  const location = useLocation();

  /**
   * True if the current browser location is equal to this
   * item's path.
   */
  const isActive = path === location.pathname;
  const classes = useStyles({ isActive });

  return (
    <div
      style={{ cursor: 'pointer' }}
      role="presentation"
      onKeyDown={() => null}
      onClick={() => history.push(path)}
    >
      <ListItem selected={isActive}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.item}>
          {title}
        </ListItemText>
      </ListItem>
    </div>
  );
};

export default DrawerItem;
