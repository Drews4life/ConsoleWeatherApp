const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
    .options({
       a: {
           describe: "Add an address",
           alias: "address",
           demand: true,
           string: true
       } 
    })
    .help()
    .alias("help", "h")
    .argv;

var encodedString = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`;

axios.get(geocodeURL).then((response) => {
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error("No result available");
    }

    if(response.data.status === "OK"){
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

        console.log(JSON.stringify(response.data.results[0].formatted_address, undefined, 2));
        console.log(`GPS details: ${lat}, ${lng}`);

        var weatherURL = `https://api.darksky.net/forecast/2bd43d6e7855c405578d6ed0ab65d394/${lat},${lng}`
        
        return axios.get(weatherURL)

    }
}).then((response)=>{
    var temperature = ((response.data.currently.temperature - 32) * 5/9).toFixed();
    var apparentTemperature = ((response.data.currently.apparentTemperature - 32) * 5/9).toFixed();

    console.log(`\nTemperature is: ${temperature},\nBut it feels like ${apparentTemperature} degrees celsius`);
    
}).catch((e)=>{
    if(e.code === "ENOTFOUND"){
        console.log("Not able to connect to the server");
    } else{
        console.log("No result available");
    }
});

