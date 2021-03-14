import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';

export interface NavMenuItemProps {
  /** Menu label */
  title: string;
  /** ( Optional ) Menu icon */
  icon?: ReactElement;
  /** ( Optional ) Menu path for redirection */
  path?: string;
  /** ( Optional ) Add in any extra behaviours for this menu onClick */
  extraCallBack?: () => void;
}

const NavMenuItem = ({
  path, title, icon, extraCallBack,
}: NavMenuItemProps) => {
  const history = useHistory();
  return (
    <MenuItem onClick={() => {
      if (path) {
        history.push(path);
      }
      extraCallBack();
    }}
    >
      {icon}
      {title}
    </MenuItem>
  );
};

export default NavMenuItem;
