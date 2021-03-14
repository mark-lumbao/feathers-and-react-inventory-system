import React, { ReactElement, HtmlHTMLAttributes } from 'react';
import {
  IconButton, IconButtonProps, Tooltip, Box,
} from '@material-ui/core';

export interface ExtendedIconButtonProps extends HtmlHTMLAttributes<any> {
  icon: ReactElement;
  buttonProps: IconButtonProps;
  tooltipProps: {
    placement?:
    | 'bottom-end' | 'bottom-start' | 'bottom'
    | 'left-end' | 'left-start' | 'left'
    | 'right-end' | 'right-start' | 'right'
    | 'top-end' | 'top-start' | 'top';
    title: string;
  };
}

const ExtendedIconButton = ({
  icon, tooltipProps, buttonProps, ...htmlAttributes
}: ExtendedIconButtonProps) => (
  <Box component="span" {...htmlAttributes}>
    <Tooltip {...tooltipProps}>
      <IconButton {...buttonProps}>
        {icon}
      </IconButton>
    </Tooltip>
  </Box>
);

export default ExtendedIconButton;
