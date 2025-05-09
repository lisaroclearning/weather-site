/* ==========================================================================
  File: weatherCodes.js

  Description: Provides mappings for standardized weather codes to:
  - Icon filenames used globally to Render appropriate icons
  - weather descriptions to show weather conditions

--------------------------------------------------------------------------*/

window.weather.weatherIcons = {
  0: "icons8-summer-50.svg", //sun
  1: "icons8-partly-cloudy-day-50.svg", //sun behind cloud
  2: "icons8-clouds-50.svg", //blue cloud
  3: "icons8-cloud-50.svg", //cloudy sun
  45: "icons8-fog.svg", //fog
  48: "icons8-fog.svg", //fog
  51: "icons8-light-rain-50.svg", //1 drop cloud
  53: "icons8-rain-50.svg", //3 drop rain
  55: "icons8-heavy-rain-50.svg", //heavy drizzle rain
  61: "icons8-umbrella-50.svg", //umbrella
  63: "icons8-rain-cloud-50.svg", // moderate rain sun
  65: "icons8-heavy-rain-50-2.svg", //heavy rain
  66: "icons8-sleet-50.svg", //ice rain cloud
  67: "icons8-sleet-50.svg", //ice rain cloud
  71: "icons8-snow-50.svg", //snow
  73: "icons8-snow-50.svg", //snow
  75: "icons8-snow-50.svg", //snow
  77: "icons8-sleet-50.svg", // icy rain cloud
  80: "icons8-umbrella-50.svg", //umbrella
  81: "icons8-heavy-rain-50.svg", //heavy rain
  82: "icons8-heavy-rain-50-2.svg", // heavier rain
  85: "icons8-snow-50.svg", //snow
  86: "icons8-snow-50.svg", //snow
  95: "icons8-storm-50.svg", //lightening cloud
  96: "icons8-stormy-weather-50.svg", // lightening sun
  99: "icons8-cloud-lightening-50.svg", // angry lightening cloud
};

window.weather.weatherDescriptions = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light showers",
  81: "Moderate showers",
  82: "Heavy showers",
  85: "Snow showers",
  86: "Snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};
