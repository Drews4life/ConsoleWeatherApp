const request = require("request");

var geocodeAddress = (address) => {
return new Promise((resolve, reject) => {
        var encodedString = encodeURIComponent(address);

        request( {
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`,
        json: true
        },  (error, response, body) => {
        if(error){

            reject("Unable to connect to Google services");

        } else if(body.status === "ZERO_RESULTS"){

            reject("No result available");

        } else if (body.status === "OK"){

            resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longtitude: body.results[0].geometry.location.lng
            });
            

        } else if(body.status === "OVER_QUERY_LIMIT"){

            reject("Currenty we are not able to provide an access");

        } else {
            reject("Something went wrong");
        }

        });
    });
};


geocodeAddress("19145").then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
}, (errorMsg) => {
    console.log(errorMsg);
});