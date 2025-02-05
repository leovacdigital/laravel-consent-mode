<?php

use Illuminate\Support\Facades\Route;

Route::get('/cookie-consent', function () {
    return view('consent::cookie-banner');
})->name('cookie.consent');
