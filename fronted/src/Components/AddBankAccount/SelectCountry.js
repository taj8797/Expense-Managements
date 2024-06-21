
// CountrySelect.js
import React, { useState, useEffect } from 'react';
// import Select from 'your-select-component-library'; // Import your select component library here
import Select from 'react-select';


export const SelectCountry = ({onSelectCountry}) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);


  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    onSelectCountry(selectedOption);
  };

  return (
    <Select
      options={countries}
      value={selectedCountry}
        onChange={handleChange}
    />
  );
};

