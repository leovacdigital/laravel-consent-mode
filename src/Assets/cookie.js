// ✅ Prihvatanje svih kolačića
function acceptAllCookies() {
  Object.keys(window.categories).forEach((category) => {
    document.cookie =
      category + "_cookies=granted; path=/; max-age=" + 365 * 24 * 60 * 60;
  });

  let consentData = {};
  Object.keys(window.categories).forEach((category) => {
    consentData[window.categories[category].gtag_key] = "granted";
  });

  gtag("consent", "update", consentData);

  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  document.getElementById("cookie-banner").classList.add("hidden");

  reloadPage();
}

// ✅ Prihvatanje samo neophodnih kolačića
function acceptEssentialCookies() {
  let consentData = {};

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

    consentData[window.categories[category].gtag_key] = isRequired
      ? "granted"
      : "denied";

    if (!isRequired) {
      deleteCategoryCookies(category);
    }
  });

  gtag("consent", "update", consentData);

  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  document.getElementById("cookie-banner").classList.add("hidden");

  reloadPage();
}

// ✅ Prihvatanje selektovanih kolačića
function acceptSelectedCookies() {
  let consentData = {};

  Object.keys(window.categories).forEach((category) => {
    let checkbox = document.getElementById(category + "_cookies");
    let value = checkbox && checkbox.checked ? "granted" : "denied";

    if (
      window.categories[category].required ||
      window.categories[category].gtag_key === "security_storage"
    ) {
      value = "granted";
    }

    document.cookie =
      category +
      "_cookies=" +
      value +
      "; path=/; max-age=" +
      365 * 24 * 60 * 60;

    consentData[window.categories[category].gtag_key] = value;

    if (value === "denied") {
      deleteCategoryCookies(category);
    }
  });

  consentData["security_storage"] = "granted";

  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  gtag("consent", "update", consentData);

  document.getElementById("cookie-settings").style.display = "none";

  reloadPage();
}

// ✅ Odbijanje svih neobaveznih kolačića
function denyCookies() {
  let consentData = {};

  Object.keys(window.categories).forEach((category) => {
    let gtagKey = window.categories[category].gtag_key;

    if (
      window.categories[category].required ||
      gtagKey === "security_storage"
    ) {
      document.cookie =
        category + "_cookies=granted; path=/; max-age=" + 365 * 24 * 60 * 60;
      consentData[gtagKey] = "granted";
    } else {
      document.cookie =
        category + "_cookies=denied; path=/; max-age=" + 365 * 24 * 60 * 60;
      consentData[gtagKey] = "denied";

      deleteCategoryCookies(category);
    }
  });

  gtag("consent", "update", consentData);

  document.getElementById("cookie-settings").style.display = "none";

  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;

  localStorage.clear();
  sessionStorage.clear();

  reloadPage();
}

// ✅ Brisanje svih kolačića iz određene kategorije
function deleteCategoryCookies(category) {
  if (!window.categories[category] || !window.categories[category].cookies) {
    return;
  }

  let categoryCookies = window.categories[category].cookies;

  document.cookie.split(";").forEach((c) => {
    let cookieName = c.trim().split("=")[0];

    let isTrackedCookie = categoryCookies.some((pattern) => {
      return pattern.includes("*")
        ? cookieName.startsWith(pattern.replace("*", ""))
        : cookieName === pattern;
    });

    if (isTrackedCookie) {
      document.cookie =
        cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        cookieName +
        "=; path=/; domain=" +
        location.hostname +
        "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  });
}

// ✅ Učitavanje GTM ako nije već učitan
function loadGTM() {
  if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtm.js?id={{ config('consent.gtm_id') }}";
    document.head.appendChild(script);
  }
}

// ✅ Provera da li postoji već sačuvana saglasnost i ažuriranje Google Consent Mode-a
function checkStoredConsent() {
  if (document.cookie.includes("cookie_consent=accepted")) {
    let consentData = {};
    Object.keys(window.categories).forEach((category) => {
      consentData[window.categories[category].gtag_key] =
        document.cookie.includes(category + "_cookies=granted")
          ? "granted"
          : "denied";
    });

    gtag("consent", "update", consentData);
    loadGTM();
  } else {
    document.getElementById("cookie-banner").classList.remove("hidden");
  }
}

// ✅ Funkcije za otvaranje i zatvaranje cookie podešavanja
function openCookieModal() {
  document.getElementById("cookie-settings").classList.remove("hidden");
}

function closeCookieModal() {
  document.getElementById("cookie-settings").classList.add("hidden");
}

// ✅ Funkcija za sigurno osvežavanje stranice bez dupliranja poziva
function reloadPage() {
  location.reload();
}

// ✅ Pokrećemo proveru kada se stranica učita
window.onload = function () {
  checkStoredConsent();
};
