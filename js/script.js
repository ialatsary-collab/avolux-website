
/* =================================
   AVOLUX - WEBSITE INTERACTIONS
   ================================= */

// WhatsApp AvoLux
const WHATSAPP_NUMBER = "628822005792256";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx2Ir5y3oeRHbbnfVVCjU2-4lFtzB5A18BnkSy3WJ9rNnFiAR3wYbebyB1oaFu65N16/exec";

// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });
}

// WhatsApp buttons
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

// Send Supplier and Partnership forms to Google Sheets
async function sendToGoogleSheets(form, formType) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  const formData = new URLSearchParams(new FormData(form));
  formData.append("formType", formType);

  submitButton.disabled = true;
  submitButton.textContent = "Mengirim...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    alert(
      "Formulir telah dikirim. Silakan tunggu konfirmasi dari tim AvoLux."
    );

    form.reset();

  } catch (error) {
    alert("Pengiriman gagal. Silakan coba kembali.");

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

// Supplier form
const supplierForm = document.querySelector(
  'form[name="supplier-avolux"]'
);

if (supplierForm) {
  supplierForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendToGoogleSheets(supplierForm, "Supplier");
  });
}

// Partnership form
const partnershipForm = document.querySelector(
  'form[name="partnership-avolux"]'
);

if (partnershipForm) {
  partnershipForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendToGoogleSheets(partnershipForm, "Partnership");
  });
}

// Automatic footer year
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
