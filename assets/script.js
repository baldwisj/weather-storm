const apiKey = 'f8e0d74cfd971b3f0170ddc7c977e7f9';
const searchBox = $('#searchBox');
const searchBtn = $('#searchBtn');
const currentWeatherTitle = $('#currentWeatherTitle');
const todayWeather = $('#today-weather');
const searchHistory = $('#search-history');

let cityName;
let latitude;
let longitude;

$(document).ready(function () {
    renderSearchHistory(); // Render search history on page load

    searchBtn.on("click", function () {
        const cityInput = searchBox.val().trim();

        if (cityInput !== "") {
            let history = getSearchHistory();
            
            if (!history.includes(cityInput)) {
                history.push(cityInput);
                localStorage.setItem("history", JSON.stringify(history));
                
                renderSearchHistory(); // Update search history display after adding a new city
            }

            getWeather(cityInput);
        }
    });

    function renderSearchHistory() {
        searchHistory.empty(); // Clear existing search history display

        let history = getSearchHistory();
        history.forEach(function (item) {
            const btnEl = $('<button>').text(item);
            searchHistory.append(btnEl);
            btnEl.attr('class','histBtn')

            btnEl.on("click", function () {
                const selectedCity = $(this).text().trim();
                getWeather(selectedCity);
            });
        });
    }

    function getSearchHistory() {
        let allHistory = localStorage.getItem('history');
        return allHistory ? JSON.parse(allHistory) : [];
    }
});




    function getWeather(city) {
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
                        let currentDatedt = data2.dt;
                        let todayIcon = data2.weather[0].icon;

                        let todayiconUrl = `https://openweathermap.org/img/wn/${todayIcon}@4x.png`;

                        let currentDate = new Date(currentDatedt * 1000);
                        let todayDate = currentDate.toLocaleDateString("en-US");
                        const cityInput = searchBox.val().trim();

                        currentWeatherTitle.text((cityInput) + ' ' + (todayDate));
                        $('#current-icon').attr('src', todayiconUrl);
                        $('#currentTemp').text('Current Temperature: ' + (Math.round(todayTemp)) + '°F');
                        $('#currentWind').text('Wind Speed: ' + (Math.round(todayWind)) + ' mph');
                        $('#currentHumid').text('Humidity: ' + (Math.round(todayHumid)) + '%');


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
                        let day1Datedt = dayArray[0].dt;
                        let day1Icon = dayArray[0].weather[0].icon;
                        let day1IconUrl = `https://openweathermap.org/img/wn/${day1Icon}@4x.png`;
                        console.log(day1Temp, day1Wind, day1Humid, day1Icon)

                        let day1RawDate = new Date(day1Datedt * 1000);
                        let day1Date = day1RawDate.toLocaleDateString("en-US");

                        $('#day1Title').text(day1Date);
                        $('#day1-icon').attr('src', day1IconUrl);
                        $('#day1Temp').text('Current Temperature: ' + (Math.round(day1Temp)) + '°F');
                        $('#day1Wind').text('Wind Speed: ' + (Math.round(day1Wind)) + ' mph');
                        $('#day1Humid').text('Humidity: ' + (Math.round(day1Humid)) + '%');
                        console.log(dayArray[0].dt, day1Date)



                        let day2Temp = dayArray[1].main.temp;
                        let day2Wind = dayArray[1].wind.speed;
                        let day2Humid = dayArray[1].main.humidity;
                        let day2Datedt = dayArray[1].dt;
                        let day2Icon = dayArray[1].weather[0].icon;
                        let day2IconUrl = `https://openweathermap.org/img/wn/${day2Icon}@4x.png`;

                        let day2RawDate = new Date(day2Datedt * 1000);
                        let day2Date = day2RawDate.toLocaleDateString("en-US");

                        $('#day2Title').text(day2Date);
                        $('#day2-icon').attr('src', day2IconUrl);
                        $('#day2Temp').text('Current Temperature: ' + (Math.round(day2Temp)) + '°F');
                        $('#day2Wind').text('Wind Speed: ' + (Math.round(day2Wind)) + ' mph');
                        $('#day2Humid').text('Humidity: ' + (Math.round(day2Humid)) + '%');

                        let day3Temp = dayArray[2].main.temp;
                        let day3Wind = dayArray[2].wind.speed;
                        let day3Humid = dayArray[2].main.humidity;
                        let day3Datedt = dayArray[2].dt;
                        let day3Icon = dayArray[2].weather[0].icon;
                        let day3IconUrl = `https://openweathermap.org/img/wn/${day3Icon}@4x.png`;

                        let day3RawDate = new Date(day3Datedt * 1000);
                        let day3Date = day3RawDate.toLocaleDateString("en-US");

                        $('#day3Title').text(day3Date);
                        $('#day3-icon').attr('src', day3IconUrl);
                        $('#day3Temp').text('Current Temperature: ' + (Math.round(day3Temp)) + '°F');
                        $('#day3Wind').text('Wind Speed: ' + (Math.round(day3Wind)) + ' mph');
                        $('#day3Humid').text('Humidity: ' + (Math.round(day3Humid)) + '%');


                        let day4Temp = dayArray[3].main.temp;
                        let day4Wind = dayArray[3].wind.speed;
                        let day4Humid = dayArray[3].main.humidity;
                        let day4Datedt = dayArray[3].dt;
                        let day4Icon = dayArray[3].weather[0].icon;
                        let day4IconUrl = `https://openweathermap.org/img/wn/${day4Icon}@4x.png`;

                        let day4RawDate = new Date(day4Datedt * 1000);
                        let day4Date = day4RawDate.toLocaleDateString("en-US");

                        $('#day4Title').text(day4Date);
                        $('#day4-icon').attr('src', day4IconUrl);
                        $('#day4Temp').text('Current Temperature: ' + (Math.round(day4Temp)) + '°F');
                        $('#day4Wind').text('Wind Speed: ' + (Math.round(day4Wind)) + ' mph');
                        $('#day4Humid').text('Humidity: ' + (Math.round(day4Humid)) + '%');


                        let day5Temp = dayArray[4].main.temp;
                        let day5Wind = dayArray[4].wind.speed;
                        let day5Humid = dayArray[4].main.humidity;
                        let day5Datedt = dayArray[4].dt;
                        let day5Icon = dayArray[4].weather[0].icon;
                        let day5IconUrl = `https://openweathermap.org/img/wn/${day5Icon}@4x.png`;

                        let day5RawDate = new Date(day5Datedt * 1000);
                        let day5Date = day5RawDate.toLocaleDateString("en-US");

                        $('#day5Title').text(day5Date);
                        $('#day5-icon').attr('src', day5IconUrl);
                        $('#day5Temp').text('Current Temperature: ' + (Math.round(day5Temp)) + '°F');
                        $('#day5Wind').text('Wind Speed: ' + (Math.round(day5Wind)) + ' mph');
                        $('#day5Humid').text('Humidity: ' + (Math.round(day5Humid)) + '%');


                    })
            })
    }



