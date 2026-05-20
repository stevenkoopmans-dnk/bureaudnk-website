# Design system — Bureau DNK

Single source of truth: [style.css](../style.css). Wat hier staat documenteert wat daar gedefinieerd is. Wijkt de code af, dan wint de code en moet dit document mee.

## Kleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--ink` | `#1a2d2c` | Tekst, CTA-knoppen, dark-hero op contact, nav-balk op contact |
| `--paper` | `#f7f6f3` | Body-achtergrond, knop-tekst op donker, geïnverteerde elementen op donker |
| `--warm` | `#efeeeb` | Subtiele vlakken, hover states |
| `--warmer` | `#e8e7e3` | Iets dieper accent dan `--warm` |
| `--mid` | `#6b6b6b` | Body-tekst (300 weight), labels secundair |
| `--light` | `#a8a8a8` | Lijntjes, label-meta, placeholder |

Geen accent-kleur, geen blauw, geen status-rood/groen op marketingpagina's. Formulier-feedback heeft eigen kleuren (zie `.form-feedback.success` / `.error` in [contact.html](../contact.html)), die zijn bewust apart en buiten de hoofdpalet.

## Typografie

| Token | Font | Gebruik |
|---|---|---|
| `--serif` | Cormorant Garamond, Georgia, serif | Koppen, hero-titel, CTA-titel |
| `--sans` | Instrument Sans, sans-serif | Body, labels, knoppen, nav |

Schaal:

| Class | Size | Gebruik |
|---|---|---|
| `.display-lg` | `clamp(44px, 5vw, 72px)` | Hero h1 |
| `.display` | `clamp(32px, 3vw, 48px)` | Sectie-koppen |
| `.cta-title` | `clamp(38px, 4.5vw, 64px)` | CTA-sectie |
| `.body-lg` | 17px / 1.75 / 300 | Hero-intro, lange paragraaf |
| body | 16px / 1.65 / 300 | Default |
| `.label` | 11px / uppercase / `0.18em` | Eyebrow boven sectiekoppen |

Italics in koppen gebruiken een lichter inkje (`var(--mid)`) voor poëtisch contrast (`em` element binnen `.display` of `.display-lg`).

## Spacing

- Sectie default: `160px 64px` desktop, `80px 24px` mobiel
- Sectie klein (`.section-sm`): `80px 64px`, mobiel `56px 24px`
- Nav padding: `20px 64px` top-state, `16px 64px` scrolled, mobiel altijd `20px 24px`
- Page-hero: `160px 64px 100px` desktop, `120px 24px 60px` mobiel

Stappen: 8 / 16 / 24 / 32 / 48 / 64 / 80 / 100 / 160. Geen losse waarden buiten dit ritme.

## Knoppen

| Class | Stijl | Gebruik |
|---|---|---|
| `.btn.btn-dark` | Donker vlak, paper tekst, 15×36 padding, uppercase 12px | Primaire CTA |
| `.btn.btn-ghost` | Mid-grijze tekst, geen achtergrond, pijl-suffix met hover-shift | Secundaire CTA, "lees meer" |
| `.nav-cta` | Donker vlak, kleiner (12×28). Op contact: cream-bg ink-text (omgekeerd) | "Plan gesprek" in nav |
| `.form-submit` | Donker vlak, button-element, 16×40 padding | Formulier-submit |

Hover: `opacity: 0.75` op donkere knoppen. Geen kleurwissel.

## Nav-gedrag

**Algemeen (alle pagina's behalve contact):**
- `position: fixed`, transparant in top-state
- Bij `window.scrollY > 60` voegt [main.js](../main.js) `.scrolled` toe
- Scrolled-state: warm-paper achtergrond (`rgba(247,246,243,0.96)`) + blur(12px) + onderschaduw
- Mobiel (<960px): nav-links verbergen (`.nav-links { display: none }`). Logo en CTA blijven

**Contact-pagina (override):**
- Nav-balk **altijd teal** (`var(--ink)`), in zowel top als scrolled state
- Scrolled-state: lichte border-bottom `rgba(255,255,255,0.06)` als subtiele lift
- Logo altijd wit-geïnverteerd: `filter: brightness(0) invert(1)`
- Nav-links: cream tekst (`var(--paper)`), opacity 0.5 default, 1 op hover/active
- Nav-cta omgekeerd: cream achtergrond met ink-tekst

Reden: de contact-hero is `--ink`. Een transparant-naar-warmwit nav gaf onleesbare nav-links (ink op ink) en visuele overlap bij scroll. Vaste teal-balk lost beide op.

**Implementatie-patroon voor page-scoped nav-overrides:**
```css
/* In de inline <style> van de pagina, na <link rel="stylesheet"> */
nav#nav, nav#nav.scrolled { background: var(--ink); }
nav#nav.scrolled { box-shadow: 0 1px 0 rgba(255,255,255,0.06); }
.nav-logo img { transition: filter .4s var(--ease); }
nav#nav .nav-logo img { filter: brightness(0) invert(1); }
nav#nav .nav-links a { color: var(--paper); opacity: 0.5; }
nav#nav .nav-links a:hover, nav#nav .nav-links a.active { opacity: 1; }
nav#nav .nav-cta { background: var(--paper); color: var(--ink); }
```

**Belangrijke selector-regel:** alle hoofdnav-styling gebruikt `nav#nav` of `nav#nav.scrolled`. Niet generieke `nav { ... }`. Anders raakt het ook `<nav class="footer-nav">` in de footer. Zie [conventions.md](conventions.md). Pagina's met een `<nav>` voor de hoofdnav moeten dus **altijd `id="nav"` hebben**, anders verliezen ze de styling en breekt main.js's scroll-listener.

## Footer

- `--ink` achtergrond, witte tekst op 30% opacity (`rgba(255,255,255,0.3)`)
- Footer-nav is een column met service-links
- Flex-layout, wrapt naar column op mobiel
- `<nav class="footer-nav">` zonder id (en moet zo blijven, anders krijgt-ie de hoofdnav-styling)

## Breakpoints

| Naam | Min-width | Wat verandert |
|---|---|---|
| Mobile | default (mobile-first) | Single column, nav-links verborgen |
| Tablet/desktop | 960px | Multi-column hero, page-hero grid, sectie-padding ruimer |

CLAUDE.md noemt 768px en 1200px als globale breakpoints. Voor Bureau DNK is in praktijk **960px** de switch. Houd dat aan voor consistentie binnen dit project.

## Animaties

- `.reveal`, `.reveal-left`, `.reveal-right`: scroll-in van 40px met opacity, 0.9s cubic-bezier
- Trigger via IntersectionObserver in [main.js](../main.js)
- Per-element `data-delay="120"` om volgorde te sturen, anders auto-stagger `(i % 4) * 80ms`
- Transitions voor state-changes (nav-bg, logo-filter, button-opacity): 0.2 tot 0.4s `var(--ease)` (cubic-bezier(0.16, 1, 0.3, 1))

## Tone (visueel én tekstueel)

- Warm, minimalistisch, premium
- Veel witruimte
- Typografie doet het werk, niet beeld
- Geen stockfoto's, geen icoontjes als decoratie. Beeld alleen waar het waarde toevoegt (Rotterdam-skyline op homepage, Centraal Station op over)
- Direct, scherp, geen agentuurjargon. Zie [business-rules.md](business-rules.md) voor copy-regels
