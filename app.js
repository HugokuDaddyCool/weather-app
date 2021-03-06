const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const yargs = require('yargs');

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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.longitude, results.latitude, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${results.temperature}° but if feels like ${results.apparent_temperature}°`);
            }
        })
    }
});