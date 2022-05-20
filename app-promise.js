const yargs = require('yargs');
const axios = require('axios');

const API_KEY = 'AIzaSyB9Y6v3kDwR2HCS7f3WLiXOHBuyAMY-7Cg';

const argv = yargs
    .options({
        a: {
            demand:true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a);

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    const W_API_KEY = 'd018d03cc88d4ddc828cdd56df08019e';
    const weatherUrl = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${W_API_KEY}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    if (response.data.error) {
        throw new Error(response.data.error);
    }
    console.log(`It's currently ${response.data.data[0].temp}° but if feels like ${response.data.data[0].app_temp}°`);
}).catch((e) => {
    console.log(e.message);
});