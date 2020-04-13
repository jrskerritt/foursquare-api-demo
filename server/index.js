var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var searchVenuesHandler = require('./handlers/searchVenuesHandler');
var app = express();
var port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

// foursquare api proxy
app.get('/api/venues/search', searchVenuesHandler);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
