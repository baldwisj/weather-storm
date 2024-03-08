const apiKey = 'f8e0d74cfd971b3f0170ddc7c977e7f9';
const searchBox = $('#searchBox');
const searchBtn = $('#searchBtn');
const currentWeatherTitle = $('#currentWeatherTitle');
const todayWeather = $('today-weather');
const todayIcon = $('today-icon');

let cityName;
let latitude;
let longitude;

$(document).ready(function () {
    searchBtn.on("click", function () {
        const cityInput = searchBox.val().trim();
        console.log(cityInput);
        if (cityInput !== "") {
            currentWeatherTitle.text((cityInput)+' Current Weather');
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
                        let todayiconUrl = `https://openweathermap.org/img/wn/${todayIcon}@4x.png`;

                        todayIcon.src = todayiconUrl
                        
                    })
                fetch(fiveDayApi)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data3) {
                        let dayArray = data3.list;
                        console.log(dayArray)
                        // for (i=0; i<dayArray.length; i++){
                        let day1Temp = dayArray[0].main.temp;
                        let day1Wind = dayArray[0].wind.speed;
                        let day1Humid = dayArray[0].main.humidity;
                        let day1Icon = dayArray[0].weather[0].icon;
                        let day1IconUrl = `https://openweathermap.org/img/wn/${day1Icon}@4x.png`;
                        console.log(day1Temp, day1Wind, day1Humid, day1Icon)

                        let day2Temp = dayArray[1].main.temp;
                        let day2Wind = dayArray[1].wind.speed;
                        let day2Humid = dayArray[1].main.humidity;
                        let day2Icon = dayArray[1].weather[0].icon;
                        let day2IconUrl = `https://openweathermap.org/img/wn/${day2Icon}@4x.png`;

                        let day3Temp = dayArray[2].main.temp;
                        let day3Wind = dayArray[2].wind.speed;
                        let day3Humid = dayArray[2].main.humidity;
                        let day3Icon = dayArray[2].weather[0].icon;
                        let day3IconUrl = `https://openweathermap.org/img/wn/${day3Icon}@4x.png`;

                        let day4Temp = dayArray[3].main.temp;
                        let day4Wind = dayArray[3].wind.speed;
                        let day4Humid = dayArray[3].main.humidity;
                        let day4Icon = dayArray[3].weather[0].icon;
                        let day4IconUrl = `https://openweathermap.org/img/wn/${day4Icon}@4x.png`;

                        let day5Temp = dayArray[4].main.temp;
                        let day5Wind = dayArray[4].wind.speed;
                        let day5Humid = dayArray[4].main.humidity;
                        let day5Icon = dayArray[4].weather[0].icon;
                        let day5IconUrl = `https://openweathermap.org/img/wn/${day5Icon}@4x.png`;


                    })
            })
    }


})
