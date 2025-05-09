/* ==========================================================================
  File: city.js – City Forecast Page Script

  Description: This script runs on the individual city detail page.
 - Applies user-selected theme
 - Extracts the city name from URL parameters
 - Fetches hourly and daily weather data from the dataStore
 - Renders current summary, hourly forecast, and 7-day forecast

 Dependencies:
 - weather.utils (preferences, theme)
 - dataStore.js (structured access to weather data)
 - weatherSummary.js (current weather rendering)
 - futureForecast.js (forecast renderers)
 - weatherCodes.js (icons and descriptions)

--------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  // Apply theme as per user preferences
  weather.utils.applyTheme();

  // ----------------------------------
  // 1. Get the city name & the weather
  // ----------------------------------
  const params = new URLSearchParams(window.location.search); //Get the city name from the URL
  const city = params.get("name") || weather.utils.defaultPrefs.defaultCity; // Use default if none in URL
  const prefs = weather.utils.getUserPreferences(); // Load saved preferences

  // Get the weather data for the city from the global weather object
  const dailyData = weather.dataStore.getDaily(city); // Daily forecast
  const hourlyData = weather.dataStore.getHourly(city); // Hourly forecast

  // If city data can't be found, show an error and stop
  if (!dailyData || !hourlyData) {
    console.error("City data not found:", city);
    return;
  }

  // ---------------------------------------------------
  // 2. Show the current weather at the top of the page
  // ---------------------------------------------------
  renderCurrentSummary(
    city,
    { daily: dailyData },
    weather.weatherIcons,
    weather.weatherDescriptions,
    prefs,
  );

  // ---------------------------------------------------
  // 3. Show the hourly forecast for next 6 hours
  // ---------------------------------------------------
  renderHourlyForecast(
    { hourly: hourlyData },
    weather.weatherIcons,
    "hourly-forecast", // Target HTML container
    prefs,
  );

  // ---------------------------------------------------
  // 4. Show the 7-day forecast below
  // ---------------------------------------------------
  renderSevenDayForecast(
    { daily: dailyData },
    weather.weatherIcons,
    "seven-day-forecast", // Target HTML container
    prefs,
  );
});
