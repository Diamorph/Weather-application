const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=87a4fa439a90f0619dc120e8ed2f4201&query=${latitude},${longitude}&units=m`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Weather service!', undefined);
        } else {
            if (body.error) {
                callback(body.error.info, undefined);
            } else {
                callback(undefined, `${body.current.weather_descriptions[0]}. Temperature: ${body.current.temperature}, feels like ${body.current.feelslike}. Wind speed: ${body.current.wind_speed}. Humidity: ${body.current.humidity}.`);
            }
        }
    });
}

module.exports = forecast
