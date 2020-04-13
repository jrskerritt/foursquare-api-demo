var fetch = require('isomorphic-unfetch');
var queryString = require('query-string');
var config = require('../config');
var foursquareApiUrl = 'https://api.foursquare.com/v2';

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
// https://developer.foursquare.com/docs/api-reference/venues/search/

function searchVenues (params) {
  var endpoint = foursquareApiUrl + '/venues/search?';
  endpoint += queryString.stringify(Object.assign(
    {
      'client_id': config.foursquareClientId,
      'client_secret': config.foursquareClientSecret,
      'v': '20200409'
    },
    params
  ));

  return fetch(endpoint)
    .then(function (r) { return r.json(); });
};

module.exports = {
  searchVenuesNear: function (locationString) {
    return searchVenues({ near: locationString });
  },
  searchVenuesByLatLong: function (ll) {
    return searchVenues({ ll });
  }
}
