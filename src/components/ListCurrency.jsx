import React, { useEffect, useState } from 'react';
import './ListCurrency.css';

const ListCurrency = () => {
  const [rates2024, setRates2024] = useState([]);
  const [rates2023, setRates2023] = useState([]);
  const [activeYear, setActiveYear] = useState(2024); // Default to 2024
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order state ('asc' or 'desc')
  const [selectedContinent, setSelectedContinent] = useState(''); // Filter by continent

  // Hardcoded exchange rates for demonstration (converted to EUR)
  const ratesData = {
    "USD": { currency: 'USD', rate: 1.1, continent: "North America" },
    "CAD": { currency: 'CAD', rate: 1.5, continent: "North America" },
    "EUR": { currency: 'EUR', rate: 1.0, continent: "Europe" },
    "TND": { currency: 'TND', rate: 3.3, continent: "Africa" },
    "MAD": { currency: 'MAD', rate: 11.0, continent: "Africa" },
    "EGP": { currency: 'EGP', rate: 30.0, continent: "Africa" },
    "GBP": { currency: 'GBP', rate: 0.85, continent: "Europe" },
    "JPY": { currency: 'JPY', rate: 140.0, continent: "Asia" },
    "AUD": { currency: 'AUD', rate: 1.4, continent: "Oceania" },
    "CHF": { currency: 'CHF', rate: 1.0, continent: "Europe" },
    "INR": { currency: 'INR', rate: 90.0, continent: "Asia" },
    "BRL": { currency: 'BRL', rate: 5.5, continent: "South America" },
    "RUB": { currency: 'RUB', rate: 75.0, continent: "Europe/Asia" },
    "TRY": { currency: 'TRY', rate: 25.0, continent: "Asia" },
    "ZAR": { currency: 'ZAR', rate: 18.0, continent: "Africa" },
    "MXN": { currency: 'MXN', rate: 20.0, continent: "North America" },
    "NZD": { currency: 'NZD', rate: 1.6, continent: "Oceania" },
    "SGD": { currency: 'SGD', rate: 1.4, continent: "Asia" },
    "HKD": { currency: 'HKD', rate: 8.5, continent: "Asia" }
  };

  const rates2023Data = {
    "USD": { currency: 'USD', rate: 1.05, continent: "North America" },
    "TND": { currency: 'TND', rate: 3.2, continent: "Africa" },
    "LYD": { currency: 'LYD', rate: 4.8, continent: "Africa" },
    "MAD": { currency: 'MAD', rate: 10.8, continent: "Africa" },
    "EGP": { currency: 'EGP', rate: 28.5, continent: "Africa" },
    "CAD": { currency: 'CAD', rate: 1.4, continent: "North America" },
    "GBP": { currency: 'GBP', rate: 0.82, continent: "Europe" },
    "JPY": { currency: 'JPY', rate: 135.0, continent: "Asia" },
    "AUD": { currency: 'AUD', rate: 1.35, continent: "Oceania" },
    "CHF": { currency: 'CHF', rate: 0.95, continent: "Europe" },
    "INR": { currency: 'INR', rate: 88.0, continent: "Asia" },
    "BRL": { currency: 'BRL', rate: 5.2, continent: "South America" },
    "RUB": { currency: 'RUB', rate: 72.0, continent: "Europe/Asia" },
    "TRY": { currency: 'TRY', rate: 24.0, continent: "Asia" },
    "ZAR": { currency: 'ZAR', rate: 17.5, continent: "Africa" },
    "MXN": { currency: 'MXN', rate: 19.5, continent: "North America" },
    "NZD": { currency: 'NZD', rate: 1.55, continent: "Oceania" },
    "SGD": { currency: 'SGD', rate: 1.35, continent: "Asia" },
    "HKD": { currency: 'HKD', rate: 8.2, continent: "Asia" }
  };

  useEffect(() => {
    // Set hardcoded rates on component mount
    setRates2024(Object.values(ratesData)); // Convert object to array of rates
    setRates2023(Object.values(rates2023Data)); // For 2023 data
  }, []);

  // Extract unique continents from the rates data for the dropdown
  const uniqueContinents = [
    ...new Set(
      [...Object.values(ratesData), ...Object.values(rates2023Data)].map((rate) => rate.continent)
    ),
  ];

  const handleYearChange = (year) => {
    setActiveYear(year);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  // Filter and sort rates based on active year, selected continent, and sort order
  const filteredRates = (activeYear === 2024 ? rates2024 : rates2023)
    .filter((rate) => selectedContinent === '' || rate.continent === selectedContinent)
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate;
    });

  return (
    <div className="list-currency-app">
      <h1 className="list-currency-title">Taux de Change par rapport à l'Euro</h1>

          <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <div className="year-selector">
        <button
          className={`year-button ${activeYear === 2024 ? 'active' : ''}`}
          onClick={() => handleYearChange(2024)}
        >
          2024
        </button>
        <button
          className={`year-button ${activeYear === 2023 ? 'active' : ''}`}
          onClick={() => handleYearChange(2023)}
        >
          2023
        </button>
      </div>

          <div className="filter-section">
              <div style={{ display: 'flex', flexDirection: 'column',alignItems:'flex-start',gap:'10px'}}>
        <label htmlFor="continent-filter">Filtrer par Continent:</label>
        <select
          id="continent-filter"
          value={selectedContinent}
          onChange={handleContinentChange}
        >
          <option value="">Tous les Continents</option>
          {uniqueContinents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </select>
</div>
      <button className="sort-button" onClick={handleSortChange}>
        Trier par Taux de Change ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
      </button>
              </div>
              </div>

      <h2 className="list-currency-subtitle">Taux de Change en {activeYear}</h2>
      <table className="list-currency-table">
        <thead className="list-currency-thead">
          <tr className="list-currency-row">
            <th className="list-currency-header">Devise</th>
            <th className="list-currency-header">Taux de Change</th>
            <th className="list-currency-header">Continent</th>
          </tr>
        </thead>
        <tbody className="list-currency-tbody">
          {filteredRates.map((rate, index) => (
            <tr key={index} className="list-currency-row">
              <td className="list-currency-cell">{rate.currency}</td>
              <td className="list-currency-cell">{rate.rate}</td>
              <td className="list-currency-cell">{rate.continent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCurrency;
