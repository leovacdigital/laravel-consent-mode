<?php

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
        ],
        'functionality' => [
            'label' => 'functionality',
            'description' => 'functionality_description',
            'required' => true,
            'gtag_key' => 'functionality_storage',
            'cookies' => ['lang_pref', 'theme_pref'],
        ],
        'maps' => [
            'label' => 'maps',
            'description' => 'maps_description',
            'required' => false,
            'gtag_key' => 'maps',
            'cookies' => ['NID', 'SID', 'SAPISID', 'APISID', 'SSID', 'HSID', '1P_JAR', 'OTZ', 'SEARCH_SAMESITE'],
        ],
        'analytics' => [
            'label' => 'analytics',
            'description' => 'analytics_description',
            'required' => false,
            'gtag_key' => 'analytics_storage',
            'cookies' => ['_ga', '_gid', '_gat'],
        ],
        'ads' => [
            'label' => 'ads',
            'description' => 'ads_description',
            'required' => false,
            'gtag_key' => 'ad_storage',
            'cookies' => ['_gads', '_fbp'],
        ],
        'ad_user_data' => [
            'label' => 'ad_user_data',
            'description' => 'ad_user_data_description',
            'required' => false,
            'gtag_key' => 'ad_user_data',
            'cookies' => [],
        ],
        'ad_personalization' => [
            'label' => 'ad_personalization',
            'description' => 'ad_personalization_description',
            'required' => false,
            'gtag_key' => 'ad_personalization',
            'cookies' => [],
        ],
        'personalization' => [
            'label' => 'personalization',
            'description' => 'personalization_description',
            'required' => false,
            'gtag_key' => 'personalization_storage',
            'cookies' => ['_uetsid', '_uetvid'],
        ],
    ],

    'default_consent' => [
        'ad_storage' => 'denied',
        'ad_user_data' => 'denied',
        'maps' => 'denied',
        'ad_personalization' => 'denied',
        'analytics_storage' => 'denied',
        'functionality_storage' => 'denied',
        'personalization_storage' => 'denied',
        'security_storage' => 'granted'
    ]
];
