# Conventions — Bureau DNK

## HTML

- Eén `<h1>` per pagina. Subsecties krijgen `<h2>`/`<h3>`.
- Mobile-first. Layouts werken eerst op 375 breed, daarna `@media (min-width: 960px)` voor desktop. Andere breakpoints alleen waar nodig.
- Sectiecomments boven elk hoofdblok:
  ```html
  <!-- NAV -->
  <!-- HERO -->
  <!-- DIENSTEN -->
  <!-- FOOTER -->
  ```
- De hoofdnav heeft **altijd** `id="nav"` (zie [design-system.md](design-system.md) voor waarom). De footer-nav is `<nav class="footer-nav">` zonder id.
- Alt-teksten zijn beschrijvend. Geen `alt="image"` of lege alts op content-afbeeldingen.
- Open Graph + canonical + JSON-LD op iedere indexeerbare pagina. Orphan-pagina's (`og-image.html`, `dienst-template.html`) krijgen `<meta name="robots" content="noindex,nofollow">`.

## CSS

- Tokens en gedeelde stijlen in [style.css](../style.css). Daar alleen wijzigen wat echt cross-page is.
- Page-specifieke CSS in een `<style>` blok in de `<head>` van die pagina. Niet in een aparte file per pagina.
- **Inline `<style>` staat ná `<link rel="stylesheet" href="/style.css">` zodat page-overrides winnen bij gelijke specificity.** Houd die volgorde aan.
- Geen inline `style=""` op elementen.
- BEM-achtige class-naming: `.dienst`, `.dienst__title`, `.dienst--featured`. Korte component-namen volstaan ook (`.hero-left`, `.cta-bg-text`).
- Eén design-token bron: de CSS custom properties in `:root` van [style.css](../style.css). Geen hardcoded hex of px-stappen buiten dat systeem.
- Selectors moeten **scoped** zijn. Lesson learned (mei 2026): generieke `nav { position: fixed }` raakte ook `<nav class="footer-nav">`, gaf een spookmenu bovenin op mobiel. Sindsdien is alle hoofdnav-styling gescoped op `nav#nav`.
- Page-scoped nav-overrides (bijv. teal balk op contact.html) gebruiken `nav#nav` selectors in het inline blok; geen body-classes.

## JavaScript

- Geen frameworks. Geen build-stap.
- [main.js](../main.js) is de enige globale script. Houd hem klein.
  - Nav scroll-effect (toggle `.scrolled` na `window.scrollY > 60`)
  - IntersectionObserver voor `.reveal`, `.reveal-left`, `.reveal-right` met optionele `data-delay`
- Page-specifieke JS in een `<script>` blok onderaan de body. Alleen als het echt page-eigen is.
- Bij forms: progressive enhancement via fetch (zie contact.html). Form blijft werkbaar als JS faalt.

## Lokale dev en verificatie

Twee opties om lokaal te draaien:

```bash
cd /Users/stevenkoopmans/claude-projects/bureaudnk
python3 -m http.server 3456
# open http://localhost:3456
```

Of via Claude Preview (`mcp__Claude_Preview__preview_start name=bureaudnk`). De launch-config staat in `.claude/launch.json`.

**Cache-gotcha:** bij lokaal testen na een CSS-edit cachet de browser de oude `style.css`. Hard reload (cmd-shift-R) of via dev-tools cache-bust. In Claude Preview gebruik je `?cb=Date.now()` op de stylesheet href om verse versie te forceren. Zonder cache-bust krijg je misleidende screenshots.

**Wat te testen voor je commit:**
- Mobiel (375 breed) én desktop (1280+)
- Beide nav-states: top + na scroll (`window.scrollY > 60`)
- Console errors check
- Bij nieuwe links: geen 404's

## Naming

- Bestanden: kebab-case, NL als content NL is (`sales-structuur.html`)
- Branches: `feature/korte-omschrijving` in NL
- Tags: `vMAJOR.MINOR` semver-light, alleen voor release-waardige states
- Commit messages: Nederlands, één korte regel, beschrijvend. Voorbeelden uit de log:
  - "Scope nav-styling naar nav#nav om footer-nav niet te raken"
  - "Vervang Cloudflare-function door directe Formspree-submit"
  - "Vaste teal nav-balk op contact met inverted items"
- Co-author footer met `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` op commits die met Claude zijn gedaan

## Per branch

- Eén onderwerp per branch. Niet vier dingen tegelijk
- Lokaal testen op mobiel + desktop in beide nav-states
- Console errors check
- Voor forms: post-flow lokaal mocken (geen echte test-leads naar productie)
- Commit op feature branch → merge `--no-ff` naar main → wacht op expliciete push-bevestiging

## Wat nooit gebeurt

- Geen direct commit op `main` zonder dat Steve het heeft gezien (tenzij Steve er expliciet om vraagt)
- Geen inline styles toevoegen
- Geen `mailto:` als formulier-alternatief
- Geen frameworks of build-tooling introduceren
- Geen alts laten staan als `alt=""` op content-afbeeldingen
- Geen em-dashes ("—") in tekst, copy of code-comments. Komma, punt, dubbele punt of haakjes
- Geen secrets in code of commits
- Geen `git push --force` op main
