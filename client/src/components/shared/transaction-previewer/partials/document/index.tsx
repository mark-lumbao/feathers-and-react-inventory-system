/* eslint-disable max-lines */
import React from 'react';
import {
  Document, Page, View, Text,
} from '@react-pdf/renderer';
import { transactionDataProps } from 'actions/transaction/actions';
import { productProps } from 'actions/product/actions';
import { addZeroes, numberWithCommas } from 'utils';
import DetailText from './detail-text';
import styleSheet from './document-styles';
import Header from './header';

export type TransactionDocumentProps = {
  /** Add custom props here */
  transaction: transactionDataProps,
}

const TransactionDocument = ({
  transaction: { _id: id, ...rest },
}: TransactionDocumentProps) => (
  <Document>
    {/* @note supposedly this is 8.5 x 6.5 inches */}
    <Page size={[816, 624]} style={{ padding: '30' }}>
      <Header receiptId={id} />
      <View style={styleSheet.topDetailContainer}>
        <View>
          <DetailText title="Customer" value={rest.client ? rest.client.name : 'No client specified'} />
          <DetailText title="Contact Person" value={rest.client ? rest.client.contactPerson : 'No client specified'} />
          <DetailText title="Address" value={rest.client ? rest.client.address : 'No client specified'} />
        </View>
        <View>
          <DetailText title="Agent in charge" value={rest.agent ? rest.agent.fullName : 'Unkown agent'} />
          <DetailText title="Date" value={rest.createdAt.toDateString()} />
          <DetailText title="Terms" value={rest.terms} />
        </View>
      </View>
      <View fixed style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <Text style={styleSheet.productsHeading}>Quantity</Text>
        <Text style={styleSheet.productsHeading}>Unit</Text>
        <Text style={styleSheet.mainHeading}>Description</Text>
        <Text style={styleSheet.productsHeading}>Unit Price</Text>
        <Text style={styleSheet.priceHeading}>Amount</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        {rest.products.map((p, index) => (
          p.product && (
            <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styleSheet.productsCell}>
                {String(p.quantity)}
              </Text>
              <Text style={styleSheet.productsCell}>
                {p.unit}
              </Text>
              <Text style={styleSheet.mainCell}>
                {String((p.product as productProps).name)}
              </Text>
              <Text style={styleSheet.productsCell}>
                {numberWithCommas(
                  addZeroes(String(
                    Math.round(((p.product as productProps).price + Number.EPSILON) * 100) / 100,
                  )),
                )}
              </Text>
              <Text style={styleSheet.priceCell}>
                {numberWithCommas(
                  addZeroes(String(
                    Math.round((((p.product as productProps).price * p.quantity)
                    + Number.EPSILON) * 100) / 100,
                  )),
                )}
              </Text>
            </View>
          )
        ))}
      </View>
      <Text style={styleSheet.totalPaymentLabel}>
        Total:
        &nbsp;
        {numberWithCommas(
          addZeroes(String(
            Math.round((rest.totalPrice + Number.EPSILON) * 100) / 100,
          )),
        )}
      </Text>
      <View style={styleSheet.signatureContainer}>
        <View style={styleSheet.signatureField}>
          <Text style={styleSheet.signatureLabel}>
            Delivered by:
          </Text>
          <Text style={styleSheet.signatureLabel}>
            Signature over printed name
          </Text>
        </View>
        <View style={styleSheet.signatureField}>
          <Text style={styleSheet.signatureLabel}>
            Received by:
          </Text>
          <Text style={styleSheet.signatureLabel}>
            Signature over printed name
          </Text>
        </View>
      </View>
      <Text
        fixed
        style={{
          fontSize: 12,
          position: 'absolute',
          bottom: 30,
          left: 30,
        }}
        render={({ pageNumber, totalPages }) => (
          <Text>
            {`page ${pageNumber} / ${totalPages}`}
          </Text>
        )}
      />
    </Page>
  </Document>
);

export default TransactionDocument;
