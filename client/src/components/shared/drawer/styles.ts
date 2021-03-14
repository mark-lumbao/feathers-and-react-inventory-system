import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
    '& > div': {
      width: theme.spacing(30),
      top: 64,
      zIndex: -1,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        width: theme.spacing(9),
      },
    },
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
