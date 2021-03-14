import React from 'react';
import { connect } from 'react-redux';
import { Card, CardProps, Typography } from '@material-ui/core';
import { MONTHS } from 'constants/common';
import { addZeroes, numberWithCommas } from 'utils';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  sales: state.sales.monthlySales,
});

export type SalesCardProps = {
  monthIndex: number,
  year: string,
} & CardProps & ReturnType<typeof mapStateToProps>;

const SalesCard = ({
  monthIndex, year, sales, ...cardProps
}: SalesCardProps) => {
  const { month = monthIndex, year: saleYear = year, sales: sale } = sales.data[monthIndex]
    ? sales.data[monthIndex]
    : { month: monthIndex + 1, year, sales: 0 };

  const salesText = numberWithCommas(
    addZeroes(String(
      Math.round((sale + Number.EPSILON) * 100) / 100,
    )),
  );

  const dateText = `${MONTHS[month - 1]}-${saleYear}`;

  return (
    <Card {...cardProps}>
      <Typography variant="h6" color="secondary">{dateText}</Typography>
      <br />
      {salesText}
    </Card>
  );
};

export default connect(mapStateToProps)(SalesCard);
