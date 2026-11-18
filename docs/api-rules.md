# API-rules — Bureau DNK

Eigen formulier-endpoint plus drie externe afhankelijkheden. Klein oppervlak, houd het zo.

## Contactformulier: eigen Worker

- **Endpoint:** `POST /api/contact` (zelfde domein, dus geen CORS nodig op productie)
- **Worker:** `bureaudnk-contact`, code en config in [worker/](../worker/). Route: `bureaudnk.nl/api/contact`
- **Body:** `FormData` of JSON
- **Velden:**
  - `naam` (verplicht)
  - `telefoon` (verplicht)
  - `bedrijf` en `bericht` (in het formulier verplicht, de Worker eist ze niet)
  - `_gotcha` (hidden honeypot, leeg houden)
  - `t` (milliseconden sinds het laden van de pagina, door het script toegevoegd)

**Responses:**
- `200 { ok: true }`: verstuurd. Ook bij spam (honeypot gevuld of binnen 2,5 seconde verstuurd), maar dan wordt er niets gemaild
- `403`: de `Origin` is niet `https://bureaudnk.nl`
- `422`: naam of telefoon ontbreekt
- `429`: meer dan 5 berichten per minuut vanaf hetzelfde IP
- `502`: mail versturen mislukt

**Mail:** naar `steven@bureaudnk.nl`, afzender `website@administratiekantoordnk.nl`, via Cloudflare Email Routing op administratiekantoordnk.nl. Waarom dat domein: zie [architecture.md](architecture.md), sectie "E-mail en het contactformulier".

**Meting:** na een geslaagde verzending pusht het script `{ event: 'generate_lead', form_id: 'contact' }` naar de `dataLayer`. Een GA4-event daarop richt je in GTM in.

**Deployen en testen van de Worker:**
- Preview: `cd worker && npx wrangler deploy --env preview` (workers.dev-adres, accepteert alleen `http://localhost:3456` als herkomst)
- Live: `cd worker && npx wrangler deploy`
- Een push naar `main` deployt alleen de site, niet de Worker

## Externe diensten

### Google Tag Manager

- **Container:** `GTM-5SL2MLZ4`
- Staat op alle pagina's, ook orphan-pagina's. Verwijder niet zonder Steve's akkoord
- GA4 en eventuele toekomstige tags lopen via deze container. Niets direct in de HTML
- **Consent Mode is actief.** Voor de GTM-snippet staat op elke pagina een inline snippet die alle consent-categorieën op `denied` zet (default). Analytics vuurt dus pas na akkoord. Bij het toevoegen van marketing/ads-tags in GTM: respecteer de consent-signalen, zet niets op "altijd vuren"

### Cookiemelding (consent)

- **Banner:** gebouwd in `main.js` (functie draait op elke pagina), styling in `style.css` onder `── COOKIEMELDING ──`. Geen externe cookie-tool
- **Mechaniek:** Google Consent Mode v2. Inline snippet in de `<head>` (vóór GTM) zet default `analytics_storage: denied`. Bij "Accepteren" roept `main.js` `gtag('consent','update',{analytics_storage:'granted'})` aan en slaat de keuze op in `localStorage` (`dnk-consent` = `granted`/`denied`)
- **Onthouden:** zolang `dnk-consent` bestaat verschijnt de banner niet opnieuw en wordt de keuze bij paginaload direct hersteld (in de inline head-snippet). Wissen = `localStorage.removeItem('dnk-consent')`
- **Bij nieuwe pagina's:** neem zowel de inline consent-default-snippet (vóór GTM) als `main.js` mee, anders draait analytics zonder toestemming of verschijnt de banner niet
- De privacyverklaring (`/privacy`) beschrijft het gebruik; de banner linkt ernaar

### Google Fonts

- `Bodoni Moda` (display/wordmark), `Newsreader` (leesbare serif-koppen), `Instrument Sans` (body)
- Via `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">`
- `preconnect` op `fonts.googleapis.com` en `fonts.gstatic.com` voor laadsnelheid

### Cloudflare Pages

- Geen API-calls vanaf de site (alleen build-pipeline + DNS)
- 301-redirects in Cloudflare dashboard, niet in repo. Eerder is `_redirects` verwijderd omdat absolute URLs niet werden ondersteund (commit 40fc0bc)

### Google Workspace (inkomende mail)

- MX-records voor `bureaudnk.nl` wijzen naar Google (`aspmx.l.google.com` + alt1-4)
- TXT SPF: `v=spf1 include:_spf.google.com ~all`
- **Niet aanraken.** Zonder deze records bereiken mails niet meer `steven@bureaudnk.nl`. Cloudflare's eigen Email Routing-popup vraagt om deze records te deleten als je hun service activeert. Doe dat niet

## Regels voor toekomstige integraties

- **Geen tracking pixels direct in HTML.** Alles via GTM
- **Geen client-side API-keys.** Als iets een key nodig heeft die de browser nooit mag zien, hoort het in de Worker. Houd die minimaal
- **Geen externe form-providers** tenzij Steve er expliciet om vraagt. Formspree is er in november 2026 bewust uitgehaald
- **Calendly of vergelijkbaar:** mag als secundair conversiepad, achter de "Plan gesprek" CTA. Het formulier blijft primair
- **Rate-limiting:** zit in de Worker (5 per minuut per IP)
- **Spam:** honeypot `_gotcha`, tijdscheck en herkomstcheck. Als er toch spam komt: eerst monitoren, dan Cloudflare Turnstile overwegen

## Wat we expliciet niet doen

- Geen Email Routing op bureaudnk.nl zelf. Conflicteert met de Google Workspace-MX. De Worker verstuurt daarom via administratiekantoordnk.nl
- De oude Pages Function `functions/contact.js` niet terugzetten
