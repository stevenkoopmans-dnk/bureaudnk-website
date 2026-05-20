# API-rules — Bureau DNK

Eén externe form-service plus drie externe afhankelijkheden. Klein oppervlak, houd het zo.

## Contactformulier: Formspree

- **Endpoint:** `https://formspree.io/f/meervzby`
- **Method:** POST
- **Body:** `FormData` (multipart) of JSON
- **Header:** `Accept: application/json` zodat je een JSON-response krijgt in plaats van een redirect (nodig voor de fetch-based UX)
- **Velden in het form:**
  - `naam` (verplicht)
  - `bedrijf` (verplicht)
  - `telefoon` (verplicht)
  - `bericht` (verplicht)
  - `_subject` (hidden, vaste waarde: "Nieuw bericht via bureaudnk.nl")
  - `_gotcha` (hidden honeypot, leeg houden; bots vullen dit, Formspree dropt)

**Response-shape (success):** `{ ok: true, ... }` met status 200.
**Response-shape (validation error):** `{ errors: [{ field, message, code }, ...] }` met status 422.

**Eerste-keer-bevestiging:** Formspree stuurt bij de allereerste submission een verificatiemail naar het inbox-adres (`steven@bureaudnk.nl`). Klik die link voordat echte leads doorkomen. Daarna gaat het normaal.

**Free-tier limiet:** 50 submissions per maand. Voor Bureau DNK ruim genoeg.

**Account en dashboard:** formspree.io, login als Steve. Form-name "Bureau DNK contact" of vergelijkbaar. Hier zie je ook de submission-history en kun je het ontvangstadres wijzigen zonder dat de code aangepast hoeft te worden.

## Externe diensten

### Google Tag Manager

- **Container:** `GTM-5SL2MLZ4`
- Staat op alle pagina's, ook orphan-pagina's. Verwijder niet zonder Steve's akkoord
- GA4 en eventuele toekomstige tags lopen via deze container. Niets direct in de HTML

### Google Fonts

- `Cormorant Garamond` (koppen) en `Instrument Sans` (body)
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
- **Geen client-side API-keys.** Als iets een key nodig heeft die de browser nooit mag zien, hoort het in een Pages Function. Houd die Function minimaal
- **Geen externe form-providers naast Formspree** tenzij Steve er expliciet om vraagt. Eén form is genoeg
- **Calendly of vergelijkbaar:** mag als secundair conversiepad, achter de "Plan gesprek" CTA. Het formulier blijft primair
- **CORS:** Formspree's endpoint accepteert cross-origin POST vanaf bureaudnk.nl. Geen verdere config nodig
- **Rate-limiting:** Formspree handelt dit af. Niet zelf opnieuw bouwen
- **Spam:** honeypot `_gotcha` is genoeg voor het huidige volume. Als spam komt, eerst monitoren, dan eventueel ReCAPTCHA in de Formspree-config zetten (dashboard-only, geen code-wijziging)

## Wat we expliciet niet meer doen

- Geen eigen Cloudflare Pages Function voor mail. De oude `functions/contact.js` is bewust verwijderd. Zie [architecture.md](architecture.md) sectie "E-mail en het contactformulier" voor de reden
- Geen `env.EMAIL.send()` via Cloudflare Workers Email. Vereist Email Routing op DNS-niveau, conflicteert met Google Workspace MX
- Geen Formspree premium-features zonder Steve's akkoord (kost geld, voegt voor dit volume niets toe)
