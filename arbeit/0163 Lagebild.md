# Lagebild – Sitzung Reiselogbuch 0163

**26.11.2026, aktualisiert 15:01 MEZ** · Thema: Bau AppDesign 4.70.2 / Reiselogbuch 3.58.5 (P-124/F-1 und P-124/F-2)

## Neu seit dem ersten Lagebild

- Auf `main` von AppDesign kam nach dem Start dieser Sitzung der Commit **8e86220** dazu („Übergabe 0162 → 0163 ergänzt“, 13:57 UTC):
  - **AD-Bean `alert` wird in 4.70.2 neu berechnet:** eine Funktion `layout()` statt Messen und Nachbessern
    (`arbeit/0162 AD-Bean alert – wie sie rechnet.md`, Abschnitt 3).
    1. Der Inhalt ist vor dem Öffnen fertig: Die Kästen der AD-Bean `notice` kommen vor `showModal`, der `MutationObserver` entfällt.
    2. Verfügbare Fläche = sichtbarer Bereich (`visualViewport`) minus sichere Ränder und **ein fester Rand von 16 px je Seite**. Er ersetzt 32 px und `90vw`.
    3. Breite = was der Inhalt braucht (Dateiname in einer Zeile). Sie ist mindestens 360 px × Textgröße und höchstens die verfügbare Breite.
    4. Höhe = Inhalt, höchstens die verfügbare Höhe; darüber rollt der Text.
    5. Die Bean zentriert selbst und rechnet bei `resize`, Drehen, Textgröße und Tastatur neu. Die iPhone-Breite bleibt wie heute.
  - Weitere Regeltexte, die die Berechnung beschreiben (Designrichtlinie 7, 10, 15), ändere ich nur nach Rückfrage mit Wortlaut (0 Nr. 29).
  - Du hast die Tönung auch nach Teilen → HTML gesehen (direkter Weg). Dieser Fall ist schon in P-124/F-2 enthalten.
- Ich habe den Arbeitszweig in AppDesign auf 8e86220 nachgezogen. ReiseLogBuch und ReiseLogBuch-Import sind unverändert.

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.58.4** veröffentlicht, Pages success (ee14a6d) | `index.html` `APP_VERSION`, GitHub Actions |
| AppDesign | **4.70.1** veröffentlicht; letzter Pages-Lauf success (8e86220, nur Übergabe) | `v4/ui.js` `AD_VERSION`, `AD_NEEDED` im Reiselogbuch |
| ReiseLogBuch-Import (privat) | **1.4.0** (letzter Commit), unverändert | `git log` |
| Zusammenarbeit allgemein | **3.19.0** (ganz gelesen) | Dateikopf |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 | Dateiköpfe |

## Modell, Aufwand, Nutzungsgrenze (neu abgefragt 15:01 MEZ)

- **Modell:** Opus 5.5. Eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei) sind gleich. Es gab **keinen `model_fallback`**.
- **Aufwand:** hoch. Eingestellt (`effort_level`) und tatsächlich (`"effort":"high"` in der Sitzungsdatei) sind gleich. `CLAUDE_CODE_EFFORT_LEVEL` ist nicht gesetzt.
- **Nutzungsgrenze:** five_hour · allowed, kein Overage, wird um 19:20 MEZ zurückgesetzt.
- Hilfsagenten setze ich nur mit Opus 5.5 und Aufwand hoch ein, einzeln nacheinander. Fable 5.2 verwende ich nicht.

## Arbeitsumgebung

- Die Repos liegen unter `/home/user` auf dem Zweig `claude/beautiful-gates-3vz5r4`, jeweils gleich `origin/main`. Die kleingeschriebenen Verweise sind angelegt, `register_repo_root` lief für alle drei.
- Tests eingerichtet: Playwright 1.56.1 (die package-Dateien sind gelöscht), Chromium 158 (Ordner 1243, Verweise 1194 → 1243), WebKit Ordner 2215, 4 Kerne.
  Der Probelauf `version-regeln` ist in Chromium und WebKit in Ordnung.
- **Hooks:** keine. `~/.claude/settings.json` enthält nur die Regel, die `create_session` erlaubt.

## Offene Usertests

| Nr. | Version | Stand |
|---|---|---|
| P-124 | 3.58.4 / 4.70.1 | **nicht ok** zu /1: P-124/F-1 (Hinweisfenster nicht so breit wie möglich) und P-124/F-2 (Teilen nach der Ausgabe hellblau, auch nach Teilen → HTML). Beide sind nachgebaut und rot gegen 3.58.4. |
| P-123 | 3.58.3 / 4.70.0 | nicht ok, ersetzt durch P-124 |
| P-122 | 3.58.2 / 4.69.0 | nicht ok, ersetzt durch P-123 |

## Backlog-Spitze

- **Nächste Version AppDesign 4.70.2 / Reiselogbuch 3.58.5: 2 Punkte bereit.**
  - P-124/F-1: AD-Bean `alert` mit `layout()` neu berechnet, Rand 16 px. Der Dateiname ist am iPad höchstens Bildschirmbreite − 32 px breit (R-10.8 neu, bestätigt).
  - P-124/F-2: `sourcehighlight` merkt sich den Tausch; `outputSource` hält und gibt die Schaltfläche auf jedem Weg frei (`hold`/`release`).
- **Das Bau-‚Ja‘ liegt vor** (Nutzer 26.11.2026, Sitzung 0162), Prüflauf Stufe voll.
- Danach: Usertest P-125 · APD-145 (AppDesign 5.0.0) · APD-148 · APD-135/B-3.3 Schritt 3 · APD-142 · RLB-126 · APD-139 · APD-141 · APD-147 zuletzt.

## Nächster Schritt

Bau nach `UEBERGABE.md` Abschnitt 3 (Stand 8e86220):

1. `vorbereiten --ad 4.70.2 --app reiselogbuch=3.58.5`.
2. `alert` neu mit `layout()`, `sourcehighlight` und `outputSource` umsetzen.
3. Vorher `ablauf-p120` und `ablauf.mjs` (`checkDateiname`) in Chromium und WebKit grün.
4. `stufe`, dann `los` mit Stufe voll.
5. Bericht mit Usertest P-125.
