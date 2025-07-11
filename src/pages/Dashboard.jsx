import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import StockRow from '../components/StockRows';
import { useGetHistoricalChartQuery } from '../api/stockApi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const Dashboard = () => {
  const {userStocks: selected, selectedSymbols} = useSelector(state => state.userStocks);
  const selectedStock = Object.keys(selectedSymbols)[0] ?? selected[0]?.symbol;
  const { data: chartData, isLoading } = useGetHistoricalChartQuery(
    selectedStock,
    { skip: !selectedStock }
  );
  const stock = useMemo(() => selected.find((s) => s.symbol === selectedStock), [selected, selectedStock])
  if (selected.length === 0) {
    return <div className="text-white p-4">No stocks in your list.</div>;
  }

  console.log("Stock: ", stock)

  console.log(selected)
  console.log(chartData?.historical)
  const transformedData = chartData?.historical?.map(item => ({
    time: item.date,
    price: item.close,
  })) || [];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-white p-4">
        <h2 className="text-xl font-bold mb-4">My Stocks</h2>
        <div className="max-h-[40vh] overflow-y-auto border border-gray-700 rounded-lg p-2">
          <StockRow data={selected} isLoading={false} isSelectLimited={true}/>
        </div>
      </div>
      {selectedStock && !isLoading && transformedData.length > 0 && (
        <div className="mx-4">
          <h3 className="text-lg font-semibold mb-2">
              {selectedStock} Price Chart
            </h3>
          <div className="flex items-center gap-10">
            <h3 className="bg-gray-600 px-2 rounded text-sm font-semibold mb-2">
              {stock.companyName}
            </h3>
            <h3 className="bg-gray-600 px-2 rounded text-sm font-semibold mb-2">
              {stock.shares} Shares
            </h3>
            <h3 className="bg-gray-600 px-2 rounded text-sm font-semibold mb-2">
              {stock.price}
            </h3>
            <h3 className="bg-gray-600 px-2 rounded text-sm font-semibold mb-2">
              {stock.volume} Volume
            </h3>
          </div>
          <div className="bg-black p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transformedData}>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#10b981" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
