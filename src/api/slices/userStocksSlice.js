import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const userStocksSlice = createSlice({
  name: 'userStocks',
  initialState: {
    selectedSymbols: [],
    userStocks: [],
    portfolios: [],
    walletAmount: 10000,
  },
  reducers: {
    setSelectedSymbols: (state, action) => {
      const { symbol, item, replaceAll = false } = action.payload;
      if (replaceAll) {
        state.selectedSymbols = {
          [symbol]: item,
        };
      } else {
        state.selectedSymbols = {
          ...state.selectedSymbols,
          [symbol]: state.selectedSymbols[symbol] ? undefined : item,
        };
      }
    },
    addMultipleStocks: (state, action) => {
      const total = action.payload.reduce((sum, stock) => sum + stock.price * stock.shares, 0);
    
      if (state.walletAmount >= total) {
        state.userStocks.push(...action.payload);
        state.walletAmount -= total;
        state.selectedSymbols = {};
      } else {
        console.warn('Not enough funds to complete purchase.');
      }
    },    
    createPortfolio: (state, action) => {
      const { name, stocks } = action.payload;
      const newPortfolio = {
        id: uuidv4(),
        name,
        createdAt: new Date().toISOString(),
        stocks,
      };
      state.portfolios.push(newPortfolio);
    },
    updateWalletAmount: (state, action) => {
      console.log(action.payload)
      console.log(state.walletAmount)
      const amount = action.payload;
      state.walletAmount += amount;
    }
  },
});

export const { setSelectedSymbols, addMultipleStocks, createPortfolio, updateWalletAmount } = userStocksSlice.actions;
export default userStocksSlice.reducer;