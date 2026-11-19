# Lagebild – Sitzung Reiselogbuch 0135

**Stand 19.11.2026** · gelesen: `UEBERGABE.md`, die ganze Zusammenarbeit allgemein 3.15.0, die Überschriften der Designrichtlinie allgemein.

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.5** veröffentlicht (`main` 966c8c0) |
| AppDesign | **4.62.0** veröffentlicht (`main` aa32e20, danach nur Backlog und `arbeit/`) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.15.0** |
| `CLAUDE.md` | AppDesign 2.14.0 |

## Arbeitsumgebung

- Repos neben AppDesign geklont: ReiseLogBuch, ReiseLogBuch-Import; Verweise `appdesign`, `reiselogbuch`, `reiselogbuch-import` angelegt und registriert.
- Tests eingerichtet: Playwright 1.56.1 im Ordner `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht), Chromium-Verweise 1194 → 1243,
  WebKit 2215 vorhanden. **AppDesign-Selbsttest `lauf-selbsttest.mjs`: alles in Ordnung.**
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** eingestellt `claude-opus-5-5` (Opus 5.5), zuletzt tatsächlich `claude-opus-5-5`; Sitzungsdatei: alle 22 Modell-Aufrufe Opus 5.5,
  **kein `model_fallback`**.
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (alle 22 Aufrufe `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
  Keine Abweichung.
- **Nutzungsgrenze:** Fünf-Stunden-Grenze, Status **erlaubt**, keine Überziehung, neu ab **19.11.2026 12:30 MEZ**.

## Offene Usertests

Keine (P-112 ok, Nutzer 19.11.2026).

## Backlog-Spitze

- **Nächste Version:** AppDesign 0 Punkte bereit · Reiselogbuch 0 Punkte bereit.
- **AppDesign:** APD-135 (Prio 1, Konsolidierung 3 – Wortlaut Paket 5 bestätigt, als Nächstes bauen) · APD-136 (Prio 1, AD-Beans) · APD-138 (Prio 2,
  Dateiname am iPad nie umbrechen) · APD-70 (Prio 3, Mehrsprachfähigkeit) …
- **Reiselogbuch:** RLB-125 (Prio 2, Reiselogbuch sperren) · RLB-126 (Prio 3, Zuletzt gelöscht) · RLB-6 (Prio 3, Ausschreibungstexte) …

## Offene Frage: Wizard (geführte Erfassung) als APD-139

Noch kein Backlog-Eintrag – du wolltest erst dein Ok (Sitzung 0134). Vorgesehener Eintrag:

- **APD-139 · Prio 2 · allgemein (AD-Bean) · offen** – Geführte Erfassung (Wizard): aus einer Eingabemaske (z. B. Tageserfassung) per Icon Schritt für
  Schritt durch das Formular, vor allem fürs iPhone.
- **Festlegungen 1–5** (`arbeit/0134 Vorschlag geführte Eingabe.md`):
  1. Die Tageserfassung bleibt unverändert; der Wizard ist nur zusätzlich, aus der Maske aufrufbar.
  2. Alle Funktionen der Felder gelten auch im Wizard (Rückgängig, ⓧ, Vorschläge, Smileys, Fehlermeldungen, automatisches Speichern …) – die Bean zeigt die
     vorhandenen Felder statt sie nachzubauen.
  3. Fortschritt und Navigation werden erst bei der Umsetzung geklärt.
  4. Eine Seite kann ein Feld, mehrere Felder oder einen ganzen Kasten (Abschnitt) zeigen; die Bean wird zukunftsfest gebaut.
  5. Eine AD-Bean wird nur voll geprüft, wenn sie im Inneren geändert wurde (Regel wird mit APD-135 Paket 7 / APD-136 gefasst, Wortlaut nach 0 Nr. 29).
- **Gestaltung:** A + E fürs erste Muster (`arbeit/0134 Wizard Gestaltung Optionen.md`).
- Vor dem Muster: Apple-Abgleich mit Quelle, Muster iPhone hoch hell.

## Danach (UEBERGABE Abschnitt 3)

**APD-135 Paket 5 bauen:** Testfall-Liste (0 Nr. 1), Code nach Abschnitt 4–5 der Wortlaut-Datei, Gegenproben rot zeigen, `vorbereiten` (vorläufig AppDesign
4.63.0 / Reiselogbuch 3.57.6), Wortlaut einsetzen, `stufe`, dann die Bau-Frage.
