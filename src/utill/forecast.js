const request = require('postman-request');

const forecast = (Latitude, Longtitude, callback) => {
    url = "http://api.weatherstack.com/current?access_key=0244d6f15e0b3a46bf69e875a156b715&query=" + encodeURIComponent(Latitude) + "," + encodeURIComponent(Longtitude) + "&unit=f";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Weather Location', undefined)
        } else if (body.error) {
            callback('Unable to find Weather location', undefined)
        } else {
            callback(undefined,
                `Location ${body.location.country}, ${body.location.region} is (${body.current.weather_descriptions}) temperature is  (${body.current.temperature})degree but feel's like (${body.current.feelslike})degree`
            )
        }
    })
}

module.exports = forecast;