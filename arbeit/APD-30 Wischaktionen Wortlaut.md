# APD-30 Wischaktionen und sperrende Sprechblase – Wortlaut alt und neu (0 Nr. 29)

**Stand 15.11.2026** · Sitzung Reiselogbuch 0117 · **Wortlaut V-1 bis V-11 bestätigt (Nutzer 15.11.2026)** · Entschieden (Nutzer 15.11.2026): Wischaktionen als **allgemeine Regel**; die
eingegraute, sperrende Sprechblase gilt für **alle Abfragen** (Variante a) · Grundlage: `arbeit/APD-30 Wischaktionen Testfall-Liste.md`
(D-1 bis D-11, W-1 bis W-71), `arbeit/APD-30 Wischaktionen allgemeine Regel und Sprechblase.md`

Alle Stellen stehen in `README - Designrichtlinie allgemein.md`. Geändert wird erst mit dem Bau der Version (nach `vorbereiten`).
Unverändert bleiben R-3.9 (Kapseln deckend, D-5), R-4.2, R-4.3, R-4.7, R-4.12, R-7.5.

## Teil A – Wischaktionen

### V-1 · 15.4 ‚Gesten‘ (letzter Satz)

**Alt:** Ausblenden nur mit panel-left (gleitet, ~0,35 s) – nach links wischen ändert nichts, damit die Kacheln für Wischaktionen frei
bleiben.

**Neu:** Ausblenden nur mit panel-left (gleitet, ~0,35 s) – nach links wischen blendet sie nie aus; auf einer Kachel zeigt es die
Wischaktionen.

### V-2 · 15.4 ‚Kontextmenü‘ (vorletzter Satz)

**Alt:** … der Eintrag ist dabei blau getönt. Kein Wischen, kein Hinweistext.

**Neu:** … der Eintrag ist dabei blau getönt. Dieselben Aktionen zeigt das Wischen nach links (Wischaktionen). Kein Hinweistext.

### V-3 · 15.4 neuer Absatz ‚Wischaktionen‘ (nach ‚Kontextmenü‘)

**Neu:**

- **Wischaktionen** (R-7.8): Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen des Kontextmenüs als **Kapseln**
  (66 × 44, links und rechts rund, Abstand 8 px, deckend) mit Symbol, darunter klein das Wort (11 pt, z. B. ‚Einstellen‘, ‚Löschen‘) –
  ‚Löschen‘ rot und ganz außen. Die Kachel folgt dem Finger; ab halber Aktionsbreite bleibt sie offen (bei zwei Aktionen 162 px), sonst
  federt sie zurück. Beim Zurückwischen werden die Kapseln kleiner (bis 50 %) und blasser. **Durchwischen** über 60 % der Kachelbreite
  macht die rote Kapsel breit und löst sie beim Loslassen aus; sie fragt mit der Sprechblase (R-4.12, 15.7), die aus der roten Kapsel
  wächst – die Kachel bleibt offen, bis entschieden ist. Höchstens eine Kachel ist offen; Tippen auf die Kachel oder daneben schließt sie
  und löst sonst nichts aus. Technisch: gemeinsamer Baustein in `ui.js`, die App übergibt dieselbe Aktionsliste wie dem Kontextmenü.
  Vorbild Notizen und Mail (iOS 26); anders als dort fragt das Durchwischen (16).

### V-4 · Katalog 17, Thema 7 – neue Regel R-7.8

**Neu:**

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-7.8 | **Wischaktionen der Kacheln:** Wischen nach links auf einer Kachel der zentralen Liste zeigt rechts neben ihr die Aktionen ihres Kontextmenüs (R-4.2) – gleiche Aktionen, gleiche Reihenfolge, die zerstörende rot und ganz außen – als Kapseln mindestens 66 × 44 mit Symbol und dem Wort darunter (wächst mit der Textgröße, nie abgeschnitten); nichts ragt aus Seitenleiste oder Bild. Die Kachel folgt dem Finger, bleibt ab halber Aktionsbreite offen, sonst federt sie zurück; beim Zurückwischen werden die Kapseln kleiner und blasser. **Durchwischen** über 60 % der Kachelbreite löst beim Loslassen die rote Aktion aus – sie fragt zuerst (R-4.12), die Kachel bleibt bis zur Entscheidung offen. Höchstens eine Kachel ist offen; sie schließt bei Tippen auf die Kachel oder daneben (das Tippen löst sonst nichts aus), Rollen, Wischen an einer anderen Kachel, Neuaufbau der Liste, Drehen, Ausblenden der Seitenleiste und Esc. Entschieden wird die Geste wie in R-7.5 (nach 10 px, deutlich waagrecht – sonst rollt die Liste); eine geschlossene Kachel bewegt sich nicht nach rechts; kein Wischen nach langem Drücken, bei offenem Fenster, Menü oder offener Sprechblase und an allem, was kein Kontextmenü hat; Wischen tippt nie an; Drehen oder Abbruch beim Ziehen = Zustand wie vorher. Geschlossen sind die Kapseln für VoiceOver und Tastatur nicht erreichbar (die Aktionen bleiben im Kontextmenü), offen sind sie Schaltflächen mit dem Namen der Aktion. ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, alles Übrige ohne Gleiten und ohne Größenänderung; je Bild nur transform und opacity | ablauf.mjs – `checkWischen` | Wischgefühl, Rollen gegen Wischen, Durchwischen, VoiceOver | 15.4 |

### V-5 · 15.21 ‚Berührungen und Gesten‘ (Ergänzung am Ende)

**Alt:** … ‚nav abgebrochen vor der entscheidung‘, ‚nav abgebrochen drehen‘ – sie stehen vor der Zeigerzeile desselben Augenblicks.

**Neu:** … ‚nav abgebrochen vor der entscheidung‘, ‚nav abgebrochen drehen‘ – sie stehen vor der Zeigerzeile desselben Augenblicks.
Ebenso die Wischaktionen (R-7.8): ‚wisch kandidat‘, ‚wisch verworfen dx dy‘, ‚wisch offen|durch|zurück gefedert|abgebrochen weg W‘
(Weg in px).

### V-6 · 16 ‚Bewusste Abweichungen‘ – zwei neue Zeilen

**Neu:**

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Durchwischen einer Kachel fragt mit der Sprechblase (Apple: Durchwischen löscht sofort, Mail und Notizen bieten Rückgängig bzw. ‚Zuletzt gelöscht‘) | – | ein Reiselogbuch mit allen Einträgen wäre endgültig weg; es gilt R-4.12 wie bei jedem Löschen (APD-30) | 15.11.2026 |
| Wischaktionen ohne VoiceOver-Aktionen am Eintrag (Apple: Aktionen-Rotor) | – | im Web nicht möglich; dieselben Aktionen stehen im Kontextmenü (R-7.8, R-1.8) | 15.11.2026 |

## Teil B – Sprechblase graut ein und sperrt (alle Abfragen)

### V-7 · 15.7 ‚Verhalten‘

**Alt:** **Verhalten:** an der angetippten Schaltfläche (diese ist gedrückt), wächst aus ihr (R-4.13); daneben tippen bricht ab.

**Neu:** **Verhalten:** an der angetippten Schaltfläche (diese ist gedrückt), wächst aus ihr (R-4.13). Solange sie offen ist, ist alles
daneben leicht eingegraut (Schwarz 20 %) und gesperrt – **daneben tippen ändert nichts**; man entscheidet sich für eine Schaltfläche der
Sprechblase (Esc bzw. ⌘. = ‚Abbrechen‘, R-4.7). Gehört die Abfrage zu einem Textfeld (ⓧ), bleiben Fokus und Tastatur im Feld. Vorbild
Notizen (Abfrage beim Löschen) und der Alert, der sich nicht wegtippen lässt.

### V-8 · Katalog 17, R-1.4

**Alt:** **Nur der Vordergrund reagiert – auch für VoiceOver und Tastatur:** offenes Fenster sperrt die Seite (Fenster, Meldung und Blatt
sind modal), Menü und Sprechblase fangen Wischen ab, daneben tippen schließt; bei offenem Menü und offener Sprechblase ist alles daneben
gesperrt (`inert` – Seite bzw. übriger Fensterinhalt), nach jedem Schließen (auch beim Drehen, R-8.1) wieder frei

**Neu:** **Nur der Vordergrund reagiert – auch für VoiceOver und Tastatur:** offenes Fenster sperrt die Seite (Fenster, Meldung und Blatt
sind modal), Menü und Sprechblase fangen Wischen ab; daneben tippen schließt das Menü, bei der Sprechblase ändert es nichts – dort ist
alles daneben eingegraut (Schwarz 20 %), bis eine ihrer Schaltflächen gewählt ist; bei offenem Menü und offener Sprechblase ist alles
daneben gesperrt (`inert` – Seite bzw. übriger Fensterinhalt), nach jedem Schließen (auch beim Drehen, R-8.1) wieder frei und ohne Grau

Prüfung bleibt `hig.mjs` (Sperre, modal, nach dem Schließen frei), ergänzt um ‚eingegraut‘ und ‚daneben tippen ändert nichts‘.

### V-9 · 15.18 Tabelle, Zeile 20

**Alt:** | 20 | ‚Abbrechen‘ oder daneben tippen | nichts ändert sich | wie links |

**Neu:** | 20 | ‚Abbrechen‘ | nichts ändert sich | wie links |

### V-10 · 15.19 ‚Backup laden‘

**Alt:** **Abbrechen / daneben tippen:** nichts ändert sich.

**Neu:** **Abbrechen:** nichts ändert sich.

### V-11 · 16 ‚Bewusste Abweichungen‘ – neue Zeile

**Neu:**

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Sprechblase lässt sich nicht wegtippen (Apple: ein Action Sheet am iPad schließt beim Tippen daneben = ‚Abbrechen‘) | Abdunkelung Schwarz 20 % | unsere Sprechblase stellt immer eine Entscheidung, meist vor dem Zerstören – wie der Alert, der sich nicht wegtippen lässt; die HIG rät bei Warnungen vom Popover ab, weil es sich leicht versehentlich schließt (APD-30) | 15.11.2026 |

## Folgen beim Bau (kein Regeltext)

- Versionsgeschichte der Designrichtlinie, CHANGELOG, `PROMPT.md` des Reiselogbuchs (Bedienung: Wischen nach links), App-Richtlinie
  (keine Abweichung), `tests/README.md`.
- Prüfungen, die heute ‚daneben tippen bricht ab‘ erwarten, werden auf ‚ändert nichts‘ umgestellt (Testfall-Liste W-22 bis W-25 für jede
  Sprechblase); Kommentare in `ui.js` (`confirmPop`, `choosePop`).
