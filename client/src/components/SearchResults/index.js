import React from 'react';
import PropTypes from 'prop-types';
import { Venue } from '../Venue';
import './SearchResults.css';

export function SearchResults({ searchTerm, venues }) {
  return (
    <div className="search-results">
      {venues.length > 0 ?
        <>
          <h2>Venues near {searchTerm}:</h2>
          <div className="search-results__venues">
            {venues.map(v => <Venue key={v.id} {...v} />)}
          </div>
        </>:
        <div className="search-results__empty">
          Looks like we couldn't find anything for that location...
        </div>
      }
    </div>
  );
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string,
  venues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string
    })
  }))
};

SearchResults.defaultProps = {
  venues: []
};
