# Fall-Liste A-16 (Position beim Öffnen, R-7.4) und A-17 (R-8.1 Seitenleiste ein/aus)

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · aus Reiselogbuch T-89 und T-90 · geplant: **AppDesign 4.21.0** und
**Reiselogbuch 3.20.0** (Version A; die Tastatur, A-18/T-91, folgt als Version B)

## A-16 – Position beim Öffnen (neue Regel R-7.4)

**Regel (Vorschlag):** Ein Eintrag (z. B. ein Reiselogbuch) öffnet **ganz oben**. Legt die App einen ‚nächsten offenen‘
Eintrag fest (Reiselogbuch: erster nicht erfasster Tag), steht dieser **direkt unter dem Kopf** – am iPad unter dem
Tabellenkopf, am iPhone unter der Leiste – und ist hervorgehoben; nie in der Mitte. Gebaut in `ui.js` (`openAt`).

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| P1 | iPad quer: alle Tage erfasst, vorher ein anderes Reiselogbuch weit unten | ganz oben (erste Zeile), kein Tag hervorgehoben | ablauf (neu `checkOpenAt`) |
| P2 | iPad quer: Tag 15 nicht erfasst | Tag 15 hervorgehoben, Oberkante = Unterkante des Tabellenkopfs (± 2 px) | checkOpenAt |
| P3 | iPad hoch (Seitenleiste darüber) | wie P2 | checkOpenAt |
| P4 | iPhone hoch: Tag 15 nicht erfasst | Kachel hervorgehoben direkt unter der Leiste | checkOpenAt |
| P5 | iPhone hoch und quer: alle erfasst | ganz oben, großer Titel sichtbar, keine Kachel hervorgehoben | checkOpenAt |
| P6 | Erster Tag nicht erfasst | Tag 1 direkt unter dem Tabellenkopf (die Angaben über der Tabelle rollen nach oben weg – wie bei jedem anderen Tag) | checkOpenAt |
| P7 | Letzter Tag nicht erfasst (nicht so weit rollbar) | ganz unten, der Tag ist sichtbar und hervorgehoben | checkOpenAt |
| P8 | Start der App (Neuladen, iPad) | wie P1/P2 für das zuletzt verwendete Reiselogbuch | start-regeln |
| P9 | iPhone: aus der Startliste öffnen | wie P4/P5 | checkOpenAt |
| P10 | Zurück aus dem Fenster ‚Tag‘ (R-7.3) | kein neuer Sprung, Tabelle steht wie vorher | vorhanden (checkListStill) |
| P11 | Suche/Filter ‚Nur erfasste Tage‘ | beim Öffnen immer ‚Alle Tage‘, dann wie P1/P2 | vorhanden |
| P12 | Hell / dunkel | Hervorhebung sichtbar | voller Lauf |

## A-17 – R-8.1 erweitert: Seitenleiste ein/aus

**Regel (Vorschlag):** Oben bleibt derselbe Eintrag stehen bei **jeder** Änderung der Anordnung – Drehen, Seitenleiste
ein/aus, Fenstergröße. Gebaut in `ui.js` (`keepPlace`), die App ruft es beim Umschalten der Seitenleiste.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| S1 | iPad quer, Tabelle in der Mitte: Seitenleiste aus | oberster sichtbarer Tag steht an derselben Stelle (± 2 px) | ablauf (neu `checkSideToggle`) |
| S2 | … und wieder ein | wie S1 | checkSideToggle |
| S3 | Fünfmal hintereinander aus/ein | kein Wandern (Abweichung ≤ 2 px) | checkSideToggle |
| S4 | Kurz vor dem Ende der Tabelle | kein Sprung ans Ende | checkSideToggle |
| S5 | Ganz oben | bleibt ganz oben | checkSideToggle |
| S6 | iPad hoch (Seitenleiste über dem Inhalt) | Inhalt bewegt sich gar nicht | checkSideToggle |
| S7 | Drehen (R-8.1 wie bisher) | unverändert | vorhanden (hig Drehprüfung) |
| S8 | Gegenprobe | ohne `keepPlace` rutscht der Tag → rot; ohne `openAt` steht der Tag in der Mitte → rot | Gegenprobe |

**Nur am Gerät (Prüfliste):** Gefühl beim Umschalten (kein Flackern), Öffnen eines langen Reiselogbuchs auf iPad und iPhone.

**Ergebnis (17.10.2026):** gebaut in AppDesign 4.21.0 und Reiselogbuch 3.20.0, Prüfung `oeffnen-position.mjs` (iPad quer und
hoch, iPhone hoch und quer, hell und dunkel, Chromium und WebKit). Gegenprobe mit dem alten Verhalten rot (40 Fehler). Dabei
gefunden: am Ende der Seite (Fazit, Statistik) gibt es keinen Tag als Anker – `keepPlace` hält dort den Abstand zum Ende.
