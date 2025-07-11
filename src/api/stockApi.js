import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'UJTyWOdKQ6R7X8B87XWk5JeLFgL37d6w';

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://financialmodelingprep.com/api/v3/' }),
  endpoints: (builder) => ({
    getStockQuote: builder.query({
      query: (symbol) => `quote?symbol=${symbol}&token=${API_KEY}`,
    }),
    getAllSymbols: builder.query({
      query: () => `stock-screener?limit=500&apikey=${API_KEY}`,
    }),
    getHistoricalChart: builder.query({
      query: (symbol) => `historical-price-full/${symbol}?apikey=${API_KEY}`,
    }),
  }),
});

export const {
  useGetStockQuoteQuery,
  useGetAllSymbolsQuery,
  useGetHistoricalChartQuery,
  useLazyGetHistoricalChartQuery,
} = stockApi;
