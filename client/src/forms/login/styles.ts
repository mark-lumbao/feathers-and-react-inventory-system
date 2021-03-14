import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default (makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
})));
