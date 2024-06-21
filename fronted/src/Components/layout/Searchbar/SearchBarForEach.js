

import React, { useState } from 'react'

export const SearchBarForEach = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
    <input 
      type="text" 
      value={query} 
      onChange={handleInputChange} 
      placeholder="Search expenses..." 
    />
    <button onClick={handleSearch}>Search</button>
  </div>
);
};

