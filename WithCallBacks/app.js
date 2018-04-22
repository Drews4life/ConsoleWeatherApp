const yargs = require("yargs");

const geocode = require("./geocode.js");

const weather = require("./weather.js");

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


geocode.GetAddress(argv.a, (errorMsg, result) => {
    if(errorMsg){
        console.log(errorMsg);
    } else if(result){
        console.log(`\n${result.address}\nLatitude: ${result.latitude},\nLongtitude: ${result.longtitude}`);

        weather.GetWeather(result.latitude,result.longtitude, (errorMsg, weatherResult) => {
            if(errorMsg){
                console.log(errorMsg);
            } else if (result){
                console.log(`\nCurrent temperature is ${weatherResult.temperature} degrees celsius.\nHowever, it feels like ${weatherResult.apparentTemperature} degrees celsius.`);
            }
        });
    }
});

