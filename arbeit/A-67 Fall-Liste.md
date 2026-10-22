# A-67 Zurückwischen über einem Tageskasten – Fall-Liste Schritt 1 (Messung)

**Stand 22.10.2026** · Sitzung ‚Reiselogbuch 0031‘ · **Ja des Nutzers 22.10.2026**, gebaut in AppDesign 4.30.1 / Reiselogbuch 3.28.1
(15.21, R-7.5, `checkNavigation` F-22, Prüfliste P-65)

## 1. Befund (P-64/5)

Am iPhone (Home-Bildschirm-App) geht das Zurückwischen neben den Tageskästen, über einem Kasten federt die Seite zurück. Die Prüfung
(`checkNavigation` F-6, Maus) ist grün – die Mausnachbildung kennt keine Abbrüche durch Safari. Vermutung: Safari bricht die
Berührung über dem antippbaren Kasten (`div.box.day[role=button][tabindex]`, Maps-Links) ab – `pointercancel`, die Gestenstelle
federt zurück. Nach 0 Nr. 20 zuerst messen, dann nachbauen.

## 2. Schritt 1 – was die Messung zusätzlich aufzeichnet

| Nr. | Fall | Zeile in der Messung | Prüfung |
|---|---|---|---|
| M-1 | Finger auf (pointerdown) | `zeiger down x y touch Ziel` | F-22 (Maus: `mouse`) |
| M-2 | Finger bewegt sich (nur gedrückt) | `zeiger move x y …` | F-22 |
| M-3 | Finger hoch | `zeiger up x y …` | F-22 |
| M-4 | Safari bricht ab | `zeiger cancel x y …`, `touchcancel n Ziel` | F-22 (nachgebildet) |
| M-5 | Ziel ohne Texte | id bzw. `tag.klasse[rolle]`, `in` antippbares Element, `@` nächste id | F-22 (kein Titel in der Datei) |
| M-6 | Gestenstelle: Kandidat | `nav kandidat phone` bzw. `nav kein kandidat [eigen]` | F-22 |
| M-7 | Gestenstelle: verworfen | `nav verworfen richtung/gehalten/offen dx dy` | – (Gerät) |
| M-8 | Gestenstelle: aktiv | `nav aktiv phone dx dy` | F-22 |
| M-9 | über die Hälfte bzw. schnell | `nav fertig weg W tempo T` | F-22 |
| M-10 | unter der Hälfte | `nav zurück gefedert weg W tempo T` | F-22 |
| M-11 | Abbruch (pointercancel) | `nav abgebrochen weg W tempo T` bzw. `nav abgebrochen vor der entscheidung` | F-22 |
| M-12 | Drehen beim Ziehen | `nav abgebrochen drehen` | – (F-14 prüft den Zustand) |
| M-13 | Messung aus | keine Hörer, keine Zeilen | `checkMessung` F1, F6 |

Grenzen: Zeilen der Gestenstelle stehen vor der Zeigerzeile desselben Augenblicks (sie hört zuerst). Abgespielt werden Berührungen
nicht (`abspielen.mjs`).

## 3. Ergebnis der Messung (P-65, Nutzer 23.10.2026) und Schritt 2

**Messung** `messung-2026-10-23-0633.txt` (iPhone, iOS 26.6.2, Home-Bildschirm, 95 s): 25 Zurückwisch-Versuche, **22 von Safari
abgebrochen** (`pointercancel`, Lage 0 0), 3 fertig. Danach rollt Safari den Inhalt selbst (`scroll rolle`).

- **Nicht der Tageskasten:** abgebrochen wird über den Kästen (`div.box.day`) **und** daneben (`dt @rolle`, Kopf des Reiselogbuchs).
- **Auslöser ist die senkrechte Abweichung des Fingers:** Safari bricht ab, sobald sich der Finger seit dem Aufsetzen **10–21 px
  senkrecht** bewegt hat (in 20 von 22 Fällen 10–16 px) – egal wie weit er schon waagrecht ist (bis 289 px, Weg 0,72 der Breite).
  Mit `touch-action: pan-y` gehört das senkrechte Rollen dem Browser; ab etwa 10 px senkrecht beginnt Safari zu rollen und nimmt der
  Seite den Finger weg. Die Gestenstelle wertet das als Abbruch und federt zurück (‚die Startliste federt zurück und verschwindet‘).
  `preventDefault` auf `pointermove` hält Safari nicht auf – nur auf `touchmove`.
- **Fertig** wurde es, wenn der Finger unter 10 px senkrecht blieb (dy 5) bzw. zweimal mit dy 25/35 (über `dd.swipe` bzw. einem
  langen, langsamen Zug) – Safari bricht also nicht ausnahmslos ab.
- **Warum die Prüfung es übersah:** Playwright wischt mit der Maus; Chromium und WebKit der Prüfung entscheiden bei `pan-y` nach
  der ersten Bewegung und rollen danach nie mehr – das Safari-Modell kennt den späten Abbruch nicht.

**Korrektur 4.30.2 / 3.28.2** (Ja des Nutzers 23.10.2026, gebaut – F-23 rot gegen 4.30.1 mit 27 Meldungen, grün mit der Behebung; Prüfliste P-66):

| Nr. | Fall | Prüfung |
|---|---|---|
| K-1 | Safari-Modell (`safari.mjs`): bei `pan-y` und Berührung beginnt Safari ab 10 px senkrecht zu rollen und schickt `pointercancel`, wenn `touchmove` nicht verhindert wurde (Designrichtlinie 13 mit der Messung als Quelle) | Modell-Selbsttest |
| K-2 | Feste Prüfung nach der Messung: Wischen mit Berührung über einem Tageskasten und über dem Kopf, dx 136 / dy 14 in 12 Schritten (180 ms) sowie dy 10, 13, 21 – **rot gegen 3.28.1** | `checkNavigation` F-23 (Chromium und WebKit mit Berührung) |
| K-3 | Behebung: ist die Geste aktiv, verhindert ui.js `touchmove` (nicht passiver Hörer) – Safari rollt nicht, kein Abbruch; die Seite folgt nur dem Finger waagrecht | F-23 grün; F-7 senkrecht rollt weiter |
| K-4 | Vor der Entscheidung (unter 10 px) nichts verhindern – senkrechtes Rollen bleibt wie bisher | F-7, F-8, F-17 |
| K-5 | Messung: `touchmove` mit ‚verhindert‘ bzw. ‚nicht verhinderbar‘ in der Zeile (zur Bestätigung am Gerät) | F-22 |
| K-6 | Dieselbe Lücke überall: Schnellroll-Griff (`.schnell`), Seitenleiste am iPad hoch – gleiche Stelle | `checkGriff`, F-11/F-12 mit Berührung |
| K-7 | Am Gerät (P-66): über Kasten, daneben, schräg, mit laufender Messung | Prüfliste |

## 4. A-66 (dazu)

`checkNavigation` zeichnet Öffnen und Zurück bis zum Ende der Bewegung auf (nav-Klasse gesehen und wieder weg, mindestens 0,6 s,
höchstens 3 s). Beim Bau gefunden: unter Volllast zeigt WebKit manchmal gar kein Bild mitten in der Bewegung (nur Anfang und Ziel) –
dann belegen die Keyframes der Web-Animation (`id = 'nav'`) das Schieben bzw. Überblenden. Geprüft: viermal gleichzeitig (3 × WebKit,
1 × Chromium) grün.
