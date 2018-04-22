
const request = require("request");

var GetAddress = (geocodeInfo, callback) => {

    var encodedString = encodeURIComponent(geocodeInfo);

    request( {
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`,
    json: true
    },  (error, response, body) => {
    if(error){

        callback("Unable to connect to Google services");

    } else if(body.status === "ZERO_RESULTS"){

        callback("No result available");

    } else if (body.status === "OK"){

        callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longtitude: body.results[0].geometry.location.lng
        });
        

    } else if(body.status === "OVER_QUERY_LIMIT"){

        callback("Currenty we are not able to provide an access");

    } else {
        callback("Something went wrong");
    }

    });

};

module.exports.GetAddress = GetAddress;