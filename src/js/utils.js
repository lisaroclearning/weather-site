/* ==========================================================================
  File: utils.js – Utility Functions and Defaults

  Description: This file contains shared helper functions and default values
  used across the app (settings, dashboard, city pages, etc.)

  It:
  - Converts temperatures between Celsius and Fahrenheit
  - Stores the app's default user preferences
  - Loads saved preferences from localStorage
  - Applies the selected theme to the site
--------------------------------------------------------------------------*/

//  Create global namespace
window.weather = window.weather || {};
weather.utils = {};

// ---------------------------------
// 1. Temperature Conversion
// ---------------------------------

//Convert Celsius to Fahrenheit (rounded to whole number)
weather.utils.toFahrenheit = function (celsius) {
  return Math.round((celsius * 9) / 5 + 32);
};

//Convert Fahrenheit to Celsius (rounded to whole number)
weather.utils.toCelsius = function (fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

// -----------------------------
// 2. Default Preferences
// -----------------------------

//These are the preferences used when nothing is saved yet used only if no user prefs chosen.

weather.utils.defaultPrefs = {
  mode: "light", // default to light theme
  units: "celsius", // default to Celsius temperature
  defaultCity: "waterford", // shown on dashboard initially
  favourites: [
    // shown as pre-checked on first load
    "cork",
    "berlin",
    "copenhagen",
    "paris",
    "new_york",
    "amsterdam",
  ],
};

// -----------------------------
// 3.Load Saved Preferences
// -----------------------------

// Get the current saved user preferences from localStorage.
// Falls back to defaults if a value is not stored.
// Favourites are built by checking each city for a `fave-<city>` key.

weather.utils.getUserPreferences = function () {
  const prefs = weather.utils.defaultPrefs;

  return {
    mode: localStorage.getItem("theme") || prefs.mode,
    units: localStorage.getItem("units") || prefs.units,
    defaultCity: localStorage.getItem("defaultCity") || prefs.defaultCity,
    favourites: weather.dataStore
      .list()
      .map((c) => c.city)
      .filter((city) => localStorage.getItem("fave-" + city) === "true"),
  };
};

// -----------------------------
// 4. Apply Selected Theme to Page
// -----------------------------

// Add the appropriate image to <body> based on user’s theme choice.

weather.utils.applyTheme = function () {
  const { mode } = weather.utils.getUserPreferences(); // Get saved mode (light or dark)
  const body = document.body;

  // Remove both theme classes first
  body.classList.remove("is-dark-mode", "is-light-mode");

  // Add the correct one
  if (mode === "dark") {
    body.classList.add("is-dark-mode");
  } else {
    body.classList.add("is-light-mode");
  }
};
