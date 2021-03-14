import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 600,
    [theme.breakpoints.down('xs')]: {
      width: 'max-content',
      minWidth: 500,
      '& > div > div.selected-products': {
        width: '100%',
      },
    },
  },
  productListRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  pagination: {
    marginBottom: theme.spacing(2),
  },
  totalPriceLabel: {
    marginTop: 20,
    width: '100%',
    textAlign: 'right',
  },
  productsFieldSubTitles: {
    marginTop: 20,
  },
}));
