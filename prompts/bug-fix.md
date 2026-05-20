# Bug-fix

Voor een regressie of fout in bestaand gedrag. Niet voor nieuwe features.

---

Lees eerst:
- De relevante pagina(s) of CSS-bestand
- `docs/conventions.md` voor selector-scoping en testroutine

Diagnose voor je fixt:
1. Reproduceer de bug. Mobiel én desktop. Beide nav-states als de bug daarmee te maken heeft
2. Bepaal de root cause, niet alleen het symptoom
3. Check of dezelfde fout op meer plekken zit (zelfde patroon kan elders ook breken)

Bekende klassen van problemen in deze codebase:
- **Te brede selectors:** generieke `nav { ... }` raakte de footer-nav. Hoofdnav-styling moet altijd `nav#nav` scoped zijn
- **Ontbrekende `id="nav"` op een pagina:** breekt zowel de scoped CSS als de scroll-listener in main.js
- **Cache:** lokale browser cachet `style.css`, hard reload of `?cb=Date.now()` op de href
- **Email-routing-conflict:** Cloudflare Email Routing kan niet aan, MX van bureaudnk.nl zijn van Google Workspace. Niet opnieuw proberen
- **Formspree first-submit verification:** eerste keer ooit krijg je een bevestigingsmail, niet de echte lead. Daarna gewoon

Workflow:
1. `git checkout -b feature/fix-<wat>`
2. Fix één onderwerp. Geen ongerelateerde "while I'm here" cleanups
3. Lokaal verifiëren dat de bug weg is
4. Check of de fix nergens iets anders breekt (klik door alle pagina's als de fix in `style.css` of een gedeeld component zit)
5. `git diff` reviewen
6. Commit in NL, beschrijvend. Vermeld de root cause in de body als die niet evident is
7. Merge `--no-ff` naar main lokaal
8. Wacht op "push" van Steve
