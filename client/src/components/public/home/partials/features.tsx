import React from 'react';
import {
  Grid, Card, Typography,
} from '@material-ui/core';
import {
  SupervisedUserCircle, Assignment,
  Assessment, Print,
} from '@material-ui/icons';
import useStyle from '../styles';

const Features = () => {
  const classes = useStyle();
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Card className={classes.featureCard}>
          <SupervisedUserCircle fontSize="large" color="primary" />
          <Typography variant="caption">User Autherntications</Typography>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.featureCard}>
          <Assignment fontSize="large" color="primary" />
          <Typography variant="caption">Transactions Management</Typography>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.featureCard}>
          <Assessment fontSize="large" color="primary" />
          <Typography variant="caption">Products Encoding and Tracking</Typography>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.featureCard}>
          <Print fontSize="large" color="primary" />
          <Typography variant="caption">Receipt Printing</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Features;
