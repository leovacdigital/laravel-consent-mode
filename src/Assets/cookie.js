function acceptAllCookies() {
  Object.keys(window.categories).forEach((category) => {
    document.cookie =
      category + "_cookies=granted; path=/; max-age=" + 365 * 24 * 60 * 60;
  });

  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    personalization_storage: "granted",
    security_storage: "granted",
  });

  // Dodajemo globalni cookie_consent flag
  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  document.getElementById("cookie-banner").classList.add("hidden");
  location.reload();
}

function acceptEssentialCookies() {
  Object.keys(window.categories).forEach((category) => {
    let isRequired =
      window.categories[category].required ||
      window.categories[category].gtag_key === "security_storage";
    document.cookie =
      category +
      "_cookies=" +
      (isRequired ? "granted" : "denied") +
      "; path=/; max-age=" +
      365 * 24 * 60 * 60;
  });

  gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });

  // Dodajemo globalni cookie_consent flag
  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  document.getElementById("cookie-banner").classList.add("hidden");
  location.reload();
}

function acceptSelectedCookies() {
  let categories = window.categories;
  let consentData = {};

  Object.keys(categories).forEach((category) => {
    let checkbox = document.getElementById(category + "_cookies");
    let value = checkbox && checkbox.checked ? "granted" : "denied";

    if (
      categories[category].required ||
      categories[category].gtag_key === "security_storage"
    ) {
      value = "granted"; // Obavezni kolačići i security_storage su uvek dozvoljeni
    }

    // Postavljanje kolačića
    document.cookie =
      category +
      "_cookies=" +
      value +
      "; path=/; max-age=" +
      365 * 24 * 60 * 60;

    // Dodavanje consent podataka za GTM
    consentData[categories[category].gtag_key] = value;

    // Brisanje kolačića ako je korisnik odbio kategoriju
    if (value === "denied" && categories[category].cookies) {
      categories[category].cookies.forEach((cookie) => {
        document.cookie =
          cookie + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      });
    }
  });

  // Osiguravamo da security_storage uvek ostane "granted"
  consentData["security_storage"] = "granted";

  // Dodajemo globalni cookie_consent flag
  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  // Ažuriranje Google Consent Mode
  gtag("consent", "update", consentData);

  // Sakrivanje banera
  document.getElementById("cookie-settings").style.display = "none";

  // Ako je GTM već učitan, osvežavanje stranice kako bi se ažurirao
  if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
    loadGTM();
  }

  location.reload();
}

function denyCookies() {
  let categories = window.categories;
  let consentData = {};

  Object.keys(categories).forEach((category) => {
    let gtagKey = categories[category].gtag_key;
    console.log(categories[category].required);
    if (categories[category].required || gtagKey === "security_storage") {
      // Obavezni kolačići i security_storage ostaju "granted"
      document.cookie =
        category + "_cookies=granted; path=/; max-age=" + 365 * 24 * 60 * 60;
      consentData[gtagKey] = "granted";
    } else {
      // Ostali kolačići se postavljaju na "denied"
      document.cookie =
        category + "_cookies=denied; path=/; max-age=" + 365 * 24 * 60 * 60;
      consentData[gtagKey] = "denied";

      // Brisanje kolačića ako su odbijeni
      if (categories[category].cookies) {
        categories[category].cookies.forEach((cookie) => {
          document.cookie =
            cookie + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        });
      }
    }
  });

  // GTM Consent Mode ažuriranje
  gtag("consent", "update", consentData);

  // Sakrivanje cookie podešavanja
  document.getElementById("cookie-settings").style.display = "none";

  // Dodajemo globalni cookie_consent flag
  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  // Osvežavanje stranice kako bi promene stupile na snagu
  if (!sessionStorage.getItem("consentReloaded")) {
    sessionStorage.setItem("consentReloaded", "true");
    location.reload();
  }
  location.reload();
}

function loadGTM() {
  console.log("🔄 Ponovno učitavanje Google Tag Managera...");

  var script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtm.js?id={{ config('consent.gtm_id') }}";
  document.head.appendChild(script);

  console.log("✅ GTM ponovo učitan!");
}

function checkStoredConsent() {
  if (document.cookie.includes("cookie_consent=accepted")) {
    console.log(
      "✅ Korisnik je već prihvatio kolačiće, ponovo ažuriramo consent..."
    );

    let consentData = {};
    let categories = window.categories; // Koristimo window.categories umesto @json

    Object.keys(categories).forEach((category) => {
      consentData[categories[category].gtag_key] = document.cookie.includes(
        category + "_cookies=granted"
      )
        ? "granted"
        : "denied";
    });

    gtag("consent", "update", consentData);

    // Proveravamo da li je GTM učitan
    if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
      loadGTM(); // Ako nije, učitavamo ga ponovo
    }
  } else {
    console.log("❌ Korisnik još nije prihvatio kolačiće.");
  }
}

// Pokrećemo proveru kada se stranica učita
window.onload = function () {
  checkStoredConsent();
};
function openCookieModal() {
  console.log("Otvaramo cookie modal...");
  document.getElementById("cookie-settings").classList.remove("hidden");
}

function closeCookieModal() {
  document.getElementById("cookie-settings").classList.add("hidden");
}
