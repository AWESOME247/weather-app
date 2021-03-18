const request = require("postman-request");

const geoCoding = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib21veWU2OTk2IiwiYSI6ImNrbHh2d29teDE0bzkydnBsY3FxZWxidXIifQ.6XBNCuM5Nh1u1voCwj7Yhw&limit=1";
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to find Location", undefined)
        } else if (body.features.length <= 0) {
            callback("No match found, Try another search", undefined);
        } else {
            callback(
                undefined, {
                    Location: body.features[0].place_name,
                    Longtitude: body.features[0].center[0],
                    Latitude: body.features[0].center[1]
                },
            )
        }
    });
}


module.exports = geoCoding