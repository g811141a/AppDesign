# Lagebild – Reiselogbuch 0158 (22.11.2026)

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.2** veröffentlicht (`main` f58aba0, danach nur Backlog) |
| AppDesign | **4.69.0** veröffentlicht (`main` 1e63b3e = Übergabe) |
| ReiseLogBuch-Import | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign 2.14.0 |

**Modell und Aufwand**
- Modell: **Opus 5.5** (`claude-opus-5-5`, eingestellt und tatsächlich; kein `model_fallback` in der Sitzungsdatei).
- Aufwand: eingestellt **mittel** (`effort_level` medium), tatsächlich **mittel** (17 Modell-Aufrufe mit `"effort":"medium"`);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt. Ändern mit `/effort` – für die Recherche zu P-122/F-2 wäre ‚hoch‘ denkbar.
- Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 nicht.

**Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘**, zurückgesetzt am 26.11.2026, 08:00 – sparsam prüfen.

**Umgebung:** 4 Kerne; Chromium 1243 (Verweise 1194 → 1243 angelegt), WebKit 2215; Playwright 1.56.1 in `ReiseLogBuch/tests`
eingerichtet (package-Dateien gelöscht). Repos ReiseLogBuch und ReiseLogBuch-Import geklont und registriert.
**Hooks:** keine – `~/.claude/settings.json` enthält nur die Erlaubnis für `create_session`.

**Offene Usertests**
- **P-122** (Reiselogbuch 3.58.2 / AppDesign 4.69.0): **nicht ok** – P-122/0, /1, /3, /5 ok;
  - **P-122/F-1** (zu /2): nach dem Schließen des Hinweisfensters über der Vorschau ist Teilen nicht mehr blau gefüllt.
  - **P-122/F-2** (zu /4): ‚Backup erstellen‘ (Backup-Erinnerung) links, ‚Abgleichbericht anzeigen‘ mittig – Apple-Standard
    und eine allgemeine Regel gewünscht.

**Backlog-Spitze**
- Reiselogbuch ‚0. Nächste Version‘: P-122/F-1, P-122/F-2 (0 Punkte bereit, in Klärung).
- AppDesign: APD-135 (B-3.3 Schritt 3), APD-136, P-122/F-2 (Prio 1); APD-139, APD-141, APD-142, APD-145, APD-147 (Prio 2).

**Plan laut Auftrag (UEBERGABE Abschnitt 3)**
1. P-122/F-1: Ablauf als feste Prüfung nachbauen (rot gegen 3.58.2), Ursache finden, beheben; dieselbe Lücke bei PDF und
   anderen Hinweisfenstern über offenen Fenstern suchen.
2. P-122/F-2: Apple-Abgleich mit Quelle, Bestand aller Schaltflächen in Hinweisen und Fenstern, Muster, Wortlaut der Regel
   (Ja nach 0 Nr. 29), AD-Bean, Testfall-Liste.
3. Dann Korrekturversion mit Bau-Frage.
