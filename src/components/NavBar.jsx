import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateWalletAmount } from '../api/slices/userStocksSlice';

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const walletAmount = useSelector(state => state.userStocks.walletAmount); // iz Redux-a

  const routeTitles = {
    '/': 'Stocks',
    '/dashboard': 'Dashboard',
    '/portfolios': 'Portfolios',
    '/analyses': 'Analyses',
    '/wallet': 'Wallet'
  };

  const pageTitle = routeTitles[location.pathname] || 'Stocks';
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddFunds = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed) && parsed > 0) {
      dispatch(updateWalletAmount(parsed)); // 🟢 ažuriraj Redux wallet
      setInputValue('');
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10 h-10 px-3">
        <h1 className="text-3xl font-semibold text-white">{pageTitle}</h1>
        <div className="flex gap-10 items-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 transition duration-200"
          >
            Add to wallet +
          </button>
          <p className="text-white">Wallet: ${walletAmount.toLocaleString()}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Add Funds to Wallet</h2>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFunds}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
