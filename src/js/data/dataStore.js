/* ==========================================================================
  File: dataStore.js

  Description: Centralised data model for city weather info

--------------------------------------------------------------------------*/

// -----------------------------------------------------------
// 1. Create a global `weather` object if it doesn't exist yet
// -----------------------------------------------------------
window.weather = window.weather || {};
weather.dataStore = {}; // Create a sub-object to store weather data and methods

// -----------------------------------------------
// 2. Define base city list with formatted labels
// -----------------------------------------------
const cityList = [
  { city: "berlin", label: "Berlin" },
  { city: "cork", label: "Cork" },
  { city: "copenhagen", label: "Copenhagen" },
  { city: "paris", label: "Paris" },
  { city: "waterford", label: "Waterford" },
  { city: "amsterdam", label: "Amsterdam" },
  { city: "new_york", label: "New York" },
  { city: "san_francisco", label: "San Francisco" },
  { city: "tromso", label: "Tromsø" },
];

// -------------------------------------
// 3. Map each city to its weather data
// -------------------------------------
weather.dataStore.data = cityList.map(({ city, label }) => ({
  city,
  label,
  daily: weatherData[`${city}_daily`]?.daily || null,
  hourly: weatherData[`${city}_hourly`]?.hourly || null,
}));

// --------------------------------------------------------
// 4. Utilise accessor functions for specific weather data.
// --------------------------------------------------------

// Get full entry (label, daily, hourly) for a specific city
weather.dataStore.getByCity = function (city) {
  return this.data.find((entry) => entry.city === city) || null;
};

//Get daily weather data for a city
weather.dataStore.getDaily = function (city) {
  return this.getByCity(city)?.daily || null;
};

//Get hourly weather data for a city
weather.dataStore.getHourly = function (city) {
  return this.getByCity(city)?.hourly || null;
};

//Get a specific value from the city's daily data
weather.dataStore.getDailyValue = function (city, key, index = 0) {
  return this.getDaily(city)?.[key]?.[index] ?? null;
};

// Get a specific value from the city's hourly data
weather.dataStore.getHourlyValue = function (city, key, index = 0) {
  return this.getHourly(city)?.[key]?.[index] ?? null;
};

//Get the index of a given timestamp in the hourly data
weather.dataStore.getIndexByTime = function (city, timeStr) {
  return this.getHourly(city)?.time?.indexOf(timeStr) ?? -1;
};

//Returns today's weather summary values for a city
weather.dataStore.getTodaySummary = function (city) {
  const daily = this.getDaily(city);
  if (!daily) return null;

  return {
    weatherCode: daily.weather_code?.[0] ?? null,
    tempMax: daily.temperature_2m_max?.[0] ?? null,
    feelMax: daily.apparent_temperature_max?.[0] ?? null,
    windMax: daily.wind_speed_10m_max?.[0] ?? null,
  };
};

// return full list
weather.dataStore.list = function () {
  return this.data;
};
