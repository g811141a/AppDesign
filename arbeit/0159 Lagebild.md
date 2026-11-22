# Lagebild – Reiselogbuch 0159

**Stand 22.11.2026**

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.2** veröffentlicht · **3.58.3 vorbereitet** (Zweig `vorbereitung-3.58.3`, 41ad98b) |
| AppDesign | **4.69.0** veröffentlicht · **4.70.0 vorbereitet** (Zweig `vorbereitung-4.70.0`, 1f086e8; `main` ist mit der Übergabe 40fd828 weiter – `los` führt sie zusammen) |
| ReiseLogBuch-Import | **1.4.0** (2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign 2.14.0 |

## Offene Usertests

- **P-123** (Reiselogbuch 3.58.3 / AppDesign 4.70.0) – erst nach dem Bau zu prüfen: P-123/0 bis P-123/3 (Korrekturen P-122/F-1 und P-122/F-2, R-3.10 Hinweise mittig).
- **P-122** – nicht ok (/2, /4); die offenen Punkte ersetzt P-123.

## Backlog-Spitze

- **‚0. Nächste Version‘:** in beiden Backlogs 0 Punkte bereit (alles steckt in 4.70.0 / 3.58.3).
- **AppDesign:** APD-135 (1) Konsolidierung 3 · APD-136 (1) AD-Beans · **APD-148** (1) AD-Bean `backup` · APD-139, APD-141, APD-142, APD-145, APD-147 (2) · APD-70 (3)
- **Reiselogbuch:** RLB-126 (3) ‚Zuletzt gelöscht‘ · RLB-6 (3)

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, alle 16 Aufrufe in der Sitzungsdatei); kein `model_fallback`.
- **Aufwand:** **mittel** – eingestellt (`effort_level`) und tatsächlich (16 × `"effort":"medium"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘**, zurückgesetzt am 26.11.2026 um 8:00; keine Überziehung.

## Umgebung

- Repos geholt (ReiseLogBuch, ReiseLogBuch-Import), Verweise kleingeschrieben, angemeldet.
- Tests eingerichtet: Playwright 1.56.1; Chromium 157.0.8103.78 (Ordner 1243, Verweise 1194 → 1243) und WebKit 26.0 (2215) starten; 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Nächster Schritt (UEBERGABE Abschnitt 3)

Bauen und veröffentlichen **AppDesign 4.70.0 / Reiselogbuch 3.58.3**, Stufe **voll** – das Skript schlägt ebenfalls **voll** vor (AppDesign geändert, `sw.js`,
`ablauf-p120` Code geändert). Das Ja stammt aus 0158 (0 Nr. 21) – deshalb jetzt die kurze Bestätigung. Inhalt:

- **P-122/F-1** Schaltflächen der Vorschau nach der Meldung wie beim Öffnen (`outputSource`), PDF ebenso.
- **P-122/F-2** Hinweise mittig – **R-3.10** (`.ad-notice`, `.ad-buttons`, `.bhint`), Prüfung `hig.mjs` (`masseStile`); AD-Bean: keine (allgemeines CSS).
- Backlog APD-148, Usertest P-123.

Voller Lauf dauert zuletzt rund 75–86 min (Chromium, dann WebKit).
