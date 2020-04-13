import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Venue.css';

export function Venue({ name, address, category }) {
  return (
    <div className="venue">
      <div className="venue__icon">
        <LazyLoadImage
          alt={category.name}
          height={32}
          src={category.icon}
          width={32}
        />
      </div>
      <div className="venue__details">
        <div className="venue__name">{name}</div>
        <div className="venue__address">{address}</div>
      </div>
    </div>
  );
}

Venue.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string
  })
};
