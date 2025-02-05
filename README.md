# Laravel Consent Mode

**GDPR Compliant Google Consent Mode V2 for Laravel**

This package provides an easy way to implement **Google Consent Mode V2** in Laravel applications while complying with GDPR regulations.

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
            'label' => 'Necessary Cookies',
            'required' => true,
            'gtag_key' => 'security_storage',
            'cookies' => ['XSRF-TOKEN', 'laravel_session'],
        ],
        'analytics' => [
            'label' => 'Analytics Cookies',
            'required' => false,
            'gtag_key' => 'analytics_storage',
            'cookies' => ['_ga', '_gid', '_gat'],
        ],
        'ads' => [
            'label' => 'Marketing Cookies',
            'required' => false,
            'gtag_key' => 'ad_storage',
            'cookies' => ['_gads', '_fbp'],
        ],
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

Include the following Blade directive in your main layout (e.g., `resources/views/layouts/app.blade.php`):

```blade
@include('consent::cookie-banner')
```

### 2️⃣ Add the consent modal

You can add the modal for cookie settings anywhere in your layout:

```blade
@include('consent::cookie-settings')
```

### 3️⃣ JavaScript

Ensure that the JavaScript file is included in your layout:

```blade
<script src="{{ asset('js/cookie.js') }}"></script>
```

This script will handle cookie consent logic and update Google Tag Manager accordingly.

---

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

---

## 📄 License

This package is licensed under the [MIT License](LICENSE).

---
