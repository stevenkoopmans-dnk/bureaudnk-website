# Architecture — Bureau DNK

Statische site. Geen build-stap, geen framework. Edit, commit, push, deploy.

## Map- en bestandsstructuur

```
bureaudnk/
├── CLAUDE.md                  Snelle oriëntatie voor Claude per project
├── README.md                  Repo-overzicht voor lezers
├── index.html                 Homepage
├── over.html                  Over Bureau DNK
├── contact.html               Contactformulier
├── fractional-cco.html        Dienst 01
├── ecommerce-strategie.html   Dienst 02
├── positionering.html         Dienst 03
├── sales-structuur.html       Dienst 04
├── klantgroei.html            Dienst 05
├── dienst-template.html       Template voor nieuwe dienst (noindex)
├── privacy.html               Privacyverklaring (orphan, in footer)
├── algemene-voorwaarden.html  Algemene voorwaarden (orphan, in footer)
├── og-image.html              Render-source voor og-image.png (noindex)
├── style.css                  Gedeelde tokens, nav, footer, animaties
├── main.js                    Nav scroll-effect + IntersectionObserver reveal
├── sitemap.xml                Statische sitemap
├── robots.txt                 Crawl-regels
├── logo_zwart.png             Logo (zwart, wordt geïnverteerd waar nodig)
├── og-image.png               Open Graph share-afbeelding
├── favicon.png                Favicon
├── rotterdam.jpg              Hero-afbeelding homepage
├── centralpost.png            Hero-afbeelding over.html
├── docs/                      Documentatie (deze map)
└── prompts/                   Sessie-templates voor terugkerende werkzaamheden
```

Page-specifieke styling staat inline in een `<style>` blok in de `<head>` van elke pagina. Gedeelde stijlen (tokens, nav, footer, knoppen, animaties) staan in `style.css`. Page-specifieke componenten en overrides blijven in de pagina zelf.

## Hosting en deploy

- **Hosting:** Cloudflare Pages. Push naar `main` op GitHub triggert een build en deploy. Geen handmatige upload.
- **Domein:** `bureaudnk.nl`. WWW redirect via 301 (zie commit 3a05174).
- **Repo:** `github.com/stevenkoopmans-dnk/bureaudnk-website`.

Globale CLAUDE.md noemt Firebase Hosting als standaard voor andere projecten. Voor Bureau DNK geldt Cloudflare Pages. Houd de projectspecifieke setup aan.

## E-mail en het contactformulier

Dit is veranderd in mei 2026. Lees dit voor je iets aan de mailflow doet.

**Hoe het werkt:**
- Het contactformulier post direct naar Formspree (`https://formspree.io/f/meervzby`)
- Formspree mailt door naar `steven@bureaudnk.nl`
- Geen eigen serverless function meer (oude `functions/contact.js` is verwijderd)

**Waarom niet Cloudflare Email Routing:**
We hebben dit geprobeerd. Cloudflare Email Routing vereist dat je MX-records bij Cloudflare staan. Bureau DNK gebruikt **Google Workspace** voor inkomende mail (MX wijst naar `aspmx.l.google.com`). Die twee zijn wederzijds exclusief op DNS-niveau. Email Routing zou Google MX overschrijven en alle inkomende mail naar `*@bureaudnk.nl` breken. Dus niet bruikbaar.

**Volg dit nooit op:** "we hebben toch een Cloudflare-function voor de form?" Nee. Die is bewust verwijderd. Zie commit `e60147f`.

## Routing

Static HTML per pad. Geen server-side routing.

- `/` serveert `index.html`
- `/over.html`, `/contact.html` etc. direct gemapt op bestanden
- `/og-image.html` en `/dienst-template.html` zijn geblokkeerd in `robots.txt` en hebben `<meta name="robots" content="noindex">`
- Form-submit gaat naar `https://formspree.io/f/meervzby` (cross-origin POST via fetch, JSON-response)

## Git-workflow

Branches:
```
main          → live (push triggert deploy)
feature/xyz   → één wijziging per branch, in NL beschreven
```

Stappen per wijziging:
1. `git checkout -b feature/naam`
2. Bouw + commit met Nederlandse commit message (één regel, beschrijvend)
3. Verifieer lokaal in de browser (zie [conventions.md](conventions.md))
4. `git checkout main && git merge --no-ff feature/naam -m "Merge feature/naam"`
5. **Wacht op expliciete bevestiging van Steve voor `git push`.** Push is deploy.
6. `git push origin main`
7. `git branch -d feature/naam`

Direct committen op `main` gebeurt af en toe in de history (oudere commits), maar dat is niet de bedoeling.

## Externe afhankelijkheden

- **Formspree** (form-id `meervzby`), contactformulier, mailt door naar `steven@bureaudnk.nl`
- **Google Tag Manager** (`GTM-5SL2MLZ4`), staat op alle pagina's
- **Google Fonts:** Cormorant Garamond + Instrument Sans
- **Google Workspace:** inkomende mail voor `*@bureaudnk.nl` (MX-records bij Google, niet aanraken)

Geen npm, geen bundler, geen CI. Wat in de repo staat is wat de browser krijgt.

## Wat hier nooit komt

- Geen React, Vue, Svelte. Vanilla HTML/CSS/JS
- Geen CSS-preprocessor
- Geen CMS
- Geen analytics buiten GTM om
- Geen secrets in code of commits
- Geen eigen mailserver of email-function (zie email-sectie hierboven)
