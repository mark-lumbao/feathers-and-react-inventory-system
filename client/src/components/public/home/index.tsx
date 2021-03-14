import React, { lazy } from 'react';
import {
  Container, Box, Typography, Paper,
  Grid,
} from '@material-ui/core';
import useStyle from './styles';

const LoginForm = lazy(() => import('forms/login'));
const Features = lazy(() => import('./partials/features'));

const Home = () => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Paper square className={classes.hero}>
        <Typography variant="h1">Company Name</Typography>
        <Typography variant="h2">Inventory System</Typography>
      </Paper>
      <Container
        component={Paper}
        className={classes.featuresContainer}
      >
        <Grid container spacing={2} className={classes.contentRoot}>
          <Grid item xs={12} md={6}>
            <Features />
          </Grid>
          <Grid item xs={12} md={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
