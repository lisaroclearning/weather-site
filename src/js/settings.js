/* ==========================================================================
  File: settings.js – User Preferences Script

  Description: script controls the Settings page.

 It allows users to:
  - Choose light or dark mode
  - Select Celsius or Fahrenheit
  - Pick a default city and up to 6 favourites
  - Save or reset their preferences (stored in the browser using localStorage

  It also:
  - Disables the Save button and shows a warning if too many are selected
--------------------------------------------------------------------------*/

// Wait for the full page to load before running
document.addEventListener("DOMContentLoaded", () => {
  // Apply the user's saved theme to the page background
  weather.utils.applyTheme(
    localStorage.getItem("theme") || weather.utils.defaultPrefs.mode,
  );

  const form = document.getElementById("preferences-form"); // Get key elements from the page (form, buttons, city dropdown, etc.)
  if (!form) return; // If the form isn't found, stop

  const defaultSelect = document.getElementById("default-city");
  const checkboxContainer = document.getElementById("favourite-city-list");
  const saveBtn = document.getElementById("save-btn");
  const warningMsg = document.getElementById("fave-warning");

  const allCities = weather.dataStore.list(); // Get the full list of cities from the dataStore

  // ------------------------------------------------
  // 1. Add all cities to the dropdown and checkboxes
  // ------------------------------------------------

  allCities.forEach(({ city, label }) => {
    // Add city to the "default city" dropdown
    const option = document.createElement("option");
    option.value = city;
    option.textContent = label.toUpperCase();
    defaultSelect.appendChild(option);

    // Create a checkbox for this city
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "favourites";
    checkbox.value = city;

    // Create label for each checkbox
    const labelEl = document.createElement("label");
    labelEl.className = "checkbox has-text-white";
    labelEl.appendChild(checkbox);
    labelEl.append(` ${label}`);

    // Wrap label inside a styled <div> and add it to the page
    const wrapper = document.createElement("div");
    wrapper.className = "control";
    wrapper.appendChild(labelEl);
    checkboxContainer.insertBefore(wrapper, checkboxContainer.lastElementChild);
  });

  // ---------------------------------------------
  //  2. Show saved theme, unit, and default city
  // ---------------------------------------------

  defaultSelect.value =
    localStorage.getItem("defaultCity") ||
    weather.utils.defaultPrefs.defaultCity;

  const savedTheme =
    localStorage.getItem("theme") || weather.utils.defaultPrefs.mode;
  const savedUnits =
    localStorage.getItem("units") || weather.utils.defaultPrefs.units;

  // Check the saved theme and unit radio buttons
  const themeInput = form.querySelector(
    `input[name="theme"][value="${savedTheme}"]`,
  );
  const unitInput = form.querySelector(
    `input[name="units"][value="${savedUnits}"]`,
  );
  if (themeInput) themeInput.checked = true;
  if (unitInput) unitInput.checked = true;

  // ---------------------------------------
  // 3. Check saved or default favourite cities
  // ---------------------------------------

  window.addEventListener("load", () => {
    document.querySelectorAll('input[name="favourites"]').forEach((cb) => {
      const city = cb.value;
      const stored = localStorage.getItem("fave-" + city); // Check saved status
      const isDefault = weather.utils.defaultPrefs.favourites.includes(city);
      cb.checked = stored === null ? isDefault : stored === "true"; // If no saved value yet, use the default list
    });
    updateFaveLimitStatus(); // Show/hide warning if needed
  });

  // ---------------------------------------
  // 4. Only allow up to 6 favourites
  // ---------------------------------------

  function updateFaveLimitStatus() {
    const checked = document.querySelectorAll(
      'input[name="favourites"]:checked',
    );
    const tooMany = checked.length > 6;

    // If user checks more than 6, show warning and disable save
    if (tooMany) {
      warningMsg.classList.remove("is-hidden");
      saveBtn.disabled = true;
    } else {
      warningMsg.classList.add("is-hidden");
      saveBtn.disabled = false;
    }
  }
  // Recheck limit every time a checkbox is clicked
  document.querySelectorAll('input[name="favourites"]').forEach((cb) => {
    cb.addEventListener("change", updateFaveLimitStatus);
  });

  // ---------------------------------------
  // 5. Save preferences when form is submitted
  // ---------------------------------------

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop the form from reloading the page

    // Get selected values from the form
    const selectedTheme =
      form.querySelector('input[name="theme"]:checked')?.value ||
      weather.utils.defaultPrefs.mode;
    const selectedUnits =
      form.querySelector('input[name="units"]:checked')?.value ||
      weather.utils.defaultPrefs.units;
    const selectedCity =
      defaultSelect.value || weather.utils.defaultPrefs.defaultCity;

    // Save each setting separately
    localStorage.setItem("theme", selectedTheme);
    localStorage.setItem("units", selectedUnits);
    localStorage.setItem("defaultCity", selectedCity);

    // Save which cities are favourited
    document.querySelectorAll('input[name="favourites"]').forEach((cb) => {
      localStorage.setItem("fave-" + cb.value, cb.checked);
    });

    weather.utils.applyTheme(selectedTheme); // Update the theme immediately
    location.reload(); // Reload to apply changes site-wide
  });

  // -------------------------------------------
  // 6. Reset all preferences to default values
  // -------------------------------------------

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", () => {
    // Reset theme, units, and default city
    localStorage.setItem("theme", weather.utils.defaultPrefs.mode);
    localStorage.setItem("units", weather.utils.defaultPrefs.units);
    localStorage.setItem("defaultCity", weather.utils.defaultPrefs.defaultCity);

    allCities.forEach(({ city }) => {
      // Reset favourite cities
      const isDefault = weather.utils.defaultPrefs.favourites.includes(city);
      localStorage.setItem("fave-" + city, isDefault);
    });

    weather.utils.applyTheme(weather.utils.defaultPrefs.mode);
    location.reload(); // Reload with default preferences
  });
});
