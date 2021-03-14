import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  signatureLabel: {
    borderTop: '2px solid #000',
    paddingTop: 5,
    width: 300,
    textAlign: 'center',
    fontSize: 15,
  },
  signatureContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  signatureField: { borderTop: 1, maxWidth: 300 },
  topDetailContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: { flex: 2, fontSize: 15 },
  mainCell: { flex: 2, fontSize: 15 },
  productsHeading: { flex: 1, fontSize: 15 },
  productsCell: { flex: 1, fontSize: 13 },
  priceHeading: { flex: 1, textAlign: 'right', fontSize: 15 },
  priceCell: { flex: 1, textAlign: 'right', fontSize: 15 },
  headingContainer: { display: 'flex', flexDirection: 'row', marginBottom: 5 },
  productCellsContainer: { display: 'flex', flexDirection: 'row' },
  totalPaymentLabel: { textAlign: 'right', fontSize: 15 },
});
