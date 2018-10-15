const { expect } = require('chai');

const callWeatherApi = require('../src/forecastApi');

describe('index file', () => {
  describe('weatherForecast', () => {
    describe('When there is a valid request', () => {
      let result;

      before(async () => {
        result = await callWeatherApi('Paris', '');
      });
      it('Returns the correct data', () => {
        expect(result).to.be.a('string');
      });
    });

    describe('When there is no parameters', () => {
      let error;

      before(async () => {
        try {
          await callWeatherApi('Petaouchnok', '');
        } catch (err) {
          error = err;
        }
      });
      it('Returns the correct data', () => {
        expect(error).to.be.instanceOf(Error);
      });
    });
  });
});
