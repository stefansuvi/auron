import React from 'react';

const SearchStock = ({ searchText, setSearchText }) => {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search by company name..."
        className="w-[70%] p-2 border-2 border-gray-700 rounded-3xl bg-black"
      />
    </div>
  );
};

export default SearchStock;
