const request = require('request');
const API_KEY = 'AIzaSyB9Y6v3kDwR2HCS7f3WLiXOHBuyAMY-7Cg';

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        const options = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${encodedAddress}`,
            json: true
        }
        request(options,(error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Address not found.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });            }
            })
    });
}

geocodeAddress('00000').then((location) => {
    console.log(JSON.stringify(location, undefined, 3));
}, (errorMessage) => {
    console.log(errorMessage);
});