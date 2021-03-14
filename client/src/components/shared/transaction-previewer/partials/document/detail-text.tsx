import React from 'react';
import { Text } from '@react-pdf/renderer';

export type DetailTextProps = {
  title: string,
  value: string,
  fontSize?: number,
}

const DetailText = ({
  title, value, fontSize = 15,
}: DetailTextProps) => (
  <Text style={{ fontSize, maxWidth: 500 }}>
    {title}
    :
    &nbsp;
    {value}
  </Text>
);

export default DetailText;
