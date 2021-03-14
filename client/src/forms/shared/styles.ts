import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  fieldsRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  groupedFieldsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));
