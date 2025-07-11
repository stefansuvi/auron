import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMultipleStocks, updateWalletAmount } from '../../api/slices/userStocksSlice';

const BuyStocksModal = ({ checkedSymbols, toggleModal, showModal }) => {
    const [localShares, setLocalShares] = useState({});
    const dispatch = useDispatch();
    const { walletAmount } = useSelector((state) => state.userStocks)

    console.log(walletAmount)

    useEffect(() => {
        if (showModal) {
          const initialShares = {};
          Object.values(checkedSymbols).forEach(stock => {
            initialShares[stock.symbol] = stock.shares || 1;
          });
          setLocalShares(initialShares);
        }
      }, [showModal, checkedSymbols]);

      const totalPrice = useMemo(() => {
        return Object.values(checkedSymbols).reduce((sum, stock) => {
          const shares = localShares[stock.symbol] || 1;
          return sum + stock.price * shares;
        }, 0);
      }, [checkedSymbols, localShares]);

      
    const handleAddToList = () => {
        if (totalPrice > walletAmount) return;
        const selected = Object.values(checkedSymbols).map(stock => ({
          ...stock,
          shares: localShares[stock.symbol] || 1,
        }));
        dispatch(addMultipleStocks(selected));
        dispatch(updateWalletAmount(-totalPrice)); 
        toggleModal(false);
      };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[70%]">
            <h3 className="text-lg font-bold mb-4">Set number of stocks for each company</h3>

            <div className="max-h-60 overflow-y-auto mb-4 border border-gray-700 rounded">
              <div className="grid grid-cols-4 font-semibold bg-gray-700 p-2 border-b border-gray-600">
                <div>Symbol</div>
                <div>Company</div>
                <div>Price</div>
                <div>Shares</div>
              </div>
              {Object.values(checkedSymbols).map((stock) => (
                <div
                  key={stock.symbol}
                  className="grid grid-cols-4 items-center gap-2 p-2 border-b border-gray-700"
                >
                  <div>{stock.symbol}</div>
                  <div>{stock.companyName}</div>
                  <div>${stock.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setLocalShares((prev) => ({
                          ...prev,
                          [stock.symbol]: Math.max((prev[stock.symbol] || 1) - 1, 1),
                        }))
                      }
                      className="px-2 bg-gray-600 rounded text-white"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={localShares[stock.symbol] || 1}
                      onChange={(e) => {
                        const val = Math.max(parseInt(e.target.value) || 1, 1);
                        setLocalShares((prev) => ({
                          ...prev,
                          [stock.symbol]: val,
                        }));
                      }}
                      className="w-12 text-center bg-gray-700 text-white rounded"
                    />
                    <button
                        onClick={() => {
                            const newShares = (localShares[stock.symbol] || 1) + 1;
                            const newTotal = totalPrice + stock.price;

                            if (newTotal <= walletAmount) {
                            setLocalShares((prev) => ({
                                ...prev,
                                [stock.symbol]: newShares,
                            }));
                            }
                        }}
                        className="px-2 bg-gray-600 rounded text-white"
                        >
                        +
                    </button>

                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <div className="flex gap-3 items-center text-white">
                <p>Total price:</p>
                <p>
                  $
                  {Object.values(checkedSymbols)
                    .reduce((sum, stock) => {
                      const shares = localShares[stock.symbol] || 1;
                      return sum + stock.price * shares;
                    }, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => toggleModal(false)}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToList}
                  className="bg-blue-600 px-4 py-2 rounded"
                  disabled={totalPrice > walletAmount}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default BuyStocksModal