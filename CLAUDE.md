# CLAUDE.md, Bureau DNK Website

**Project:** bureaudnk.nl
**Map:** `bureaudnk/`
**Eigenaar:** Steven Koopmans, eigen bedrijf, volledige autonomie
**Laatste update:** mei 2026

Dit is de korte oriëntatie. De volledige documentatie staat in [docs/](docs/) en [prompts/](prompts/).

---

## Lees dit eerst (in deze volgorde)

1. [docs/vision.md](docs/vision.md), wat dit project is en niet is
2. [docs/business-rules.md](docs/business-rules.md), conversiedoel, tone, content-regels
3. [docs/architecture.md](docs/architecture.md), structuur, hosting, deploy, git-workflow
4. [docs/conventions.md](docs/conventions.md), HTML/CSS/JS-stijl, lokaal testen, branchewerk
5. [docs/design-system.md](docs/design-system.md), kleuren, type, spacing, nav-gedrag, page-scoped overrides
6. [docs/api-rules.md](docs/api-rules.md), Formspree-endpoint, GTM, externe diensten

Voor terugkerend werk gebruik je een template uit [prompts/](prompts/), zoals `prompts/new-feature.md`, `prompts/bug-fix.md`, `prompts/copy-update.md`, `prompts/new-service-page.md`, `prompts/deploy-check.md`.

Voor het kicken van een nieuwe sessie: `prompts/session-kickoff.md`.

## In één alinea

Statische site (vanilla HTML/CSS/JS) voor bureaudnk.nl, gehost op Cloudflare Pages. Push naar `main` triggert deploy. Contactformulier post naar Formspree (`meervzby`), die mailt naar `steven@bureaudnk.nl`. Inkomende mail loopt via Google Workspace, daarom geen Cloudflare Email Routing. Hoofdnav heeft altijd `id="nav"`, anders breekt de CSS-scope en de scroll-listener.

## Hard rules (altijd toepassen)

- **Eén onderwerp per branch.** Naam in NL: `feature/<korte-omschrijving>`
- **Commit messages in NL.** Eén regel, beschrijvend, geen em-dashes
- **Nooit pushen zonder expliciete bevestiging van Steve.** Push naar main is deploy
- **Geen em-dashes (`—`)** in tekst, copy, mail, code-comments of commit messages. Komma, punt, dubbele punt of haakjes
- **Geen AI-tells.** Geen "het is essentieel", "in een wereld waarin", "in het hedendaagse landschap", verplichte drie-bullets, gladde afsluiters
- **Mobile-first.** Mobiel én desktop testen, beide nav-states (top + na scroll)
- **`nav#nav` voor hoofdnav-styling.** Niet generieke `nav { ... }`
- **Hoofdnav heeft altijd `id="nav"`.** Anders breekt main.js en de scoped CSS
- **Geen secrets in code of commits**
- **Geen frameworks, geen build-tools, geen CSS-preprocessors**
- **Geen `git push --force` op main**

## Belangrijkste gotchas (uit eerdere sessies)

- **Cloudflare Email Routing kan niet aan.** MX van bureaudnk.nl wijst naar Google Workspace. Email Routing zou die overschrijven en alle inkomende mail breken. Niet opnieuw proberen
- **`functions/contact.js` is bewust verwijderd.** De form gebruikt nu Formspree direct. Niet terugzetten zonder Steve
- **Cache bij lokaal testen.** Bust de cache met `?cb=Date.now()` op de stylesheet href, anders zie je verouderde CSS
- **Eerste Formspree-submit ooit triggert een verification-mail.** Pas daarna komen echte leads door
- **Contact.html heeft een eigen teal nav-balk.** Page-scoped override in zijn `<style>` blok, geen body-class

## Project-defaults

- Tagline: "Commerciële groei. Zonder ruis." Nooit wijzigen zonder Steve
- Primaire CTA-tekst: "Plan gesprek" (nav), "Koffie en kennismaken" (hero)
- Lead-endpoint: `steven@bureaudnk.nl` via Formspree (form-id `meervzby`)
- Title-format: `[Onderwerp] — Bureau DNK` (em-dash hier is OK, technische SEO-conventie)
- Breakpoint: 960px is de mobile/desktop switch
- Co-author footer op commits: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`

## Wanneer in twijfel

Lees de relevante doc uit [docs/](docs/). Daar staat het. Wat in docs en code conflicteert: code wint, docs moeten mee.

Wijzigingen aan business-rules, design-system of vision: altijd via expliciet overleg met Steve, niet via een feature-branch.
