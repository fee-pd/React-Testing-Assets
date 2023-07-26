import React from 'react';
import { Typography } from '@material-ui/core';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { IBudget } from '../types/types';


interface ChartProps {
  data: IBudget[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Typography variant="h4">
        Set your income and create some budgets!
      </Typography>
    );
  }
  return (
    <div data-testid="chart">
      <BarChart
        width={550}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
};

export default Chart;