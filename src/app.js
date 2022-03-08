let currentTime = new Date();
let paragraph = document.querySelector("#update");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
paragraph.innerHTML = ` ${day} ${hour}:${minute} `;

function showForcast(coordinates) {
  let apiKey = "aa103043f0692bc32794207b314369d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function showCurrentLocation(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let description = response.data.weather[0].description;
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#countryName").innerHTML = response.data.sys.country;
  let convertTemp = document.querySelector("#temp");
  convertTemp.innerHTML = `${celsiusTemperature}`;
  let showTempMin = document.querySelector("#min");
  showTempMin.innerHTML = `${minTemp}`;
  let showTempMax = document.querySelector("#max");
  showTempMax.innerHTML = `${maxTemp}`;
  let convertDescription = document.querySelector("#weather-description");
  convertDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", ` response.data.weather[0].description`);
  showForcast(response.data.coord);
}
function showCity(event) {
  event.preventDefault();
  let apiKey = "aa103043f0692bc32794207b314369d3";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocation);
}

function showCurrent(response) {
  let temperature = Math.round(response.data.main.temp);
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let currentDescription = response.data.weather[0].description;
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let changeTemp = document.querySelector("#temp");
  changeTemp.innerHTML = `${temperature}`;
  let showMin = document.querySelector("#min");
  showMin.innerHTML = `${min}`;
  let showMax = document.querySelector("#max");
  showMax.innerHTML = `${max}`;
  let changeDescription = document.querySelector("#weather-description");
  changeDescription.innerHTML = `${currentDescription}`;
  let currentPos = document.querySelector("#location");
  currentPos.innerHTML = `${currentCity}, ${currentCountry}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", ` response.data.weather[0].description`);
}
function showCurrentLoc(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKeyCurrent = "b2e49cf298a406cf6a9207e352668751";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyCurrent}&units=metric`;
  axios.get(apiUrlCurrent).then(showCurrent);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLoc);
}

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#temp");
  let fahrenheitElement = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitElement);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = celsiusTemperature;
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function(forcastDay, index){
     forcastHTML =
      forcastHTML +
      `<div class="col">
          ${day},9
          <br />
         <img class="icon" id="icon" alt="Mostly cloudy" src="#" />
          <br />
         <span class="forcast-temp-min>5</span> /
         <span class="forcast-temp-max>10</span>
        </div>`;
  })
 
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
getCurrentLocation();
let element = document.querySelector("#form-input");
element.addEventListener("submit", showCity);

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

displayForcast();
