const API_KEY = 'd018d03cc88d4ddc828cdd56df08019e';

const request = require('request');

var getWeather = (lon, lat, callback) => {
    const options = {
        url: `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`,
        json: true
    }
    request(options, (error, response, body) => {
        if (error) {
            callback(error);
        } else if (body.error) {
            callback(body.error);
        } else {
            callback(undefined, {
                temperature: body.data[0].temp,
                apparent_temperature: body.data[0].app_temp
            })
        }
    });    
}

module.exports = {
    getWeather
}
