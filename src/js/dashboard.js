/* ==========================================================================
  File: dashboard.js – Main Dashboard Script

  This script runs on the homepage/dashboard view.

 - Applies the user's selected theme
 - Loads user preferences (default city, unit system, favourites)
 - Uses dataStore to fetch daily and hourly weather for default city
 - Renders current weather summary, hourly forecast, and 7-day forecast
 - Dynamically generates tiles for favourite cities

 Dependencies:
 - weather.utils (theme, preferences, helpers)
 - dataStore.js (allows access to weatherData)
 - weatherSummary.js (renders current summary)
 - futureForecast.js (renders forecasts)
 - weatherCodes.js (icons and descriptions)

--------------------------------------------------------------------------*/

// Wait until the page fully loads before running the script
document.addEventListener("DOMContentLoaded", () => {
  weather.utils.applyTheme(); // Set the page theme based on user settings

  // ----------------------------------------
  // 1. Get user preferences & the weather data
  // ------------------------------------------

  const prefs = weather.utils.getUserPreferences(); // Get saved user settings
  const city = prefs.defaultCity || weather.utils.defaultPrefs.defaultCity; // Use preferred city or default

  // Get weather data for that city
  const dailyData = weather.dataStore.getDaily(city);
  const hourlyData = weather.dataStore.getHourly(city);

  // If no data is found, log an error and stop
  if (!dailyData || !hourlyData) {
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
    "hourly-forecast",
    prefs,
  );

  // ---------------------------------------------------
  // 3. Show the forecast for the next 7 days
  // ---------------------------------------------------
  renderSevenDayForecast(
    { daily: dailyData },
    weather.weatherIcons,
    "seven-day-forecast",
    prefs,
  );

  // ---------------------------------------------------
  // 4.  Show tiles for the user's favourite cities
  // ---------------------------------------------------
  renderCityTiles(prefs);
});

// -----------------------------------------------------------
// Function: renderCityTiles(prefs)
// Description: This builds the clickable city tiles on the dashboard
// showing a mini weather summary for each favourite city.
// -----------------------------------------------------------
function renderCityTiles(prefs) {
  // Get the user's list of favourite cities
  const favourites = prefs.favourites || weather.utils.defaultPrefs.favourites;

  const isFahrenheit = prefs.units === "fahrenheit"; // Check if user wants Fahrenheit instead of Celsius

  const container = document.getElementById("city-tiles"); // Find the container where the city tiles will be added
  if (!container) return; // Stop if the container isn't found

  container.innerHTML = ""; // Clear out any existing tiles (e.g., if page is reloaded)

  favourites.forEach((city) => {
    // Loop through each favourite city

    const daily = weather.dataStore.getDaily(city); // Get the daily weather data for that city

    const cityObj = weather.dataStore.getByCity(city); // Get the city info (like label for display)

    if (!daily || !cityObj) return; // Skip this city if the data isn't available

    const code = daily.weather_code[0]; // Get the weather code for today (used to pick the icon)

    const tempC = Math.round(daily.temperature_2m_max[0]); // Get today’s high temperature in Celsius and round it

    const tempDisplay = isFahrenheit // Convert temperature to Fahrenheit if needed
      ? weather.utils.toFahrenheit(tempC)
      : tempC;

    const icon = weather.weatherIcons[code] || "icons8-cloud-50.svg"; // Choose the correct weather icon, or use a cloud icon as default

    const tile = document.createElement("div"); // Create a tile for this city and fill it with weather info
    tile.className = "column is-one-third"; // Bulma layout class

    tile.innerHTML = `
      <a href="/city/?name=${city}" class="city-tile">
        <div class="temp">${tempDisplay}°${isFahrenheit ? "F" : "C"}</div>
        <img src="/images/${icon}" alt="Weather Icon" />
        <p>${cityObj.label.toUpperCase()}</p>
      </a>
    `;

    container.appendChild(tile); // Add the tile to the container on the page
  });
}
