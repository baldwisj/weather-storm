const apiKey = 'f8e0d74cfd971b3f0170ddc7c977e7f9';
const cityInput = searchBar.value.trim();
const searchBtn = $('#searchBtn');
let city;
let latitude;
let longitude;

$(document).ready(function () {
    searchBtn.on("click", function () {
        localStorage.setItem("history", JSON.stringify(cityInput));
        if (cityInput && cityInput == ! "") {
            
            function getLocation() {
                let city = cityInput;
                const weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;



                fetch(weatherUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                    })
            }
        }
    })

})