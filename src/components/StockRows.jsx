import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSymbols } from '../api/slices/userStocksSlice';

const SymbolList = ({ data, isLoading, isSelectLimited }) => {
  const dispatch = useDispatch();

  const checkedSymbols = useSelector((state) => state.userStocks.selectedSymbols)

  console.log("checkedSymbols: ", checkedSymbols)
  const handleCheckboxChange = (symbol, item) => {
    if (isSelectLimited) {
      dispatch(setSelectedSymbols({ symbol, item, replaceAll: true }));
    } else {
      dispatch(setSelectedSymbols({ symbol, item }));
    }
  };
  

  const limitedData = [];
  if (data) {
    for (let i = 0; i < data.length && limitedData.length < 500; i++) {
      const item = data[i];
      if (item.marketCap > 0 && item.price > 0) {
        limitedData.push(item);
      }
    }
  } 
  
  if (isLoading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div>
        <div className="text-white max-w-full overflow-auto">
        <table className="w-full table-fixed" style={{ borderCollapse: 'separate', borderSpacing: '8px' }}>
            <thead>
            <tr className="text-gray-300 text-sm">
                <th className="w-2" />
                <th className="w-10 p-2 border-2 border-gray-700 rounded-lg">Symbol</th>
                <th className="w-40 p-2 border-2 border-gray-700 rounded-lg text-left">Name</th>
                <th className="w-20 p-2 border-2 border-gray-700 rounded-lg text-right">Volume</th>
                <th className="w-20 p-2 border-2 border-gray-700 rounded-lg text-right">Price</th>
                <th className="w-20 p-2 border-2 border-gray-700 rounded-lg text-right">Market Cap</th>
                <th className="w-10 p-2 border-2 border-gray-700 rounded-lg text-right">Change</th>
            </tr>
            </thead>
            <tbody>
            {limitedData.map((item, index) => {
                const {
                symbol,
                companyName,
                price,
                marketCap,
                volume,
                } = item;
                const fakeChange = parseFloat((Math.random() * 5 - 2.5).toFixed(2));
                const changeColor = fakeChange >= 0 ? 'text-green-400' : 'text-red-400';

                return (
                <tr key={symbol + index} className="text-sm border border-gray-700 rounded-lg">
                    <td className="text-center">
                    <input
                      type="checkbox"
                      checked={!!checkedSymbols[symbol]}
                      onChange={() => handleCheckboxChange(symbol, item)}
                    />
                    </td>
                    <td className="p-2 border-2 border-gray-700 rounded-lg text-center">
                    {symbol}
                    </td>
                    <td className="p-2 border-2 border-gray-700 rounded-lg truncate max-w-[160px]">{companyName}</td>
                    <td className="p-2 border-2 border-gray-700 rounded-lg text-right">{volume?.toLocaleString()}</td>
                    <td className="p-2 border-2 border-gray-700 rounded-lg text-right">${price?.toFixed(2)}</td>
                    <td className="p-2 border-2 border-gray-700 rounded-lg text-right">${marketCap.toFixed(1)}B</td>
                    <td className={`p-2 border-2 border-gray-700 rounded-lg text-right ${changeColor}`}>
                    {fakeChange > 0 ? '+' : ''}
                    {fakeChange}%
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>  
    </div>
    
  );
};

export default SymbolList;
