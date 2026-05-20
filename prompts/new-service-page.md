# Nieuwe dienstpagina

Voor het toevoegen van een nieuwe `/dienst-naam.html` aan het ecosysteem.

---

Lees eerst:
- `dienst-template.html` (de orphan template die als basis dient)
- Een bestaande dienstpagina, bijvoorbeeld `fractional-cco.html`, voor de feitelijke structuur
- `docs/business-rules.md` voor content-regels
- `docs/design-system.md` voor visuele rules
- `docs/vision.md` voor tone

Bouwstappen:
1. `git checkout -b feature/dienst-<korte-naam>`
2. Kopieer `dienst-template.html` naar `<naam>.html`
3. Vul in:
   - `<title>`: `[Dienst] — Bureau DNK`
   - `<meta name="description">`: actief, max 155 tekens
   - `<link rel="canonical">`: `https://bureaudnk.nl/<naam>.html`
   - OG-tags: og:url, og:title, og:description (matchen met page-content)
   - Twitter-tags: idem
   - JSON-LD: Service-schema met provider Bureau DNK
   - H1, eyebrow, body-content, CTA's
4. Voeg toe aan `sitemap.xml` met `lastmod` en `priority`
5. Verwijder `<meta name="robots" content="noindex,nofollow">` (die zit in de template voor de orphan)
6. Link de pagina vanaf:
   - Homepage diensten-grid
   - Footer-nav op alle pagina's
7. Test alle pagina's waar je linked (geen 404's)
8. Lokaal testen: mobiel + desktop, beide nav-states, console errors
9. Commit in NL met dienst-naam in de subject
10. Merge `--no-ff` lokaal
11. Wacht op "push"

Na deploy:
- Quick check of de pagina in Google's site:bureaudnk.nl zoekopdracht verschijnt (24-48u na deploy)
- Open Graph card preview op LinkedIn werkt (opengraph.xyz of LinkedIn Post Inspector)
