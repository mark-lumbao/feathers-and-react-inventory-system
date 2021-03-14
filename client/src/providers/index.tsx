import React from 'react';
import App from 'app';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import 'assets/styles.css';
import ReduxProvider from './redux';
import NotificationsProvider from './notifications';

const Providers = () => (
  <ReduxProvider>
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default Providers;
