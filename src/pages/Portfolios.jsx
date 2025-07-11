import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortfolio } from '../api/slices/userStocksSlice';

import { v4 as uuidv4 } from 'uuid';
import PieChartWidget from '../components/widgets/PieChartWidget';
import ComparisonLineChart from '../components/widgets/ComparisonLineChart';

const Portfolios = () => {
  const [showModal, setShowModal] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);

  const dispatch = useDispatch();
  const userStocks = useSelector((state) => state.userStocks.userStocks);
  const portfolios = useSelector((state) => state.userStocks.portfolios);

  const currentPortfolio = portfolios[selectedPortfolio];
  const symbols = portfolios[selectedPortfolio]?.stocks.map(item => item?.symbol)
  const handleToggleSymbol = (symbol) => {
    setSelectedSymbols((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const handleCreatePortfolio = () => {
    const newPortfolio = {
      id: uuidv4(),
      name: newPortfolioName,
      createdAt: new Date().toISOString(),
      stocks: userStocks
        .filter((stock) => selectedSymbols.includes(stock.symbol))
        .map((stock) => ({
          symbol: stock.symbol,
          shares: stock.shares,
          priceAtPurchase: stock.price,
        })),
    };
    dispatch(createPortfolio(newPortfolio));
    setShowModal(false);
    setNewPortfolioName('');
    setSelectedSymbols([]);
  };

  const totalValue = currentPortfolio?.stocks.reduce(
    (sum, stock) => sum + stock.shares * stock.priceAtPurchase,
    0
  );

  const totalShares = currentPortfolio?.stocks.reduce(
    (sum, stock) => sum + stock.shares,
    0
  );

  const averagePrice =
    totalShares > 0 ? (totalValue / totalShares).toFixed(2) : '0.00';

  const pieData = currentPortfolio?.stocks.map((stock) => ({
    name: stock.symbol,
    value: stock.shares * stock.priceAtPurchase,
  })) || [];

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-4">My Portfolios</h2>

      <div className="flex gap-10 pb-2 mb-4 items-center justify-between">
        <div className="flex gap-4 overflow-x-auto border-gray-700">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className='px-4 py-2 rounded-lg whitespace-nowrap bg-gray-800 cursor-pointer'
                style={selectedPortfolio === index ? { background: 'linear-gradient(90deg, #8c52ff, #5ce1e6)' } : {}}
                onClick={() => setSelectedPortfolio(index)}
              >
                {portfolio.name}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">No portfolios yet.</div>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
        >
          + New Portfolio
        </button>
      </div>

      {currentPortfolio && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200 text-center">
              <h4 className="text-sm text-gray-400">Total Portfolio Value</h4>
              <p className="text-xl font-semibold">${totalValue.toFixed(2)}</p>
            </div>

            <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200 text-center">
              <h4 className="text-sm text-gray-400">Total Shares</h4>
              <p className="text-xl font-semibold">{totalShares}</p>
            </div>

            <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200 text-center">
              <h4 className="text-sm text-gray-400">Avg Price per Share</h4>
              <p className="text-xl font-semibold">${averagePrice}</p>
            </div>

            <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200 text-center">
              <h4 className="text-sm text-gray-400">Holdings</h4>
              <p className="text-xl font-semibold">{currentPortfolio.stocks.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="w-[40%] mt-6 px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200">
              <h4 className="text-md font-semibold mb-2">Portfolio Allocation</h4>
              <PieChartWidget pieData={pieData}/>
            </div>
            <div className="w-[60%] mt-6 px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200">
              <h4 className="text-md font-semibold mb-2">Portfolio Allocation</h4>
              <ComparisonLineChart symbols={symbols}/>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Portfolio</h3>
            <input
              type="text"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              placeholder="Portfolio name"
              className="w-full p-2 rounded-lg border-[1px] bg-gray-800 text-white mb-4"
            />
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              {userStocks.length > 0 ? (
                userStocks.map((stock) => (
                  <label key={stock.symbol} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSymbols.includes(stock.symbol)}
                      onChange={() => handleToggleSymbol(stock.symbol)}
                    />
                    <span>{stock.companyName} ({stock.symbol})</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-400 text-sm">You haven't added any stocks yet.</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePortfolio}
                className="bg-blue-600 px-4 py-2 rounded"
                disabled={!newPortfolioName || selectedSymbols.length === 0}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolios;