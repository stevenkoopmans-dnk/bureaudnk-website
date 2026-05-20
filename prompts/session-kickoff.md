# Sessie-kickoff

Plak dit bovenaan als je een nieuwe sessie start en geen specifieke taak hebt, of als first-message van een sessie waarin we ergens aan gaan werken.

---

Lees in deze volgorde voordat je iets doet:

1. `CLAUDE.md` in de root
2. `docs/vision.md`
3. `docs/business-rules.md`
4. `docs/architecture.md`
5. `docs/conventions.md`

Doe daarna een snelle status-check:

```bash
git status
git log --oneline -10
git stash list
git branch -a
```

Rapporteer:
- Op welke branch we staan
- Of er ongepushte commits, uncommitted changes of stashes openstaan
- Wat de laatste 5 commits zijn

Als de status schoon is, vraag waar we aan gaan werken. Geen aannames doen over de scope.

Belangrijke session-defaults:
- Werk op feature branches, niet direct op main
- Tone: scherp, direct, geen agentuurjargon, geen em-dashes
- Mobile-first testen, beide nav-states checken
- Wacht op expliciete bevestiging van Steve voor `git push`
