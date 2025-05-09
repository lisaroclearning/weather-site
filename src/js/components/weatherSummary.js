/* ==========================================================================
  File: weatherSummary.js

  Description: Renders Main Weather Summary

  Displays today's weather summary for a given city, including:
  Current temperature, Real feel, Wind speed, Weather icon and description.

  function:
  renderCurrentSummary(): called from dashboard.js or city.js to update the summary
----------------------------------------------------------------------------*/

function renderCurrentSummary(cityName, dailyData, icons, descriptions, prefs) {
  // ------------------------------
  // 1. Get the city label & format
  // ------------------------------
  const cityObj = weather.dataStore.getByCity(cityName); // Get city info from dataStore
  const cityLabel = cityObj?.label?.toUpperCase() || cityName.toUpperCase(); // Use uppercase label if available, otherwise use the raw name

  // -----------------------------
  // 2. Get today’s weather values
  // -----------------------------
  const weatherCode = dailyData.daily.weather_code[0]; // Number that tells us the weather condition (e.g., rain, sun, fog)
  const tempC = Math.round(dailyData.daily.temperature_2m_max[0]); // Max temperature in Celsius
  const feelC = Math.round(dailyData.daily.apparent_temperature_max[0]); // What it actually feels like
  const windKmh = Math.round(dailyData.daily.wind_speed_10m_max[0]); // Wind speed

  // -----------------------------------
  // 3. Convert to Fahrenheit if needed
  // -----------------------------------
  const isFahrenheit = prefs.units === "fahrenheit"; // Check user’s preference
  const temperature = isFahrenheit ? weather.utils.toFahrenheit(tempC) : tempC; // Convert if needed
  const realFeel = isFahrenheit ? weather.utils.toFahrenheit(feelC) : feelC;

  // -----------------------------
  // 4. Get icon and description
  // -----------------------------
  // If the weatherCode is missing from our icon list, show a default cloud icon
  const iconFile = icons[weatherCode] || "icons8-cloud-50.svg";
  // If the description is missing, use "Unknown" so the UI isn’t blank
  const description = descriptions[weatherCode] || "Unknown";

  // -----------------------------
  // 5. Update the HTML on the page
  // -----------------------------
  const tempEl = document.getElementById("today-temp"); // Temperature number
  if (tempEl) tempEl.textContent = `${temperature}°${isFahrenheit ? "F" : "C"}`;

  const feelEl = document.getElementById("today-realfeel"); // Real feel
  if (feelEl)
    feelEl.textContent = `Real Feel ${realFeel}°${isFahrenheit ? "F" : "C"}`;

  const iconEl = document.getElementById("today-icon"); // Icon image
  if (iconEl) {
    iconEl.src = `/images/${iconFile}`;
    iconEl.alt = description; // Alt text
  }

  const descEl = document.getElementById("today-description"); // Description text
  if (descEl) descEl.textContent = description;

  const windEl = document.getElementById("today-wind"); // Wind speed
  if (windEl) windEl.textContent = `Wind: ${windKmh} km/h`;

  const cityEl = document.getElementById("city-name"); // City title
  if (cityEl) cityEl.textContent = cityLabel;
}

// Make this function available to other scripts globally (e.g., dashboard.js, city.js)
window.renderCurrentSummary = renderCurrentSummary;
