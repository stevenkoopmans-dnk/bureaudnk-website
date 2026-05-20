# Deploy-check

Na een `git push origin main` of wanneer Steve een verandering live wil verifiëren.

---

Wacht 30-60s op Cloudflare Pages build. Check pages.cloudflare.com → bureaudnk → Deployments voor "Active" status met de juiste commit-hash.

Productie-test (Steve doet of jij begeleidt):
1. Open bureaudnk.nl in private/incognito tabblad (omzeilt cache)
2. Quick walkthrough alle pagina's: index, over, contact, alle 5 diensten, privacy, algemene voorwaarden
3. Mobiel én desktop (resize browser of echt op telefoon)
4. Beide nav-states: top + na scroll
5. Console errors (DevTools)

Speciale checks:
- **Contact form:** vul echte test-data in en submit. Verwacht success-state ("Uw bericht is verstuurd"). Check `steven@bureaudnk.nl` op de lead-mail (eerste keer ooit: eerst Formspree-verificatie bevestigen)
- **Nav-gedrag op contact:** teal balk, wit logo, cream menu-items en cream CTA-knop. Bij scroll: blijft teal, krijgt subtiele border-bottom
- **Footer-nav:** moet onderaan staan, niet als spookmenu bovenin (regressie-check op de nav-scope-fix)

Rapporteer aan Steve:
- Alle pagina's laden ja/nee
- Form werkt ja/nee
- Geen visuele regressies ja/nee
- Eventuele bevindingen met file_path en regelnummer

Als iets stuk is: open bug-fix workflow (zie `bug-fix.md`), niet ad-hoc fixen op main.
