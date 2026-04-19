// Single source of truth for site-wide brand + link values.
// Rename the project or swap destinations by editing this file only.

window.SITE_CONFIG = {
  BRAND: "The Summit",
  TAGLINE_SHORT: "Train. Build. Belong.",
  LOCATION: "Durango, Colorado",

  // PLACEHOLDER: replace with real Cal.com link once the account exists.
  CAL_COM_URL: "#",

  // PLACEHOLDER: replace with real contact email.
  CONTACT_EMAIL: "hello@thesummit.example",

  // PLACEHOLDER: social handles.
  SOCIAL: {
    instagram: "",
    youtube: "",
  },
};

// Replace any element with data-brand attribute with BRAND name.
document.addEventListener("DOMContentLoaded", () => {
  const brand = window.SITE_CONFIG.BRAND;
  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = brand;
  });
  document.querySelectorAll("[data-cal-url]").forEach((el) => {
    el.setAttribute("href", window.SITE_CONFIG.CAL_COM_URL);
  });
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.textContent = window.SITE_CONFIG.CONTACT_EMAIL;
    el.setAttribute("href", `mailto:${window.SITE_CONFIG.CONTACT_EMAIL}`);
  });
});
