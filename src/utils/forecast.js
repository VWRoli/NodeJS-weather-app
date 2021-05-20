const request = require("request");

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b10c5083f708da4d93eb7717ddbc3d99&query=${lat},${lng}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temp = response.body.current.temperature;
      const feels = response.body.current.feelslike;
      const desc = response.body.current.weather_descriptions[0];
      const humidity = response.body.current.humidity;
      callback(
        undefined,
        `${desc}. It is currently ${temp} degrees out. It feels like ${feels} degrees out. 
        The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
