@if(config('consent.gtm_id'))
<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id={{ config('consent.gtm_id') }}" height="0" width="0"
        style="display:none;visibility:hidden"></iframe>
</noscript>
@endif