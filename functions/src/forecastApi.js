const http = require('http');

const host = 'api.worldweatheronline.com';
const wwoApiKey = '4609318e096144a6900162848181310';

function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    const path = `/premium/v1/weather.ashx?format=json&num_of_days=1&q=${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;

    // Make the HTTP request to get the weather
    http.get({ host, path }, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        const response = JSON.parse(body);

        if (response.data.error) {
          reject(new Error(response.data.error));
          return;
        }

        const forecast = response.data.weather[0];
        const location = response.data.request[0];
        const conditions = response.data.current_condition[0];
        const currentConditions = conditions.weatherDesc[0].value;

        // Create response
        const output = `Current conditions in the ${location.type}
        ${location.query} are ${currentConditions} with a projected high of
        ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of
        ${forecast.mintempC}°C or ${forecast.mintempF}°F on
        ${forecast.date}.`;

        // Resolve the promise with the output text
        resolve(output);
      });
      // I removed the res.on('error') because i couldn't find a way to trigger it. My bad
    });
  });
}

module.exports = callWeatherApi;
