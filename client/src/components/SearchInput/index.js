import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import fetch from 'unfetch';
import { mapVenues } from '../../utilities/mapVenues';
import { getGeolocation } from '../../utilities/getGeolocation';
import './SearchInput.css';

const searchEndpointUrl = '/api/venues/search';

export function SearchInput({ onSearchComplete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchSearchResults = async (url, term) => {
    setIsSearching(true);
    return fetch(url)
      .then(res => res.json())
      .then(({ response: r }) => r && r.venues ? mapVenues(r.venues) : [])
      .then(venues => onSearchComplete(term, venues))
      .then(() => {
        setIsSearching(false);
        setSearchTerm('');
      });
  };

  const fetchByGeolocation = async () => {
    const latLong = await getGeolocation(navigator).catch(() => {});
    return fetchSearchResults(`${searchEndpointUrl}?ll=${latLong}`, 'your location');
  };

  const fetchBySearchTerm = async () => {
    if (!searchTerm) {
      return;
    }

    return fetchSearchResults(`${searchEndpointUrl}?near=${searchTerm}`, searchTerm);
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      fetchBySearchTerm();
    }
  };

  return (
    <div className="search-input">
      <div className="search-input__form pure-form">
        <div className="search-input__textbox">
          <input
            type="text"
            className="pure-input-1"
            placeholder="Enter a city, address, etc..."
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            onKeyPress={onKeyPress}
          />
        </div>
        <div className="search-input__buttons">
          <button
            className="pure-button pure-button-primary"
            type="button"
            disabled={isSearching}
            onClick={fetchBySearchTerm}
          >
            Search
          </button>
          <button
            className="pure-button"
            type="button"
            disabled={isSearching}
            onClick={fetchByGeolocation}
          >
            Use my location
          </button>
        </div>
      </div>
      <div
        style={isSearching ?
          { opacity: 1, zIndex: 10 } :
          { opacity: 0, zIndex: -1 }}
        className="search-input__loading"
        data-testid="loadingAnimation"
      >
        <div className="search-input__loading-bars">
          <ReactLoading type="bars" color="#eee" height="100px" width="200px" />
        </div>
      </div>
    </div>
  );
};
