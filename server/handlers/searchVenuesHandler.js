var foursquareApi = require('../api/foursquare');

function searchVenuesHandler(req, res, next) {
  var { near, ll } = req.query;
  var apiRequest;

  if (near) {
    apiRequest = foursquareApi.searchVenuesNear(near);
  } else if (ll) {
    apiRequest = foursquareApi.searchVenuesByLatLong(ll);
  } else {
    res.sendStatus(400);
    return;
  }

  apiRequest
    .then(function (data) {
      res.json(data);
      res.end();
    })
    .catch(function (e) {
      console.log(e);
      res.sendStatus(500)
    });
};

module.exports = searchVenuesHandler;
