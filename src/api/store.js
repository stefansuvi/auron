import { configureStore } from '@reduxjs/toolkit';
import { stockApi } from '../api/stockApi';
import userStocksReducer from '../api/slices/userStocksSlice'

export const store = configureStore({
  reducer: {
    [stockApi.reducerPath]: stockApi.reducer,
    userStocks: userStocksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stockApi.middleware),
});
