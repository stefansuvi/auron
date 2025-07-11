import React, { useEffect, useState } from 'react';
import { useLazyGetHistoricalChartQuery } from '../../api/stockApi';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dodaj helper funkciju za formatiranje datuma
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthShort = date.toLocaleString('en-US', { month: 'short' }); // npr. "Jun"
  return `${day} ${monthShort}`;
};

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];

const ComparisonLineChart = ({ symbols }) => {
  const [trigger] = useLazyGetHistoricalChartQuery();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbols || symbols.length === 0) return;

    const fetchAllData = async () => {
      setLoading(true);
      const resultMap = {};

      for (const symbol of symbols) {
        const res = await trigger(symbol).unwrap().catch(() => null);
        if (!res?.historical) continue;

        res.historical.forEach((entry) => {
          const date = entry.date;
          if (!resultMap[date]) {
            resultMap[date] = { date };
          }
          resultMap[date][symbol] = entry.close;
        });
      }

      const mergedData = Object.values(resultMap).sort((a, b) => new Date(a.date) - new Date(b.date));
      setChartData(mergedData);
      setLoading(false);
    };

    fetchAllData();
  }, [symbols]);

  if (loading) return <div>Loading...</div>;
  if (!chartData.length) return <div>No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate} 
          interval="preserveStartEnd" 
          minTickGap={15}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(label) => formatDate(label)} 
          formatter={(value) => value.toFixed(2)}
        />
        <Legend />
        {symbols.map((symbol, idx) => (
          <Line
            key={symbol}
            type="monotone"
            dataKey={symbol}
            stroke={colors[idx % colors.length]}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComparisonLineChart;
