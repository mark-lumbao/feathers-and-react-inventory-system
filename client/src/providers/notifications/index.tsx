import React from 'react';
import { SnackbarProvider } from 'notistack';
import Notifier from './partials/notifier';

export interface NotificationsProviderProps {
  children: React.ReactNode;
}

const NotificationsProvider = ({ children }: NotificationsProviderProps) => (
  <SnackbarProvider maxSnack={3}>
    {children}
    <Notifier />
  </SnackbarProvider>
);

export default NotificationsProvider;
