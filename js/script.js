
/* =================================
   AVOLUX - WEBSITE INTERACTIONS
   ================================= */

// =================================
// GOOGLE APPS SCRIPT CONNECTION
// =================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyyG8ZiDkWKbmvTg3PMV1V0Ad8gOZaewD5ycBLLvtBL_XjiPf7cVw5hUCC46vZAbS9c/exec";


// =================================
// WHATSAPP NUMBER
// =================================

const WHATSAPP_NUMBER = "628822005792256";


// =================================
// MOBILE NAVIGATION
// =================================

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


// =================================
// WHATSAPP ORDER BUTTONS
// =================================

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


// =================================
// SEND FORM TO GOOGLE SHEETS
// =================================

async function sendToGoogleSheets(form, formType) {
  const submitButton = form.querySelector('button[type="submit"]');

  if (!submitButton) {
    alert("Tombol kirim tidak ditemukan.");
    return;
  }

  const originalText = submitButton.textContent;

  const formData = new URLSearchParams(new FormData(form));

  // Menentukan tab Google Sheets tujuan
  formData.set("formType", formType);

  submitButton.disabled = true;
  submitButton.textContent = "Mengirim...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    alert(
      "Permintaan pengiriman telah dilakukan. Silakan hubungi tim AvoLux jika belum mendapat konfirmasi."
    );

    form.reset();

  } catch (error) {
    console.error("Pengiriman formulir gagal:", error);

    alert(
      "Terjadi kesalahan saat mengirim formulir. Silakan coba kembali."
    );

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}


// =================================
// SUPPLIER FORM
// =================================

const supplierForm = document.querySelector(
  'form[name="supplier-avolux"]'
);

if (supplierForm) {
  supplierForm.addEventListener("submit", function (event) {
    event.preventDefault();

    sendToGoogleSheets(supplierForm, "Supplier");
  });
}


// =================================
// PARTNERSHIP FORM
// =================================

const partnershipForm = document.querySelector(
  'form[name="partnership-avolux"]'
);

if (partnershipForm) {
  partnershipForm.addEventListener("submit", function (event) {
    event.preventDefault();

    sendToGoogleSheets(partnershipForm, "Partnership");
  });
}


// =================================
// AUTOMATIC FOOTER YEAR
// =================================

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
