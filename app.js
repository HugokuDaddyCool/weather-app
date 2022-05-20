const request = require('request');

const options = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB9Y6v3kDwR2HCS7f3WLiXOHBuyAMY-7Cg&address=tolteca%20927%20unidad%20modelo%20monterrey',
    json: true
}

request(options,(error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
})