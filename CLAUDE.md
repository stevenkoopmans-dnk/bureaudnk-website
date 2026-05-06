# CLAUDE.md — Bureau DNK Website
**Project:** bureaudnk.nl
**Map:** `bureaudnk Website/`
**Eigenaar:** Steven Koopmans — eigen bedrijf, volledige autonomie
**Laatste update:** mei 2026

---

## 1. Projectcontext

Dit is de website van Bureau DNK — Steve's eigen boutique consultancy voor commerciële groei bij digital agencies en eCommerce teams. De site is een platte, statische one pager. Geen CMS, geen framework — gewoon HTML/CSS/JS.

De bestaande site in deze map is de basis. We verbeteren incrementeel — we herbouwen niet van scratch.

**Doelgroep:** Founders en directeuren van digital agencies en eCommerce bedrijven die commercieel vastlopen of willen opschalen.

**Tone of voice:** Scherp, direct, zonder ruis. Geen agentuurjargon. Geen lijstjes met buzzwords. De site klinkt als een adviseur op directieniveau — niet als een bureau dat zichzelf aanprijst.

---

## 2. Conversiedoel

**Primaire conversie:** Gesprek inplannen ("Plan gesprek" / "Koffie en kennismaken")
**Secundaire conversie:** LinkedIn-verbinding

**CTA-teksten:**
- "Plan gesprek" (nav)
- "Koffie en kennismaken" (hero)

**Formulier:** Geen uitgebreid formulier — doorverwijzing naar Calendly of directe mail
**Lead-endpoint:** Steve's eigen G-Suite Gmail

---

## 3. Design tokens

```css
:root {
  --color-primary:   #1A1714;   /* bijna-zwart — tekst en CTA-knoppen */
  --color-secondary: #F5F2EC;   /* warm off-white — achtergrond */
  --color-accent:    #EDE9D4;   /* licht zand — hover states en subtiele vlakken */
  --color-bg:        #F5F2EC;
  --color-text:      #1A1714;

  --font-heading: 'Cormorant Garamond', serif;   /* koppen — elegant, hoog contrast */
  --font-body:    'Instrument Sans', sans-serif; /* body — clean, leesbaar */
}
```

**Ontwerpprincipes:**
- Warm, minimalistisch, premium — geen koude tech-aesthetic
- Veel witruimte
- Geen afbeeldingen tenzij ze echt waarde toevoegen
- Typografie doet het werk

---

## 4. Sitestructuur

Drie losse HTML-pagina's — geen one pager.

```
index.html    → Homepage — propositie + diensten + CTA
over.html     → Over Bureau DNK — Steven's achtergrond en aanpak
contact.html  → Contactformulier + LinkedIn
```

**Navigatie (alle pagina's):**
```
HOME | OVER | CONTACT | KOFFIE EN KENNISMAKEN
```

**Per pagina:**

`index.html`
- Hero: "Commerciële groei. Zonder ruis." + twee CTA's
- Scrollende serviceticker (Commerciële strategie, Salesstructuur, Positionering, etc.)
- Diensten uitgeschreven (01–04)
- Afsluitende CTA-sectie

`over.html`
- "De moderne handelskamer voor digitale groei"
- Steven's achtergrond: 20+ jaar, agency én client side
- Waarom De Nieuwe Kamer / Rotterdam

`contact.html`
- "Laten we kijken waar het schuurt."
- Contactformulier: Naam + Bedrijf + Telefoonnummer + Wat speelt er?
- LinkedIn als alternatief kanaal

---

## 5. Incrementeel werken — hier leer je het

Dit project is het oefenproject voor de Git-werkwijze. Elke verbetering is een aparte feature branch. Nooit alles tegelijk.

### Hoe we werken

**Stap 1 — Branch aanmaken**
```bash
cd "/Users/stevenkoopmans/Claude Code folder/bureaudnk Website"
git checkout -b feature/naam-van-de-wijziging
```

**Stap 2 — Wijziging maken**
Claude Code past één ding aan. Niet meer.

**Stap 3 — Committen**
```bash
git add .
git commit -m "Beschrijving van wat er veranderd is"
```

**Stap 4 — Reviewen**
Steve opent het bestand lokaal in de browser en beoordeelt de wijziging.

**Stap 5 — Mergen naar main**
```bash
git checkout main
git merge feature/naam-van-de-wijziging
git tag v1.1   # versienummer ophogen
git push origin main
```

**Stap 6 — Branch opruimen**
```bash
git branch -d feature/naam-van-de-wijziging
```

### Voorbeelden van goede incrementele features

- `feature/hero-cta-tekst` — alleen de knoptekst aanpassen
- `feature/diensten-volgorde` — volgorde van diensten wijzigen
- `feature/contact-sectie` — contactgedeelte verbeteren
- `feature/meta-tags` — SEO-tags toevoegen
- `feature/mobile-nav` — navigatie verbeteren op mobiel

### Wat Claude Code bij dit project altijd doet

- Eén wijziging per branch — nooit meerdere dingen tegelijk
- Legt uit wat er veranderd is en waarom
- Geeft de exacte terminal-commando's na elke stap
- Waarschuwt als Steve op het punt staat iets te overschrijven of te verliezen
- Vraagt bevestiging voor merge naar main

---

## 6. SEO

Dit is een personal/zakelijke site — geen lokale SEO. Andere aanpak:

- **Title:** `Bureau DNK — Commerciële groei voor digital agencies`
- **Meta description:** Actief, max 155 tekens, already live
- **Geen LocalBusiness schema** — wel Person of Organization schema
- **Focus zoekwoorden:** fractional CCO, commerciële strategie digital agency, eCommerce strategie Rotterdam
- **LinkedIn** is het primaire kanaal — de site ondersteunt, LinkedIn converteert

---

## 7. Projectnotities

- Bestaande site is de basis — niet herbouwen, wel verbeteren
- Huidig live via Cloudflare Pages — blijft zo, werkt prima
- Volgende stap: Git-repo aanmaken en koppelen aan Cloudflare Pages zodat push = deploy (geen handmatige upload meer)
- Geen template van de GRO-projecten — DNK heeft eigen design en doelgroep
- Dit project staat los van de GRO component library
