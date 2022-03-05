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

function showCurrentLocation(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let description = response.data.weather[0].description;
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#countryName").innerHTML = response.data.sys.country;
  let convertTemp = document.querySelector("#temp");
  convertTemp.innerHTML = `${currentTemp}`;
  let showTempMin = document.querySelector("#min");
  showTempMin.innerHTML = `${minTemp}`;
  let showTempMax = document.querySelector("#max");
  showTempMax.innerHTML = `${maxTemp}`;
  let convertDescription = document.querySelector("h3");
  convertDescription.innerHTML = `${description}`;
}
function showCity(event) {
  event.preventDefault();
  let apiKey = "aa103043f0692bc32794207b314369d3";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocation);
}
let element = document.querySelector("#form-input");
element.addEventListener("submit", showCity);

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
  let changeDescription = document.querySelector("h3");
  changeDescription.innerHTML = `${currentDescription}`;
  let currentpos = document.querySelector("#location");
  currentpos.innerHTML = `${currentCity}, ${currentCountry}`;
}
function showCurrentLoc(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "aa103043f0692bc32794207b314369d3";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrlCurrent);
  axios.get(apiUrlCurrent).then(showCurrent);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLoc);
}
let blueButton = document.querySelector("button");
blueButton.addEventListener("click", getCurrentLocation);
