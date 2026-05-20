# Nieuwe feature

Voor een nieuwe pagina-sectie, component of UI-element. Niet voor copy-only wijzigingen (zie `copy-update.md`).

---

Lees eerst:
- `docs/design-system.md` voor tokens, spacing, knoppen, nav-gedrag
- `docs/conventions.md` voor HTML/CSS-stijl en branchewerk
- De pagina(s) waar de feature komt, om de bestaande structuur te zien

Beschrijf wat je gaat bouwen voordat je code aanraakt:
1. Welke pagina(s) raakt het
2. Wat is het probleem of doel
3. Welke design-tokens gebruik je
4. Wat zijn de mobile- en desktop-states
5. Heeft het page-specifieke CSS nodig of past het in `style.css`

Vraag Steve om akkoord op de aanpak voor je begint te bouwen, tenzij het echt klein en ondubbelzinnig is.

Workflow:
1. `git checkout -b feature/korte-omschrijving`
2. Bouw één onderwerp
3. Lokaal testen: mobiel (375) + desktop (1280), beide nav-states (top + na scroll), console errors
4. `git diff` reviewen voordat je commit
5. Commit in NL, één regel, beschrijvend. Co-author footer met Claude
6. Merge `--no-ff` naar main lokaal
7. Wacht op "push" van Steve

Test-gotchas:
- Cache-bust: `?cb=Date.now()` op stylesheet href, anders zie je verouderde CSS
- Forms: simuleer fetch lokaal, stuur geen echte test-leads naar productie
- Nav: hoofdnav heeft altijd `id="nav"` (anders breekt main.js en de scoped CSS)
