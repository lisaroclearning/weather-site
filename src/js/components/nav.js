/* ==========================================================================
  File: nav.js

   Description: Script to create dynamic display of linked menu
   When navbar burger is clicked.

----------------------------------------------------------------------------*/

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0,
  );

  // Loop through each burger icon
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"

      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});
