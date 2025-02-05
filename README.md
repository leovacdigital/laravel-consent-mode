📖 Laravel Consent Mode V2 - User Guide

✨ Introduction

This package enables Google Consent Mode V2 implementation in Laravel applications in a GDPR-compliant manner. It provides cookie configuration options, user consent management, and automatic integration with Google Tag Manager.

🛠 1. Installation

Run the following command in your Laravel project:

composer require radosavleovac/laravel-consent-mode

Publish Configuration Files

After installing the package, publish the necessary files to customize the settings:

php artisan vendor:publish --tag=consent-config
php artisan vendor:publish --tag=cookie-consent-views
php artisan vendor:publish --tag=cookie-consent-translations
php artisan vendor:publish --tag=consent-assets
