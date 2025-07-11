import React, { useState, useMemo, useEffect } from 'react';
import StockRow from '../components/StockRows';
import SearchStock from '../components/SearchStock';
import { useGetAllSymbolsQuery } from '../api/stockApi';
import { useSelector } from 'react-redux';
import BuyStocksModal from '../components/modals/BuyStocksModal';

const Stocks = () => {
  const { data, isLoading } = useGetAllSymbolsQuery();
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const checkedSymbols = useSelector((state) => state.userStocks.selectedSymbols);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchText) return data;
    const lowerSearch = searchText.toLowerCase();
    return data.filter(item =>
      item.companyName.toLowerCase().includes(lowerSearch)
    );
  }, [data, searchText]);

  const toggleModal = (modalStatus) => {
    setShowModal(modalStatus)
  }

  return (
    <div className="relative">
      {Object.keys(checkedSymbols).length > 0 && (
        <div
          className="bg-green-500 rounded-md p-3 absolute right-8 top-0 cursor-pointer"
          onClick={() => toggleModal(true)}
        >
          <p>Add To List</p>
        </div>
      )}
      <SearchStock searchText={searchText} setSearchText={setSearchText} />
      <StockRow data={filteredData} isLoading={isLoading} />
      {showModal && (
        <BuyStocksModal checkedSymbols={checkedSymbols} toggleModal={toggleModal} showModal={showModal}/>
      )}
    </div>
  );
};

export default Stocks;
