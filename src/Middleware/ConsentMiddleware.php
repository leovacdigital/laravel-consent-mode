<?php

namespace Radosavleovac\LaravelConsentMode\Middleware;

use Closure;
use Illuminate\Http\Request;

class ConsentMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $cookieName = config('consent.cookie_name');

        if (!$request->hasCookie($cookieName)) {
            // Ako korisnik nije dao saglasnost, koristimo podrazumevane vrednosti
            session()->put('consent', config('consent.default_consent'));
        } else {
            // Ako korisnik ima saglasnost, koristimo njegove vrednosti
            session()->put('consent', json_decode($request->cookie($cookieName), true));
        }

        return $next($request);
    }
}
