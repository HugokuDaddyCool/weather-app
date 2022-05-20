const API_KEY = 'AIzaSyB9Y6v3kDwR2HCS7f3WLiXOHBuyAMY-7Cg';

const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    const options = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${encodedAddress}`,
        json: true
    }    
    request(options,(error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Address not found.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
}