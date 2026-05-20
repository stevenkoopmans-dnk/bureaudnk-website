# Bureau DNK Website

Repo voor [bureaudnk.nl](https://bureaudnk.nl), de site van Bureau DNK (eigenaar Steven Koopmans, De Nieuwe Kamer B.V., Rotterdam).

Statische site. Vanilla HTML/CSS/JS. Hosting op Cloudflare Pages. Contactformulier loopt via Formspree.

## Snel aan de slag

```bash
git clone git@github.com:stevenkoopmans-dnk/bureaudnk-website.git
cd bureaudnk-website
python3 -m http.server 3456
# open http://localhost:3456
```

Of via Claude Preview: `.claude/launch.json` heeft een launch-config met de naam `bureaudnk`.

## Documentatie

Lees in deze volgorde, ook als Claude:

1. [docs/vision.md](docs/vision.md), wat dit project is en niet is
2. [docs/business-rules.md](docs/business-rules.md), conversiedoel, tone, content-regels
3. [docs/architecture.md](docs/architecture.md), structuur, hosting, deploy, git-workflow
4. [docs/conventions.md](docs/conventions.md), HTML/CSS/JS-stijl, lokaal testen, branchewerk
5. [docs/design-system.md](docs/design-system.md), kleuren, type, spacing, nav-gedrag, page-scoped overrides
6. [docs/api-rules.md](docs/api-rules.md), Formspree-endpoint, GTM, externe diensten
7. [prompts/](prompts/), herbruikbare sessie-templates per type werk

Voor sessie-context: [CLAUDE.md](CLAUDE.md) in de root staat dat allemaal samen plus de project-specifieke instructies.

## Wat hier draait

| Onderdeel | Waar | Notitie |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | Geen framework, geen build |
| Hosting | Cloudflare Pages | Push naar main triggert deploy |
| Contactformulier | Formspree (form-id `meervzby`) | Mailt door naar `steven@bureaudnk.nl` |
| Inkomende mail | Google Workspace | MX niet aanraken |
| Analytics | Google Tag Manager (`GTM-5SL2MLZ4`) | |

## Verantwoordelijke

Steven Koopmans, De Nieuwe Kamer B.V., Rotterdam. Wijzigingen aan business-rules of design-system altijd via expliciet overleg.
