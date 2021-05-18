import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OverviewChart = ({ data, xAxis, yAxis }): JSX.Element => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={xAxis} />
        <YAxis dataKey={yAxis} />
        <Tooltip />
        <Legend />
        <Area type='monotone' dataKey={yAxis} stroke='#262b40' fill='#262b40' activeDot={{ r: 5 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
