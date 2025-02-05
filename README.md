# Laravel Consent Mode

**GDPR Compliant Google Consent Mode V2 for Laravel**

This package provides an easy way to implement Google Consent Mode V2 in Laravel applications while complying with GDPR regulations. It supports TailwindCSS for styling and offers customizable cookie consent management.

🚀 Features

✅ Google Consent Mode V2 compliant
✅ Supports TailwindCSS for styling
✅ Easy integration with Laravel
✅ Customizable cookie categories
✅ Consent-based loading of Google Tag Manager (GTM)
✅ Multi-language support
✅ Publishable assets (JS, CSS, Views, and Config)

---

## 📌 Installation

### 1️⃣ Install the package via Composer

Run the following command in your Laravel project:

```sh
composer require radosavleovac/laravel-consent-mode
```

### 2️⃣ Publish the configuration file

After installation, publish the configuration file using:

```sh
php artisan vendor:publish --tag=consent-config
```

This will create a configuration file at:

```
config/consent.php
```

### 3️⃣ Publish assets (JS & CSS)

To publish the required JavaScript and CSS files, run:

```sh
php artisan vendor:publish --tag=consent-assets
```

This will place the assets in the `public/js` and `public/css` folders.

### 4️⃣ Publish translations (optional)

To publish language files for customization:

```sh
php artisan vendor:publish --tag=cookie-consent-translations
```

### 5️⃣ Publish views (optional)

If you want to override the default views:

```sh
php artisan vendor:publish --tag=cookie-consent-views
```

This will copy the views to:

```
resources/views/vendor/cookie-consent/
```

---

## 📖 Configuration

Edit the `config/consent.php` file to configure the cookie categories and default settings:

```php
return [
    'gtm_id' => env('GTM_ID', 'GTM-XXXXXXX'),

    'cookie_name' => env('COOKIE_CONSENT_NAME', 'cookie_consent'),

    'cookie_expiration_days' => env('COOKIE_EXPIRATION_DAYS', 365),

    'categories' => [
            'necessary' => [
            'label' => 'necessary', // This key is used in the cookie settings modal
            'description' => 'necessary_description', // This key is used in the cookie settings modal
            'required' => true, // This key is used in the cookie settings modal
            'gtag_key' => 'security_storage', // This key is used in the Google Tag Manager
            'cookies' => ['XSRF-TOKEN', 'laravel_session'], // Cookies that are set when the category is accepted
        ]
    ],

    'default_consent' => [
        'ad_storage' => 'denied',
        'analytics_storage' => 'denied',
        'security_storage' => 'granted',
    ]
];
```

---

## 🚀 Usage

### 1️⃣ Add the consent banner

Include the following Blade directive in your main layout, near or in footer (e.g., `resources/views/layouts/app.blade.php`):

```blade
@include('cookie-consent::cookie-banner')
```

### 2️⃣ Add the Google Tag after head opening

```blade
@include('cookie-consent::gtm')
```

### 2️⃣ Add the noscript Tag after body opening

```blade
@include('cookie-consent::gtm-noscript')
```

## 🎯 Example: Handling Consent in JavaScript

When the user accepts all cookies, the following function is executed:

```js
function acceptAllCookies() {
  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    security_storage: "granted",
  });

  document.cookie =
    "cookie_consent=accepted; path=/; max-age=" + 365 * 24 * 60 * 60;
  document.getElementById("cookie-banner").style.display = "none";
}
```

---

## 🔧 Customization

- Edit **views** in `resources/views/vendor/cookie-consent/`
- Modify **translations** in `resources/lang/vendor/cookie-consent/`
- Adjust **CSS styles** in `public/css/cookie.css`

To enable visitors to change settings you can place a button in your code

```blade
<!-- Open modal -->
<button onclick="openCookieModal()" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
    Settings
</button>
```

To display map after user gave permission you can use

```blade
@if(isset($_COOKIE['maps_cookies']) && $_COOKIE['maps_cookies'] === 'granted')
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.98288205065!2d2.291906376485278!3d48.85837360070764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffelturm!5e0!3m2!1sde!2sat!4v1738785000996!5m2!1sde!2sat"
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    @else
    <div class="bg-gray-200 p-4 text-center">
        <p>{{ __('cookie-consent::messages.enable_map') }}</p>
        <button onclick="openCookieModal()" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {{ __('cookie-consent::messages.cookie_settings') }}
        </button>
    </div>
@endif
```

---

## 📄 License

This package is licensed under the [MIT License](LICENSE).

---
