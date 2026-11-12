# RLB-124 – Auswertung des Versuchs

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0107‘ · Messdatei `arbeit/RLB-124/messungen/messung-RLB-124-2026-11-12-23-07.txt`, ausgewertet mit
`arbeit/RLB-124/auswerten.mjs` (keine Widersprüche in den Rohdaten)

## Lauf

App vom Home-Bildschirm (`start home`), iPad quer 1194×834, Safari 27.2, AppDesign 4.57.0, alle 8 Fälle.

## Ergebnis

| Fall | Weg | Rohdaten | Deine Antwort |
|---|---|---|---|
| 1 | `print()` sofort, ohne Fenster (4×) | aufgerufen, Antippen aktiv, zurück nach 1–2 ms, **kein beforeprint/afterprint** | kein Drucken-Menü |
| 2 | `print()` sofort, mit Fenster | ebenso, zurück nach 0 ms | kein Drucken-Menü |
| 3 | `print()` nach 50 ms, ohne Fenster (3×) | ebenso | kein Drucken-Menü |
| 4 | wie ‚PDF‘ in der App (Fenster + 50 ms) | ebenso | kein Drucken-Menü |
| 5 | `print()` aus einem Rahmen (3×) | aufgerufen, kein beforeprint/afterprint | kein Drucken-Menü |
| 6 | Weg c – eigenes Fenster | Fenster offen, Seite 6 s im Vordergrund | Seite kam, **kein** Drucken-Menü |
| 7 | Weg b – HTML teilen | Teilen-Menü kam (nach 22 s geschlossen) | **kein ‚Drucken‘** im Teilen-Menü |
| 8 | Weg a – PDF-Datei teilen | Teilen fertig | **Teilen-Menü kam, gesichert** |

## Befund

- In der App vom Home-Bildschirm übergeht iPadOS 27.2 `print()` in **jeder** Form ohne Meldung. Das gilt sofort und verzögert, mit und ohne Fenster, auch im Rahmen und im eigenen Fenster.
  Belegt durch die Rohdaten: Der Aufruf kehrt nach 0–2 ms zurück, und weder `beforeprint` noch `afterprint` kommt. In Safari geht es (Probe B).
- Damit liegt es **nicht** an Zeitpunkt, Fenster oder Klicksperre (APD-108) der App. Eine Änderung an `exportPdf` allein hilft nicht.
- **Es geht nur Weg a:** Die App erzeugt das PDF selbst und gibt es ins Teilen-Menü (wie heute ‚HTML‘ und ‚Backup erstellen‘).
- Schönheitsfehler im Versuch (nicht in der App): Nach dem Teilen in Fall 8 kam zweimal ‚Can't find variable: db‘. `ui.js` erwartet die
  App-Variable `db`, die der Versuch nicht hat. Das hat das Ergebnis nicht beeinflusst.

## Was jetzt zu klären ist (Weg a)

| Variante | Wie | Vorteil | Nachteil |
|---|---|---|---|
| a1 | **PDF aus Bildern der Ausgabe:** jede Seite der heutigen Ausgabe als Bild ins PDF | sieht genau aus wie die Vorschau, mit Emojis und Verläufen | Text nicht durchsuchbar und nicht markierbar, Datei größer |
| a2 | **PDF mit echtem Text:** Schrift einbetten, Tabellen selbst setzen | durchsuchbar, klein | großer Aufwand, Emojis als Bilder, Aussehen weicht ab |
| a3 | in Safari weiter das Drucken-Menü, in der App vom Home-Bildschirm a1 bzw. a2 | in Safari wie bisher | zwei Wege, die gepflegt werden müssen |

**So macht es Apple:** Das prüfe ich vor dem Muster (z. B. Pages/Numbers ‚Exportieren › PDF‘ ins Teilen-Menü), hier ist es noch nicht belegt.
**Empfehlung:** a1 für **beide** Wege (Safari und App vom Home-Bildschirm), damit es einen einheitlichen Ablauf gibt. Vorher ein Muster mit Testfall-Liste
(0 Nr. 1, 6, 25), gebaut wird nur nach deinem ‚Ja‘.

## Übergabe

Der Kontext liegt bei etwa 255.000 Token (Grenze 300.000, 0 Nr. 13). Das Muster für Weg a braucht viel Platz. **Vorschlag:** die Entscheidung hier treffen
und das Muster in **Reiselogbuch 0108** bauen.

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): ok bis auf /16 Schritt 3 → **RLB-124**.
