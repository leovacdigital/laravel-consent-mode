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

### 2️⃣ Add the Google Tag after <head>

```blade
@include('cookie-consent::gtm')
```

### 2️⃣ Add the noscript Tag after <body>

You can add the modal for cookie settings anywhere in your layout:

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

---

## 📄 License

This package is licensed under the [MIT License](LICENSE).

---
