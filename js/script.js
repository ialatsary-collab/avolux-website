
/* =================================
   AVOLUX - WEBSITE INTERACTIONS
   ================================= */

// Official AvoLux WhatsApp number
const WHATSAPP_NUMBER = "628822005792256";

// Mobile navigation menu
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Close menu after selecting a navigation link
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });
}

// WhatsApp order buttons
document.querySelectorAll(".whatsapp-link").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const message =
      button.dataset.message ||
      "Halo AvoLux, saya ingin mengetahui informasi produk AvoLux.";

    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});

// Automatic footer year
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
