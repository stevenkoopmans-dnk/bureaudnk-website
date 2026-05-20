# Copy-update

Voor tekstwijzigingen op een bestaande pagina. Geen layout, geen CSS, geen nieuwe componenten.

---

Lees eerst:
- `docs/vision.md` voor tone en positionering
- `docs/business-rules.md` voor wat wel/niet mag in copy
- De pagina zelf om de bestaande stijl en structuur te zien

Tone-regels (kort):
- Scherp, direct, geen agentuurjargon
- Geen em-dashes (`—`). Komma, punt, dubbele punt, haakjes
- Geen "wij geloven", "in een wereld waar", "het is essentieel"
- Geen drie-bullets met buzzwords
- Schrijf wat je concreet doet, voor wie, met welk gevolg

Belangrijke regels voor wijzigingen:
- Tagline "Commerciële groei. Zonder ruis." nooit wijzigen zonder Steve
- CTA-tekst altijd consistent: "Plan gesprek" (nav) en "Koffie en kennismaken" (hero)
- Geen prijzen, geen pakketten, geen klantnamen zonder Steve's akkoord
- Title-tag format: `[Onderwerp] — Bureau DNK`
- Meta description: actief geformuleerd, max 155 tekens

Workflow:
1. `git checkout -b feature/copy-<korte-omschrijving>`
2. Pas alleen de tekst aan. Geen layout/CSS edits
3. Check meta-tags én h1/h2/h3 als je een title-onderwerp wijzigt (canonical, og:title, twitter:title moeten matchen)
4. Quick visuele check op productie-grootte (zinnen lopen niet over twee regels op desktop terwijl het er één moet zijn)
5. `git diff` reviewen
6. Commit in NL met onderwerp van de copy-update
7. Merge `--no-ff` lokaal
8. Wacht op "push"

Speciaal als je copy in dienst-pagina's wijzigt: check of de homepage-link of footer-link nog correct verwijst (titel of slug kan wijzigen).
