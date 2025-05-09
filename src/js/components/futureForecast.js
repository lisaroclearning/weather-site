/* ==========================================================================
  File: futureForecast.js – Forecast Renderer

  Description: Renders the hourly and 7-day weather forecast blocks.

  Functions:
  createForecastBlock(): Creates and returns one forecast block for a single day (used here only in renderSevenDayForecast)
  renderHourlyForecast(): Creates 6-hour preview blocks.
  renderSevenDayForecast(): Displays daily high/low temps + icon.

  Relies on weatherIcons from weatherCodes.js.

--------------------------------------------------------------------------*/

// -----------------------------------------------------------
// 1. Creates and returns one forecast block for a single day
// -----------------------------------------------------------
function createForecastBlock(label, icon, max, min, isFahrenheit) {
  const div = document.createElement("div"); // Create a new <div> to hold the forecast info
  div.className = "column is-one-seventh has-text-centered mb-3"; //bulma styling
  // Add the day name, icon, and temperatures using template strings
  div.innerHTML = `
    <p class="has-text-white">${label}</p>
    <img src="/images/${icon}" alt="Weather Icon" />
    <p class="has-text-white">${max}°${isFahrenheit ? "F" : "C"} / ${min}°${isFahrenheit ? "F" : "C"}</p>
  `;
  return div; // return the completed <div> so it can be added to the page
}

// --------------------------------------------
// 2. Renders the next 6 hours of weather data
// --------------------------------------------
function renderHourlyForecast(hourlyData, icons, containerId, prefs) {
  const container = document.getElementById(containerId); // Get the container element from the page using its ID
  if (!container) return; // If it doesn't exist, exit early

  const now = new Date(); // Get the current time and hour
  const currentHour = now.getHours();

  const isFahrenheit = prefs.units === "fahrenheit"; // Check if we need to convert temperatures to Fahrenheit

  container.innerHTML = ""; // Clear any previous forecast items from the container

  for (let i = 0; i < 6; i++) {
    const hourIndex = currentHour + i; // Index into the hourly data
    const hour = new Date(now.getTime() + i * 60 * 60 * 1000).getHours(); // Get the hour label

    let temp = Math.round(hourlyData.hourly.temperature_2m[hourIndex]);
    if (isFahrenheit) temp = weather.utils.toFahrenheit(temp); // Use global utils

    const code = hourlyData.hourly.weather_code[hourIndex];
    const icon = icons[code] || "icons8-cloud-50.svg"; // fallback icon

    const div = document.createElement("div");
    div.className = "column is-one-sixth has-text-centered box";
    div.style.background = "transparent";
    div.style.border = "1px solid rgba(255,255,255,0.3)";
    div.style.margin = "0 4px";

    div.innerHTML = `
      <p class="has-text-white">${hour}:00</p>
      <img src="/images/${icon}" alt="icon" style="height:32px; margin: 4px 0;">
      <p class="has-text-white">${temp}°${isFahrenheit ? "F" : "C"}</p>
    `;
    container.appendChild(div); // Add to page
  }
}

// --------------------------------------------
// 3. Defines and renders the 7-day forecast
// --------------------------------------------
function renderSevenDayForecast(dailyData, icons, containerId, prefs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = dayjs(); // Uses dayjs to get current date
  const isFahrenheit = prefs.units === "fahrenheit";
  container.innerHTML = ""; // Clear existing forecast

  for (let i = 0; i <= 6; i++) {
    const label =
      i === 0
        ? "Today"
        : i === 1
          ? "Tomorrow"
          : now.add(i, "day").format("dddd");

    let max = Math.round(dailyData.daily.temperature_2m_max[i]);
    let min = Math.round(dailyData.daily.temperature_2m_min[i]);
    if (isFahrenheit) {
      max = weather.utils.toFahrenheit(max);
      min = weather.utils.toFahrenheit(min);
    }

    const code = dailyData.daily.weather_code[i];
    const icon = icons[code] || "icons8-cloud-50.svg";

    const block = createForecastBlock(label, icon, max, min, isFahrenheit);
    container.appendChild(block);
  }
}

// Expose functions globally so other scripts can use them
window.renderHourlyForecast = renderHourlyForecast;
window.renderSevenDayForecast = renderSevenDayForecast;
