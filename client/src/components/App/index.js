import React, { useState } from 'react';
import { SearchInput } from '../SearchInput';
import { SearchResults } from '../SearchResults';
import './App.css';

export function App() {
  const [lastSearchTerm, setlastSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const onSearchComplete = (searchTerm, results) => {
    setlastSearchTerm(searchTerm);
    setSearchResults(results);
  };

  return (
    <div className="app">
      <h1>Search for Venues</h1>
      <SearchInput onSearchComplete={onSearchComplete} />
      {lastSearchTerm && (
        <SearchResults
          searchTerm={lastSearchTerm}
          venues={searchResults}
        />
      )}
    </div>
  );
}
