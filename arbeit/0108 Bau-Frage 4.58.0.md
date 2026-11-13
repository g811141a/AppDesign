# Bau-Frage AppDesign 4.58.0 (APD-128)

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘ · gebaut wird erst nach deinem ‚Ja‘ (0 Nr. 21)

## Was in die Version kommt (1 Punkt bereit: APD-128)

1. **Zusammenarbeit allgemein 3.12.0:** 0 Nr. 2 mit Stufe Text oder voll (APD-128/V-1 mit V-4: Zeichenketten und Kommentare).
2. **AppDesign-`CLAUDE.md` 2.12.0:** ‚Technisch‘ (V-2) und ‚Veröffentlichen‘ (V-3: Befehl `stufe`, `los … --stufe text`).
3. **`werkzeug/veroeffentlichen.mjs`:** neuer Befehl `stufe` (Vorschlag mit Prüfungsliste oder Grund für voll), `los --stufe text` (prüft vor dem
   Prüflauf erneut, sonst Abbruch; ruft `tests/alle.mjs --nur …` auf; Merge-Commit ‚(Prüfstufe Text)‘).
4. **Selbsttest** `werkzeug/veroeffentlichen-selbsttest.mjs`: Fälle APD-128/M-1 bis M-18 mit Gegenprobe M-17 (`arbeit/APD-128 Testfall-Liste.md`).
5. CHANGELOG, Backlog und Versionsgeschichten.

## Umfang

- **Vorschlag: nur AppDesign 4.58.0.** Das Reiselogbuch bleibt auf 3.55.1 mit Fassung 4.57.0 und wird nicht gehoben (0 Nr. 10, nur nach Rückfrage).
  Die App ändert sich nicht, deshalb gibt es keinen Usertest am Gerät. Die neue Stufe nutzt erst die nächste Reiselogbuch-Version.
- **Prüfstufe dieser Version:** voll für AppDesign. `los` ohne App führt die Werkzeug-Prüfung `messung` aus. Den Selbsttest des Skripts und
  `lauf-selbsttest` lasse ich während der Arbeit laufen; dazu `stufe` einmal gegen den echten Stand 3.55.1 (Erwartung: Stufe Text, 8 Prüfungen).
- **Kontext:** zurzeit 197.942. Wird beim Bau 300.000 erreicht, übergebe ich nach der Veröffentlichung und dem Bericht (0 Nr. 13).
