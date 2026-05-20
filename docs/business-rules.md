# Business rules — Bureau DNK

Regels die niet uit de code af te leiden zijn. Wanneer code en deze regels conflicteren is dit document leidend, en moet de code aangepast worden.

## Conversiedoel

- **Primair:** Gesprek inplannen. CTA-tekst: "Koffie en kennismaken" (hero) en "Plan gesprek" (nav)
- **Secundair:** LinkedIn-verbinding (steven.koopmans op linkedin.com)
- **Geen tertiair conversiepunt.** Geen nieuwsbriefinschrijving, geen download, geen lead magnet

## CTA-regels

- Iedere pagina heeft minimaal twee CTA's: nav-CTA bovenin en CTA-sectie onderaan
- Primaire CTA-tekst is altijd dezelfde formulering. Geen variaties als "Neem contact op" of "Vrijblijvend gesprek"
- Alle CTA's gaan naar `/contact.html`. Niet naar een Calendly-embed, niet direct naar email
- CTA's openen niet in nieuw tabblad (geen `target="_blank"` op interne CTA's). LinkedIn wel

## Leads-endpoint

- Lead-mails gaan via `POST https://formspree.io/f/meervzby` → Formspree → Steve's Gmail op `steven@bureaudnk.nl`
- Geen CRM-koppeling op deze site. Leads landen in Steve's inbox en gaan van daar handmatig in Pipedrive of vergelijkbaar
- Test na elke deploy die `contact.html` raakt: stuur een testbericht via productie en bevestig ontvangst (eerste keer ooit eerst de Formspree-verificatiemail bevestigen)

Zie ook [api-rules.md](api-rules.md) voor de technische kant.

## Doelgroep en tone

Zie [vision.md](vision.md) voor de volledige positionering. Korte versie:

- **Doelgroep:** founders en directeuren van digital agencies en eCommerce-bedrijven die commercieel vastlopen of willen opschalen
- **Tone:** scherp, direct, zonder ruis. Adviseur op directieniveau, geen bureau dat zichzelf aanprijst
- **Vermijd:** "wij geloven", "in een wereld waar", "het is essentieel", "groei-experts", driepuntsopsommingen met buzzwords, alle vormen van agentuurjargon
- **Schrijf:** wat ik concreet doe, voor wie, met welke gevolgen. Voorbeelden in plaats van adjectieven

**Geen em-dashes (`—`).** Komma, punt, dubbele punt of haakjes. Geldt voor alle output: site-copy, mail-templates, code-comments, commit messages.

## SEO-uitgangspunten

- **Type site:** persoonlijke/zakelijke positionering, geen lokale dienstensite. Geen LocalBusiness JSON-LD, wel Person of Organization schema
- **Focus zoekwoorden:** fractional CCO, commerciële strategie digital agency, eCommerce strategie Rotterdam
- **Title-format:** `[Onderwerp] — Bureau DNK` (em-dash hier is bewust, technische SEO-conventie voor title-tags)
- **LinkedIn is primair kanaal.** De site ondersteunt, LinkedIn converteert. Posts en outreach drijven traffic

## Inhoud per pagina

- **Homepage:** propositie, diensten 01-05, impact-block, CTA-sectie
- **Over:** Steve's achtergrond, waarom De Nieuwe Kamer / Rotterdam, persoonlijke aanpak
- **Contact:** formulier (naam, bedrijf, telefoon, bericht) + LinkedIn als alternatief
- **Dienstpagina's:** elk volgt hetzelfde stramien (zie `dienst-template.html`). Probleem → aanpak → resultaat → CTA
- **Privacy en algemene voorwaarden:** orphan pagina's. Niet in nav, wel in footer. Inhoud bijhouden zodra de praktijk verandert

## Regels die niet veranderen zonder Steve

- Tagline "Commerciële groei. Zonder ruis." Dit is de positionering
- Conversie-pad (formulier in plaats van Calendly-eerst)
- Geen prijzen of tarieven op de site
- Geen klantnamen of cases zonder expliciete toestemming
- Geen testimonials zonder verifieerbare bron

## Wat hier nooit gebeurt

- Geen `mailto:` als primaire of secundaire conversie
- Geen pop-ups of intent-exit modals
- Geen cookies-banner met opt-in tenzij wettelijk vereist
- Geen externe widgets (Intercom, Drift, etc.)
- Geen lead magnets, e-books, "gratis scan" download-funnels
- Geen prijs-pagina, geen pakketten-pagina

## Verantwoordelijke

Steven Koopmans (eigenaar, De Nieuwe Kamer B.V.). Wijzigingen aan deze rules altijd via expliciet akkoord van Steve, niet via een feature-branch zonder overleg.
