# Aufgefallen, Punkt 2 – Gegenprobe `wischen:W-97` findet ihre Stelle nicht

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

Punkt 1 ist als **APD-152** bereit, mit freigegebenem Wortlaut (AppDesign-Backlog, `4b922dd`).

## Befund (belegt)

- **Die Gegenprobe:** `tests/ablauf.mjs`, Tabelle `WISCH_GEGENPROBEN`. Sie sucht in `ui.js` nach `abstand: 11, rand: 11,`.
- **Die Stelle heißt heute englisch:** `gap: 11, margin: 11,` (`v4/ui.js` Zeile 3048, `masse` der AD-Bean `swipeactions`).
  - In der Fassung 4.60.2 steht noch der alte Text, in 4.70.2 und 4.71.0 nicht mehr. Seit der Umbenennung bricht die Gegenprobe mit ‚Stelle in ui.js nicht gefunden‘ ab, statt W-92 rot zu machen.
- **Die übrigen Tabellen-Gegenproben habe ich statisch nachgesehen:** Bei allen 8 übrigen Einträgen von `WISCH_GEGENPROBEN` und bei beiden von `ZULETZT_GEGENPROBEN` steht die Stelle genau einmal in `v4/`.
  - Sonst bauen die Gegenproben ihren Fehler im Code selbst ein (`gegenprobe === …`), dort gibt es keine Stelle, die fehlen könnte.
  - Welche ‚mehreren anderen‘ in 0167 nicht liefen, steht im Bericht nicht. Laufen lassen habe ich sie nicht.

## Möglichkeiten

- **a) W-97 berichtigen und eine Wache im Vorlauf (Empfohlen):**
  - Die Gegenprobe sucht künftig `gap: 11, margin: 11,` → `gap: 8, margin: 11,`.
  - Dazu prüft `doku-regeln` bei jedem Lauf, dass jede Stelle der Gegenprobe-Tabellen genau einmal in `v4/` steht. Eine Umbenennung fällt dann sofort auf.
  - **Grund:** Der Fehler kam durch eine Umbenennung, die eine Gegenprobe still unbrauchbar machte. Die Wache verhindert das künftig, ohne Laufzeit.
  - Kommt mit APD-152 in die Korrekturversion. Das ist nur eine Änderung an Prüfungen, der Lauf ist ohnehin voll.
- **b) Nur W-97 berichtigen.**
- **c) Lassen und ins Backlog.**

Beim Bau lasse ich `wischen:W-97` einmal laufen. Sie muss W-92 rot machen.

**Wortlaut:** Eine neue Regel ist das nicht. Kommt die Wache, ergänze ich nur die Spalte Prüfung der betroffenen Regeln, mit Wortlaut im Vorschlag zum Bau (0 Nr. 29).

## Entschieden: a) (Nutzer 27.11.2026, im Fenster) → Thema **APD-153**

**Wortlaut (0 Nr. 29)** – Zusammenarbeit 0 Nr. 2, letzter Satz:
- alt: „Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`), Stufe `veroeffentlichen.mjs` (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).“
- neu: „Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`), Stufe `veroeffentlichen.mjs` (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`), **Stellen der Gegenproben `doku.mjs` – `checkGegenproben` (jede Stelle genau einmal in `v4/`, Gegenprobe `--gegenprobe schema`).**“

**Testfall-Liste (automatisch) APD-153/T-1 bis T-3:**
- **T-1:** `wischen:W-97` macht W-92 rot (einmal beim Bau).
- **T-2:** `checkGegenproben` ist grün mit allen Stellen und rot, wenn eine Stelle fehlt oder zweimal vorkommt. Die Gegenprobe benennt im Schema-Lauf eine Stelle um.
- **T-3:** Die Wache läuft im Vorlauf `doku-regeln`, ein Fehler bricht sofort ab.
- Zusammenarbeit wird dadurch **3.20.0**.
