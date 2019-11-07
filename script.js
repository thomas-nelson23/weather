const apiKey = '&APPID=' + '';
const apiUrl = 'api.openweathermap.org/data/2.5/weather?';


let myLocation = 'q=' + 'nashville';
let unitType = 'imperial';
let units = '&units=' + unitType;
let weatherData;

let apiPath = `https://api.openweathermap.org/data/2.5/weather?${myLocation}&APPID=692e2c4d733e53ebf24ab4b2f4e87f5f&units=imperial`;

const weatherDiv = document.querySelector('.weather');



function fetchWeather() {
    let enteredCity = document.getElementById('myCityId').value;



};


fetch(apiPath)
    .then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (json) {

        var myTemp = json.main.temp;
        var cityName = json.name;
        var myDescription = json.weather[0].description
        var myMain = json.weather[0].main;

        var sunrise = json.sys.sunrise;
        var sunset = json.sys.sunset;

        var sunriseDate = new Date(sunrise * 1000)
        var sunriseHour = sunriseDate.getHours();
        var sunriseMinutes = "0" + sunriseDate.getMinutes();
        var formattedSunrise = sunriseHour + ':' + sunriseMinutes.substr(-2);

        var sunsetDate = new Date(sunset * 1000)
        var sunsetHour = sunsetDate.getHours() - 12;
        var sunsetMinutes = "0" + sunsetDate.getMinutes();
        var formattedSunset = sunsetHour + ':' + sunsetMinutes.substr(-2);


        console.log('Sunrise: ' + formattedSunrise + ' AM')
        console.log('Sunset: ' + formattedSunset + ' PM')

        weatherDiv.innerHTML = `<h1>Hello people of ${cityName}!</h1> <p>Current temperature is ${myTemp} with ${myDescription}.</p> <p>The sun will rise at ${formattedSunrise} AM and set at ${formattedSunset} PM.</p> `

    }).catch(function (ex) {
        console.log('parsing failed', ex);
    });

console.log(weatherData)