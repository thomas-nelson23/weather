const weatherDiv = document.querySelector('.weather');

function fetchForecast() {

    var apiVariable = 'https://api.openweathermap.org/data/2.5/forecast?'
    let enteredCity = document.getElementById('myCityId').value;
    let enteredZip = document.getElementById('zipInput').value;
    let myLocation = `q=${enteredCity}`;
    const apiKey = '&APPID=' + '692e2c4d733e53ebf24ab4b2f4e87f5f';
    let unitType = 'imperial';
    let units = '&units=' + unitType;
    let apiPath = `${apiVariable}${myLocation}${apiKey}${units}`;
    let forecastDiv = document.getElementById('forecast');

    let forecastHead = document.getElementById('forecastHeader');

    let day1 = document.getElementById('day1');
    let day2 = document.getElementById('day2');
    let day3 = document.getElementById('day3');
    let day4 = document.getElementById('day4');
    let day5 = document.getElementById('day5');

    let days = document.getElementById('day5');

    let day1head, day2head, day3head, day4head, day5head;


    if (enteredCity == "") {
        myLocation = `zip=${enteredZip}`;
        apiPath = `${apiVariable}${myLocation}${apiKey}${units}`;
        console.log('myLocation' + myLocation)
    }


    fetch(apiPath)
        .then(function (response) {
            return response.json();

        }).then(function (json) {
            console.log("parsed forecase", json);
            day1.innerHTML = `<h1 id="day1head"></h1>`;
            day2.innerHTML = `<h1 id="day2head"></h1>`;
            day3.innerHTML = `<h1 id="day3head"></h1>`;
            day4.innerHTML = `<h1 id="day4head"></h1>`;
            day5.innerHTML = `<h1 id="day5head"></h1>`;

            day1head = document.getElementById('day1head');
            day2head = document.getElementById('day2head');
            day3head = document.getElementById('day3head');
            day4head = document.getElementById('day4head');
            day5head = document.getElementById('day5head');

            let forecast = json.list;
            let cityName = json.city.name;
            let date, time;

            forecastHead.innerHTML = `<h1>${cityName} Forecast</h1>`;

            for (forecastPeriod = 1; forecastPeriod < forecast.length; forecastPeriod++) {

                time = forecast[forecastPeriod].dt_txt.slice(10)
                date = forecast[forecastPeriod].dt_txt.slice(0, 10)

                let drawCell = `
                <h3>${time}</h3>
                <p>Temperature: ${forecast[forecastPeriod].main.temp}</p>
                <p>Humidity: ${forecast[forecastPeriod].main.humidity}</p>
                <p>${forecast[forecastPeriod].weather[0].description}</p><hr>`

                if (forecastPeriod < 9) {
                    day1head.innerText = date;
                    day1.innerHTML += drawCell
                } else if (forecastPeriod > 8 && forecastPeriod < 17) {
                    day2head.innerText = date;
                    day2.innerHTML += drawCell
                } else if (forecastPeriod > 16 && forecastPeriod < 25) {
                    day3head.innerText = date;
                    day3.innerHTML += drawCell
                } else if (forecastPeriod > 24 && forecastPeriod < 33) {
                    day4head.innerText = date;
                    day4.innerHTML += drawCell
                } else if (forecastPeriod > 32) {
                    day5head.innerText = date;
                    day5.innerHTML += drawCell
                }
            }
        }).catch(function (ex) {
            console.log("parsing error", (ex))
        })
}

function fetchWeather() {
    console.log('hello')
    const apiKey = '&APPID=' + '692e2c4d733e53ebf24ab4b2f4e87f5f';
    const apiUrl = 'api.openweathermap.org/data/2.5/weather?';
    let enteredCity = document.getElementById('myCityId').value;
    let enteredZip = document.getElementById('zipInput').value;
    let myLocation = 'q=' + 'nashville';
    let unitType = 'imperial';
    let units = '&units=' + unitType;
    let weatherData;

    myLocation = 'q=' + enteredCity;

    if (enteredCity == "") {
        myLocation = `zip=${enteredZip}`;
    }

    let apiPath = `https://api.openweathermap.org/data/2.5/weather?${myLocation}${apiKey}${units}`;

    fetch(apiPath)
        .then(function (response) {
            console.log(response)
            return response.json();

        }).then(function (json) {

            console.log(json)

            var myTemp = json.main.temp.toFixed();
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

            weatherDiv.innerHTML = `<h1>Hello people of ${cityName}!</h1> <p>Current temperature is ${myTemp} degrees with ${myDescription}.</p> <p>The sun will rise at ${formattedSunrise} AM and set at ${formattedSunset} PM.</p> `

        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    console.log(weatherData)
};