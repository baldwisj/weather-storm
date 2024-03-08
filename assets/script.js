const apiKey = 'f8e0d74cfd971b3f0170ddc7c977e7f9';
const searchBox = $('#searchBox');
const searchBtn = $('#searchBtn');

let cityName;
let latitude;
let longitude;

$(document).ready(function () {
    searchBtn.on("click", function () {
        const cityInput = searchBox.val().trim();
        console.log(cityInput);
        if (cityInput !== "") {
            localStorage.setItem("history", JSON.stringify(cityInput));
            getWeather();
        }

    })



    function getWeather() {
        let city = searchBox.val().trim();
        const weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;



        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let cityData = data;
                latitude = cityData[0].lat
                longitude = cityData[0].lon
                cityName = cityData[0].name
                const todayWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
                const fiveDayApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

                fetch(todayWeatherApi)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data2) {
                        let todayTemp = data2.main.temp;
                        let todayWind = data2.wind.speed;
                        let todayHumid = data2.main.humidity;
                        let todayIcon = data2.weather[0].icon;
                        let iconUrl = `https://openweathermap.org/img/wn/${todayIcon}@4x.png`;

                    })
                fetch(fiveDayApi)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data3) {
                        let dayArray = data3.list;
                        let day1 = dayArray[0];
                        let day2 = dayArray[1];
                        let day3 = dayArray[2];
                        let day4 = dayArray[3];
                        let day5 = dayArray[4];
                        console.log(dayArray, day1)

                    })
            })
    }


})
