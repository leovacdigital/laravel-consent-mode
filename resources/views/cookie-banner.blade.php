<script>
    window.categories = @json(config('consent.categories'));
</script>
<script src="{{ asset('js/cookie.js') }}"></script>

<!-- Cookie Banner - Prikazuje se ako korisnik nije prihvatio kolačiće -->
<!-- Pozadinski overlay -->
<div id="cookie-overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 px-4 flex items-center justify-center z-1 
    @if(isset($_COOKIE['cookie_consent'])) hidden @endif">

    <!-- Cookie Banner -->
    <div id="cookie-banner" class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <p class="text-lg font-semibold">{{ __('cookie-consent::messages.cookie_settings') }}</p>
        <p class="mt-2 text-sm">{{ __('cookie-consent::messages.description') }}</p>

        <div class="mt-4 flex flex-wrap gap-3 justify-center">
            <!-- Prihvati sve kolačiće -->
            <button onclick="acceptAllCookies()"
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                {{ __('cookie-consent::messages.accept_all') }}
            </button>

            <!-- Prihvati samo neophodne kolačiće -->
            <button onclick="acceptEssentialCookies()"
                class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                {{ __('cookie-consent::messages.accept_essential') }}
            </button>

            <!-- Otvori podešavanja -->
            <button onclick="openCookieModal()"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                {{ __('cookie-consent::messages.cookie_settings') }}
            </button>
        </div>
    </div>
</div>

<!-- Modal za podešavanje kolačića -->
<div id="cookie-settings" class="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center hidden">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative overflow-y-auto max-h-[90vh]">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ __('cookie-consent::messages.cookie_settings') }}</h2>

        @foreach(config('consent.categories') as $category => $details)
        <div class="flex flex-col items-start mb-3">
            <div>
                <input type="checkbox" id="{{ $category }}_cookies" name="{{ $category }}_cookies" value="granted"
                    class="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" {{ $details['required'] ||
                    $details['gtag_key']==='security_storage' ? 'checked disabled' : (isset($_COOKIE[$category
                    . '_cookies' ]) && $_COOKIE[$category . '_cookies' ]==='granted' ? 'checked' : '' ) }}>
                <label for="{{ $category }}_cookies" class="ml-2 font-semibold text-gray-700">
                    {{ __('cookie-consent::cookies.' . $details['label']) }}
                </label>
            </div>
            <p class="text-gray-800">{{ __('cookie-consent::cookies.' . $details['description']) }}</p>
        </div>
        @endforeach

        <div class="mt-4 flex justify-between">
            <button type="button" onclick="acceptSelectedCookies()"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                {{ __('cookie-consent::messages.save') }}
            </button>

            <button type="button" onclick="denyCookies()"
                class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                {{ __('cookie-consent::messages.reject') }}
            </button>
        </div>

        <!-- Dugme za zatvaranje -->
        <button onclick="closeCookieModal()" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            ✖
        </button>
    </div>
</div>