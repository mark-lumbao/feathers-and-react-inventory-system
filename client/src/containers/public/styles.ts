import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  content: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll',
    },
  },
}));
