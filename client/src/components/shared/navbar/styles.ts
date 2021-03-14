import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  toolBar: {
    height: 64,
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    '& > svg': { marginRight: 10 },
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
