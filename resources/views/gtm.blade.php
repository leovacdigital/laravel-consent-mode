@if(config('consent.gtm_id'))
<!-- Google Tag Manager -->
<script>
    window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }

        // Postavljamo podrazumevano stanje saglasnosti na "denied"
        gtag('consent', 'default', @json(config('consent.default_consent')));

        // GTM se učitava uvek, ali poštuje Consent Mode
        (function(w,d,s,l,i){
            w[l]=w[l]||[]; w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id={{ config('consent.gtm_id') }}' + dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ config('consent.gtm_id') }}');
</script>
@endif