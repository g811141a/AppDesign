# A-37 ‚Nach oben / Ans Ende‘ verbessern – Apple-Abgleich, Varianten, Fall-Liste

**Stand 21.10.2026** · Sitzung ‚Reiselogbuch 0025‘ · Muster: `arbeit/A-37 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html)

## 1. Heute (R-3.2, 15.17, 15.22)

Senkrechte Kapsel unten rechts mit `arrow-up-to-line` und `arrow-down-to-line`, iPad und iPhone in der Inhaltsansicht,
sichtbar sobald es etwas zu rollen gibt – auch ganz oben (dann bewirkt ‚Nach oben‘ nichts) und ganz am Ende (‚Ans Ende‘
bewirkt nichts). Über der Tastatur, nie über Kopf- oder Suchzeile (A-33); bei offener Tastatur rollt sie erst nach dem
Schließen (A-36). Bewusste Abweichung von Apple (A-15: Statusleiste und Rollbalken waren zu schwerfällig).

## 2. Apple-Abgleich

| Wo | Was Apple macht | Für uns |
|---|---|---|
| iOS allgemein | Statusleiste antippen → ganz nach oben (`scrollsToTop`) | wirkt nicht im eigenen Rollbereich (Designrichtlinie 13); nur nach oben |
| Fotos, Kontakte, lange Listen | Rollbalken halten und ziehen → schnell durch die Liste; Fotos zeigt dabei das Datum | Vorbild für **C** |
| iOS 26, Tab-Leiste | aktiven Tab nochmals antippen → nach oben | keine Tab-Leiste |
| HIG Scroll views | Standardgesten unterstützen, sichtbar machen, dass Inhalt rollt | erfüllt |
| Chat-Apps (Gemini, ChatGPT, WhatsApp) | runder Knopf mit ↓ unten in der Mitte, sobald man nicht am Ende ist; verschwindet am Ende | Vorbild für **A** |

Apple selbst hat keinen allgemeinen ‚Ans Ende‘-Knopf; der Knopf ist ein Muster der Chat-Apps. Die Beschreibung der
Gemini-App stammt aus meinem Wissen und ließ sich per Suche nicht bestätigen – bitte am Gerät mit Gemini vergleichen.
Quellen: [HIG – Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views),
[UIScrollView.scrollsToTop](https://developer.apple.com/documentation/uikit/uiscrollview/scrollstotop).

## 3. Varianten im Muster (Umschalter oben rechts: Heute · A · B · C)

| | Aussehen | Verhalten | Vorteil | Nachteil |
|---|---|---|---|---|
| **Heute** | Kapsel unten rechts, ↑ und ↓ | immer beide | bekannt | ein Pfeil oft ohne Wirkung, deckt rechts unten ab |
| **A (wie Gemini)** | ein runder Knopf unten in der Mitte | Pfeil folgt der letzten Wischrichtung (↓ Ans Ende, ↑ Nach oben); erscheint erst, wenn das Ziel weiter als eine halbe Bildschirmhöhe weg ist; am Ziel dreht er auf die andere Richtung | ein Knopf, zeigt nur, was du gerade willst | in der Mitte deckt er Text ab; Meldungen (Toast) müssen darüber |
| **B (Kapsel, die mitdenkt)** | Kapsel unten rechts wie heute | oben nur ↓, am Ende nur ↑, dazwischen beide; nahe einem Ende fehlt dessen Pfeil | kleine Änderung, nichts ohne Wirkung | Kapsel wechselt die Höhe |
| **C (wie Apple Fotos)** | Griff rechts am Rand | erscheint beim Wischen, ziehen springt durch das ganze Reiselogbuch, Blase zeigt den Tag; blendet nach 1,5 s aus; ganz oben/unten ziehen = Anfang/Ende | jeder Tag direkt erreichbar, Apple-Muster | erst wischen, dann ziehen; kein Antippen |

Kombinationen sind möglich (z. B. A + C oder B + C).

## 4. Fall-Liste (für den Bau, nach der Wahl)

Jeder Fall wird eine automatische Prüfung (Chromium und WebKit, hell und dunkel), Ausnahmen in der Prüfliste.

| Nr. | Fall | Erwartet |
|---|---|---|
| F-1 | iPad quer/hoch, iPhone hoch/quer | Lage wie gewählt, im sicheren Bereich, nie über Kopf- oder Suchzeile (R-3.2) |
| F-2 | Inhalt kürzer als der Bildschirm | nichts sichtbar |
| F-3 | ganz oben · Mitte · ganz am Ende · knapp vor einem Ende | nur Pfeile, die etwas bewirken (A, B); C nur beim Wischen |
| F-4 | Richtung wechseln (A) | Pfeil wechselt sofort, ohne Drehung |
| F-5 | Antippen während des weichen Rollens | rollt zum Ziel, Anzeige danach richtig |
| F-6 | Tastatur offen (Feld im Inhalt, Suche) | über der Tastatur; passt sie nicht (iPhone quer), ausgeblendet; rollt erst nach dem Schließen (wie 4.28.1) |
| F-7 | Suche mit Treffern, Treffer weiter | Anzeige folgt dem neuen Rollstand |
| F-8 | Drehen | Rollstand bleibt, Anzeige neu berechnet |
| F-9 | Fenster offen | nicht sichtbar und nicht bedienbar |
| F-10 | Neuaufbau (`setHtml`), Tag gespeichert | Anzeige neu berechnet |
| F-11 | sehr langes Reiselogbuch (365 Tage) | ‚Ans Ende‘ kommt schnell an; C: Blase zeigt den richtigen Tag |
| F-12 | Startliste, Seitenleiste | wie heute keine Kapsel |
| F-13 | Drucken | ausgeblendet |
| F-14 | Meldung (Toast) gleichzeitig | überdeckt sich nicht (A: Toast darüber) |
| F-15 | VoiceOver | Bezeichnung ‚Nach oben‘ bzw. ‚Ans Ende‘ passt zum Pfeil |
| F-16 | nur am Gerät (Prüfliste) | Gefühl beim Antippen und Ziehen, Verdeckung von Text, Griff mit dem Daumen (C) |

## 5. Danach

Gewählte Variante → R-3.2 ergänzen (eine Regel, eine Prüfung: `checkFab` erweitern), Designrichtlinie 4, 15.17, 15.22,
Fall-Liste ergänzen, Ja des Nutzers, dann Bau als AppDesign 4.29.0 / Reiselogbuch 3.27.0.
