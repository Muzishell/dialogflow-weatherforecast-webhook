const admin = require('firebase-admin');

admin.initializeApp();

const functions = require('firebase-functions');

const callWeatherApi = require('./src/forecastApi');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // Get the city and date from the request
  const city = req.body.queryResult.parameters['geo-city']; // city is a required param

  // Get the date for the weather forecast (if present)
  let date = '';
  if (req.body.queryResult.parameters.date) {
    ({ date } = req.body.queryResult.parameters);
  }

  // Call the weather API
  callWeatherApi(city, date).then((output) => {
    res.json({ fulfillmentText: output });
    return output;
  }).catch(() => {
    res.json({ fulfillmentText: 'I don\'t know the weather but I hope it\'s good!' });
  });
});
