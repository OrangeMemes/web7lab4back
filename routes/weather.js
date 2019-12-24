var express = require('express');
var router = express.Router();
const axios = require('axios');

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const appId = process.env.WEATHER_APP_ID;

let cityQuery = (city) => ({
  units: "metric",
  appId,
  q: city
});

let coordQuery = (lat, lon) => ({
  units: "metric",
  appId, lat, lon
});

router.get('/', function(req, res, next) {
  const city = req.query.city;
  if (!city){
    res.status(400).send('city is required')
    return;
  }

  axios.get(apiUrl, { params: cityQuery(city), timeout:  20000, validateStatus: () => true })
      .then(value => res.status(value.status).send(value.data))
      .catch(reason => res.status(500).send(reason));
});

router.get('/coordinates', function(req, res, next) {
  const lat = req.query.lat;
  const long = req.query.long;
  if (!lat || !long){
    res.status(400).send('lat and long are required')
    return;
  }

  axios.get(apiUrl, { params: coordQuery(lat, long), timeout:  20000, validateStatus: () => true })
      .then(value => res.status(value.status).send(value.data))
      .catch(reason => res.status(500).send(reason));
});


module.exports = router;
