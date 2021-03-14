import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';
import DetailText from './detail-text';

const styleSheet = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'heavy',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'ultrabold',
    textTransform: 'uppercase',
  },
  blankText: { fontSize: 13 },
  root: {
    marginBottom: 18,
  },
  contacts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const DocumentHeader = ({
  receiptId,
}: { receiptId: string }) => (
  <View style={styleSheet.root} fixed>
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={styleSheet.title}>
        Company Name
      </Text>
      <Text style={styleSheet.subtitle}>Delivery Receipt</Text>
    </View>
    <Text style={styleSheet.subtitle}>
      Circumferential Road Sooc, Arevalo Iloilo City
    </Text>
    <View style={styleSheet.contacts}>
      <DetailText fontSize={13} title="Smart No" value="09306558438" />
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <Text style={styleSheet.blankText}>/</Text>
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <DetailText fontSize={13} title="Sun No" value="09328727339" />
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <Text style={styleSheet.blankText}>/</Text>
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <DetailText fontSize={13} title="Globe No" value="09778998885" />
    </View>
    <View style={styleSheet.contacts}>
      <DetailText fontSize={13} title="Tel" value="(033) 339-8742" />
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <Text style={styleSheet.blankText}>/</Text>
      <Text style={styleSheet.blankText}>&nbsp;</Text>
      <DetailText fontSize={13} title="TIN" value="482-239-262-000" />
    </View>
    <DetailText fontSize={13} title="DR Number" value={receiptId} />
  </View>
);

export default DocumentHeader;
