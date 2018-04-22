const request = require("request");

var GetWeather = (lat, lng, callback) => {

    request( {
        url: `https://api.darksky.net/forecast/2bd43d6e7855c405578d6ed0ab65d394/${lat},${lng}`,
        json: true
        },  (error, response, body) => {
            if(error) {
                callback("unable to get weather");
            } else if (body.error === "The given location is invalid."){
                callback("Weather for this location or location doesnt exist");
            } else if (body.error === "The given location (or time) is invalid.") {
                callback("Weather for this location or location doesnt exist");
            } else {
                callback(undefined, {
                    temperature: ((body.currently.temperature - 32) * 5/9).toFixed(),
                    apparentTemperature: ((body.currently.apparentTemperature - 32) * 5/9).toFixed()
                });
            }
        });
    
};



module.exports.GetWeather = GetWeather;