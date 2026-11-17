# Allgemeine Elemente gekapselt bauen – Klärung (Sitzung 0123)

**Stand 17.11.2026** · Wunsch des Nutzers (17.11.2026): ‚alle allgemeinen Elemente im AppDesign sollen soweit möglich als Kapsel gebaut werden,
analog einer Java Bean – wichtig für jetzt und die Zukunft.‘

Noch nichts eingetragen oder geändert. Eine neue Regel kommt erst mit Wortlaut und deinem ‚Ja‘ (0 Nr. 29); ein neues Thema braucht ‚Ins Backlog
übernehmen?‘ und eine Priorität (0 Nr. 24).

## So verstehe ich es (Vermutung, bitte bestätigen)

Eine Java Bean ist ein in sich geschlossener Baustein: Er hat **Eigenschaften mit Standardwerten**, die man nur über die Schnittstelle liest und setzt,
**Methoden** und **Ereignisse**, auf die man hören kann, und **keinen geteilten Zustand** mit anderen. Für AppDesign hieße das je Element
(Menü, Sprechblase, Fenster, Suche, Wischaktionen …):

- ein Baustein mit einer Schnittstelle: erzeugen mit Einstellungen (z. B. `createMenu({ eintraege, onWahl })`), Eigenschaften lesen und setzen,
  Methoden (`open`, `close`), Ereignisse (`on('wahl', …)`);
- eigener Zustand und eigenes CSS, keine Variablen, die andere Bausteine oder die App von außen beschreiben;
- die App kennt nur die Schnittstelle; jeder Baustein lässt sich allein auf einer Prüfseite testen.

**Begriff:** ‚Kapsel‘ ist in AppDesign schon vergeben – die schwebende Gruppe von Schaltflächen (Designrichtlinie 15.5, `.grp`, R-3.2). Zwei Bedeutungen
für ein Wort widersprächen dem Nummern- und Begriffsschema (2.4). Mein Vorschlag: **‚gekapselter Baustein‘**.

## Heutiger Stand (Befund APD-135/U, Plan Abschnitt 3)

- `ui.js` hat 46 Bausteine: **18 in sich geschlossen**, **28 greifen in die Seite ein**.
- Kopplung: 39 von 160 Variablen sind geteilt, 11 werden von außen geschrieben (`dlg`, `dlgDirty`, `dlgOpener`, `keepTop` …); 21 Bausteine bilden einen
  Kreis. Die App nutzt 69 Namen an 291 Stellen.
- Randbedingungen: eine Datei, klassisches Skript (Module laden nicht von `file://`), globale Namen der App und der Prüfungen bleiben.
- Der Weg dahin ist schon geplant: **APD-135 Paket 6** (B-4: öffentliche Namen als Liste und Prüfung; B-3: Prüfseite, Bausteine einzeln prüfen) und
  **Paket 7 / B-5** (Umbau `ui.js` in eigenständige Bausteine, 8 Schritte). Bei **APD-135/J-27** hast du heute ‚B-5 nach Paket 6 neu entscheiden,
  nur bei Anlass‘ gewählt – dein Wunsch macht B-5 zum festen Ziel.

## Technik – zwei Wege

- **(a) Baustein als Fabrik-Funktion in `ui.js` (Empfohlen):** `createX({…})` gibt ein Objekt mit Eigenschaften (get/set), Methoden und `on(…)` zurück –
  so arbeiten heute schon `createSync` und `createCheck`. Das passt zu den Randbedingungen (eine Datei, `file://`, offline) und lässt sich Schritt
  für Schritt umbauen.
- **(b) Web Components** (Custom Elements mit Shadow DOM): Der Browser kapselt CSS und Aufbau selbst. Dafür wäre der Umbau groß, Fokus, Tastatur und Prüfungen
  müssten durch das Shadow DOM, und Safari kann nur einen Teil davon (die Erweiterung eingebauter Elemente mit `is=` fehlt – Vermutung, prüfe ich vor einem Muster).

Den Apple-Abgleich (SwiftUI-Views und UIKit-Steuerelemente mit Eigenschaften und Aktionen) recherchiere ich in der Klärung, bevor der Wortlaut kommt (0 Nr. 23).

## Fragen

1. **Begriff:** (a) ‚gekapselter Baustein‘ (Empfohlen – ‚Kapsel‘ ist vergeben) · (b) trotzdem ‚Kapsel‘
2. **Technik:** (a) Fabrik-Funktion in `ui.js` (Empfohlen) · (b) Web Components · (c) erst Recherche und Muster
3. **Einordnung:** (a) neues Thema APD-136, Priorität 1, als allgemeine Regel (Wortlaut später); APD-135 Paket 6 und 7 setzen es um, B-5 wird festes Ziel (J-27 neu) (Empfohlen) · (b) eigenes Thema neben APD-135 · (c) nur für neue Elemente, Bestehendes beim nächsten Anfassen
4. **APD-30 Wischaktionen (bereit für 4.60.0):** (a) schon als gekapselter Baustein bauen – die Schnittstelle kommt vor dem Bau als Ergänzung zur Testfall-Liste (Empfohlen, D-1 sieht ohnehin einen gemeinsamen Baustein vor) · (b) wie geplant bauen, später umbauen

## Antworten (17.11.2026)

- Frage 2 Technik: **(a) Fabrik-Funktion in `ui.js`**
- Frage 3 Einordnung: **(a) neues Thema APD-136, Priorität 1, mit APD-135** (Paket 6 und 7 setzen es um, B-5 festes Ziel, APD-135/J-27 neu)
- Frage 4 APD-30: **(a) als erster gekapselter Baustein** (Schnittstelle vor dem Bau als Ergänzung zur Testfall-Liste)
- Frage 1 Begriff: offen – du schreibst im Chat.

Eingetragen werden APD-136 und die Änderung an APD-135/J-27, sobald der Begriff feststeht.

## Begriff – Vorschlag des Nutzers ‚APD-Bean‘ (17.11.2026)

‚Bean‘ trifft genau, was gemeint ist (Java Bean). Das Präfix ‚APD-‘ ist aber vergeben: Nach dem Nummernschema (Zusammenarbeit 2.4) steht ‚APD-n‘
für ein **Thema im Backlog von AppDesign** (APD-30, APD-135 …), und eine Nummer bzw. ein Präfix bezeichnet überall genau eine Sache. ‚APD-Bean‘
läse sich wie ein Backlog-Thema, z. B. ‚APD-Bean Menü‘ neben ‚APD-30‘.

Möglichkeiten:
- **(a) ‚AD-Bean‘ (Empfohlen)** – ‚AD‘ steht im Code schon für AppDesign (`AD_VERSION`, `AD_NEEDED`), kein Konflikt mit dem Schema; z. B. ‚AD-Bean Menü‘,
  im Code `createMenu(…)`
- (b) ‚Bean‘ allein – kurz; in AppDesign gibt es nur eine Art Bean
- (c) ‚APD-Bean‘ trotzdem – dann braucht 2.4 eine Ausnahme

**Entschieden (17.11.2026): (a) ‚AD-Bean‘.** Eingetragen: APD-136 im Backlog (Priorität 1, in Klärung), APD-135/J-27 neu in Abschnitt 7 der Plan-Datei, Hinweis in der Zeile von APD-30.
