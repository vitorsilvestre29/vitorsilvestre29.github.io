(function () {
  "use strict";

  // Mobile nav toggle: opens/closes the menu and closes it again on link click.
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // GitHub stats card is loaded from a third-party image service; hide the
  // block gracefully if it fails to load instead of leaving a broken image.
  var githubStatsImg = document.querySelector(".github-signal-img");

  if (githubStatsImg) {
    githubStatsImg.addEventListener("error", function () {
      githubStatsImg.style.display = "none";
    });
  }
})();
