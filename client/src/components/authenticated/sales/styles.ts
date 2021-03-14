import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
    '& h4': { marginBottom: theme.spacing(2) },
  },
  agentListBox: {
    [theme.breakpoints.up('md')]: {
      width: 'max-content',
    },
  },
  agentListSubheader: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  salesBox: {
    display: 'flex',
    gap: `${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '& > div:last-child': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: `${theme.spacing(2)}px`,
      height: 'max-content',
    },
  },
  salesGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )',
    gap: `${theme.spacing(2)}px`,
  },
  salesCard: {
    padding: theme.spacing(2),
  },
  agentPicker: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      minWidth: 320,
      '& > *': {
        width: '100%',
      },
    },
    '& > ul': {
      flex: 1,
    },
    '& > nav': {
      padding: theme.spacing(1),
    },
  },
}));
