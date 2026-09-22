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

  // Sticky header gains a subtle shadow once the page scrolls, giving it
  // visual separation from the content below.
  var siteHeader = document.querySelector(".site-header");

  if (siteHeader) {
    var updateHeaderShadow = function () {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  // Highlight the nav link for the section currently in view.
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".main-nav a[href^='#']")
  );
  var trackedSections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if (trackedSections.length && "IntersectionObserver" in window) {
    var setActiveLink = function (id) {
      navLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    trackedSections.forEach(function (item) {
      observer.observe(item.section);
    });
  }
})();
