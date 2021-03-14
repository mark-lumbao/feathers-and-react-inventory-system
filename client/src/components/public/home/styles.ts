import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
  },
  contentRoot: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  hero: {
    background: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(10),
    paddingBottom: theme.spacing(15),
    textAlign: 'center',
    '& > h1, h2': {
      textShadow: '3px 3px 10px #333',
    },
    [theme.breakpoints.down('xs')]: {
      '& > h1': {
        fontSize: 35,
      },
      '& > h2': {
        fontSize: 30,
      },
      padding: theme.spacing(8),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(13),
    },
  },
  featuresContainer: {
    padding: theme.spacing(5),
    marginTop: -theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  featureCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    padding: theme.spacing(2),
    flexDirection: 'column',
    '& > span': {
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    [theme.breakpoints.down(321)]: {
      width: 80,
      height: 80,
    },
  },
}));
