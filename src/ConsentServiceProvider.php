<?php

namespace Radosavleovac\LaravelConsentMode;

use Illuminate\Support\ServiceProvider;

class ConsentServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Objavljivanje konfiguracije
        $this->publishes([
            __DIR__ . '/../config/consent.php' => config_path('consent.php'),
        ], 'consent-config');

        // Objavljivanje JavaScript i CSS fajlova
        $this->publishes([
            __DIR__ . '/../src/Assets/cookie.js' => public_path('js/cookie.js'),
            __DIR__ . '/../src/Assets/cookie.css' => public_path('css/cookie.css'),
        ], 'consent-assets');

        // Učitavanje prevoda
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'cookie-consent');

        // Publikovanje prevoda
        $this->publishes([
            __DIR__ . '/../resources/lang' => lang_path('vendor/cookie-consent'),
        ], 'cookie-consent-translations');

        // **Prvo koristi objavljene Blade view-ove ako postoje, pa tek onda vendor view-ove**
        $this->loadViewsFrom(resource_path('views/vendor/cookie-consent'), 'cookie-consent');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'cookie-consent');

        // Omogući publikovanje view-ova
        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/vendor/cookie-consent'),
        ], 'cookie-consent-views');
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/consent.php', 'consent');
    }
}
