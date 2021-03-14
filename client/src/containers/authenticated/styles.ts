import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  content: {
    position: 'absolute',
    left: theme.spacing(30),
    top: 64,
    right: 0,
    padding: theme.spacing(3),
    '& h1': {
      margin: 0,
    },
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(9),
      overflowX: 'scroll',
    },
  },
}));
