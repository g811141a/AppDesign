# A-75 ‚Auswahl-Kapsel erkennbar wischbar‘ (Reiselogbuch T-106) – Apple-Abgleich, Varianten, Fall-Liste

**Stand 24.10.2026** · Sitzung ‚Reiselogbuch 0041‘ · Muster: `arbeit/A-75 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-75%20Muster.html, oben umschalten: Heute · A · B · A + B) – im Muster geprüft
in Chromium und WebKit (iPhone hoch, drehen nach quer, wischen: Breite und Rollbalken wie erwartet, keine Fehler)

## 1. Heute (15.12, R-5.4)

- Reicht der Platz nicht, lässt sich der Inhalt der Auswahl-Kapsel seitlich wischen; ein weicher Verlauf (48 px) am Rand zeigt,
  wo es weitergeht (`.fl`/`.fr`, `mountCap`).
- Am iPhone wirkt der Verlauf wie das Ende der Zeile (Nutzer 24.10.2026): quer verschwindet ‚Fuß‘ ganz im Verlauf, hoch ist von
  ‚Flugzeug‘ nur ein blasses Symbol zu sehen, bei den Smileys kaum etwas.

## 2. Apple-Abgleich (iOS 26)

| Was | So macht es Apple | Für uns |
|---|---|---|
| Wischbare Reihen | Kapsel- und Kartenreihen (Karten-Kategorien, App Store, Musik, Fotos-Sammlungen) schneiden das letzte sichtbare Element hart an (‚Peek‘), ohne Verlauf | A |
| Rollbalken | Eine Rollfläche blendet beim Erscheinen kurz ihren Rollbalken ein (`flashScrollIndicators`), sonst nur beim Rollen; dünn, halbdunkel, mit Abstand zum Rand | B |
| Bewegung reduzieren | Rollbalken erscheint trotzdem, nur ohne Überblenden | B |

Quellen: [HIG – Collections](https://developer.apple.com/design/human-interface-guidelines/collections),
[HIG – Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views) (‚show scroll indicators when
it helps people know there is more content‘), [UIScrollView.flashScrollIndicators](https://developer.apple.com/documentation/uikit/uiscrollview/flashscrollindicators()).
**Abweichungen:** Safari zeigt in einer Web-App den Rollbalken der Kapsel nicht von selbst an (er ist ausgeblendet, damit er
nicht über die Einträge läuft) – B baut ihn nach. Apple passt beim Anschnitt die Breite nicht an; bei uns wird die Kapsel bei
Bedarf etwas schmaler, damit nie nur ein Rest oder ein fast ganzer Eintrag zu sehen ist (Einträge sind verschieden breit).

## 3. Varianten im Muster

| | Wie | Vorteil | Nachteil |
|---|---|---|---|
| **Heute** | Verlauf 48 px | ruhig | wirkt wie das Ende der Zeile |
| **A Anschnitt** | kein Verlauf; vom angeschnittenen Eintrag sind 30–80 % von Symbol und Text zu sehen, sonst wird die Kapsel so schmal, dass 60 % zu sehen sind | wie Apple, immer sichtbar, ohne Bewegung | Kapsel ist manchmal schmaler als der Platz (hoch Reisemittel 226 statt 301 px); harter Schnitt durch einen gewählten Eintrag |
| **B Rollbalken kurz** | Verlauf bleibt; beim Öffnen, Drehen und wenn der Platz knapp wird ~1 s ein Balken unten in der Kapsel (3 px, Länge = sichtbarer Anteil), ebenso beim Wischen | zeigt, wie viel noch kommt | nur einen Moment zu sehen; Verlauf wirkt danach wieder wie das Ende |
| **A + B** | beides | Hinweis dauerhaft und beim Öffnen deutlich | zwei Mittel für einen Zweck |

Empfehlung Claude: **A + B** – A trägt dauerhaft (auch nach einer Sekunde), B macht das Öffnen deutlich, beides wie Apple.

## 4. Fall-Liste (wird beim Bau eine Prüfung in `hig.mjs` bzw. `ablauf.mjs`)

| Nr. | Fall | Erwartung | Muster |
|---|---|---|---|
| K1 | iPhone hoch: Reise bearbeiten, Reisemittel | A: angeschnittener Eintrag 30–80 % sichtbar; B: Balken ~1 s, dann weg | ja |
| K2 | iPhone quer: dasselbe | wie K1 | ja |
| K3 | Alles passt (Wetter, Smileys quer, iPad) | kein Anschnitt, kein Balken, Kapsel so breit wie ihr Inhalt | ja |
| K4 | Wischen bis zum Ende und zurück | A: am Ende schließt der letzte Eintrag bündig ab, links wird angeschnitten; B: Balken folgt dem Wischen, verschwindet 0,6 s danach | ja |
| K5 | Drehen hoch ↔ quer mit offenem Blatt | Breite und Anschnitt neu, Balken einmal kurz; Rollstand bleibt | ja |
| K6 | Platz wird knapp (Fenster schmaler, iPad geteilt) | Anschnitt neu; Balken einmal | ja |
| K7 | Smiley-Leiste mit rotate-ccw | Anschnitt nur in der Kapsel, rotate-ccw bleibt rechts | ja |
| K8 | Gewählter Eintrag außerhalb (Wohnmobil) | Kapsel beginnt links wie heute; Anschnitt bzw. Balken zeigen, dass es weitergeht | ja |
| K9 | Wählen und Abwählen | Breite der Kapsel und Anschnitt ändern sich nicht (R-5.4) | ja |
| K10 | Smileys ausblenden/zurücksetzen (Zahl ändert sich) | Anschnitt neu, Rollstand bleibt | beim Bau |
| K11 | ‚Bewegung reduzieren‘ | Balken ohne Überblenden; Blatt ohne Gleiten | ja |
| K12 | Dunkel | Balken hell (weiß 35 %) statt dunkel | beim Bau |
| K13 | Größere Textgröße (A-43 Teil 2) | Anschnitt mit den neuen Breiten | beim Bau |
| K14 | Grundregeln nach jedem Schritt (`pruefe.mjs`) | nichts überlappt, nichts springt | beim Bau |

Geräte-Prüfliste: Wischgefühl, ob der Balken auffällt und nicht stört, ob der Anschnitt am iPhone als ‚geht weiter‘ gelesen wird.

## 5. Regeln

- **15.12 / R-5.4** neu gefasst: ‚seitlich wischbar; passt nicht alles, schneidet die Kapsel den nächsten Eintrag sichtbar an
  (A) und zeigt beim Erscheinen kurz den Rollbalken (B)‘ – je nach Wahl. Prüfung `hig.mjs` statt ‚Verlauf am Rand‘: Anteil des
  angeschnittenen Eintrags 30–80 %, Balken beim Öffnen sichtbar und nach 1,5 s weg.
- Im Reiselogbuch (T-106) nichts Eigenes außer der bewussten Abweichung ‚Wetter 40 px‘ (bleibt).
