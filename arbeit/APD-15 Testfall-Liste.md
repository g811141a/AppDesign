# Testfall-Liste APD-15 – Kapsel ‚Nach oben / Ans Ende‘ auch auf dem iPhone

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · Wunsch des Nutzers (Rückmeldung zu P-45, Entscheidung aus P-45 widerrufen:
der Apple-Weg – Statusleiste antippen, Scroll-Leiste ziehen – ist zu schwerfällig).
Geplant: **AppDesign 4.20.0** und **Reiselogbuch 3.19.0** (Fassung 4.20.0)

**Heute:** iPad – senkrechte Kapsel unten rechts (`.fab`, R-3.2); iPhone-Aufbau – ausgeblendet (`html.phone .fab`).
**Neu:** im iPhone-Aufbau dieselbe Kapsel unten rechts in einem geöffneten Reiselogbuch (Tageskästen), gleiches Aussehen
und gleiche Größe wie am iPad (2 × 44 px, schwebend). Bewusste Abweichung von Apple (iPhone kennt keine solche Kapsel)
→ Eintrag ‚Bewusste Abweichungen von der HIG‘.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| K1 | iPhone hoch, Reiselogbuch mit vielen Tagen | Kapsel unten rechts sichtbar, über dem Inhalt, Abstand 16 px + sicherer Bereich | ablauf-iphone |
| K2 | ‚Ans Ende‘ antippen | rollt bis ganz unten (Statistik sichtbar) | ablauf-iphone |
| K3 | ‚Nach oben‘ antippen | rollt ganz nach oben (Kopf mit Titel groß) | ablauf-iphone |
| K4 | iPhone quer | wie K1–K3, rechts neben der Notch-Zone (sicherer Bereich) | ablauf-iphone |
| K5 | Startliste ‚Reiselogbücher‘ | **keine** Kapsel (wie am iPad in der Seitenleiste) – siehe Frage 2 | start-regeln |
| K6 | Wenig Tage, nichts zu scrollen | Kapsel ausgeblendet (R-3.2) | ablauf-iphone |
| K7 | Fenster offen (Tag, Einstellungen, Vorschau) | Kapsel liegt hinter dem Fenster bzw. ist verdeckt | Grundregeln |
| K8 | Suche offen, Tastatur offen | Kapsel stört die Suchzeile nicht; hinter der Tastatur | ablauf-iphone |
| K9 | Letzter Tageskasten ganz unten | wird von der Kapsel nicht verdeckt (Abstand unten reicht) | hig (Verdeckung) |
| K10 | Offline-Hinweis unten | lässt seitlich Platz für die Kapsel (wie am iPad, 72 px) | offline-regeln |
| K11 | Hell / dunkel | Kapsel wie am iPad (Lichtkante, Schatten) | hig |
| K12 | iPad unverändert | Kapsel wie bisher | vorhandene Prüfungen |
| K13 | iPad im schmalen Fenster (iPhone-Aufbau) | wie iPhone (K1–K6) | ablauf-iphone |
| K14 | Gegenprobe | mit `html.phone .fab { display: none }` sind K1–K4 rot | Gegenprobe |

**Nur am Gerät (Testfälle):** Gefühl beim Antippen (weiches Rollen), Kapsel über dem Home-Balken, quer neben der Notch.

**Ergebnis (17.10.2026):** gebaut in AppDesign 4.20.0 und Reiselogbuch 3.19.0, Prüfung `kapsel-iphone.mjs`; Gegenprobe rot (14 Fehler).
K6 (ohne Scrollen) wird am iPad mit sehr hohem Fenster geprüft – im iPhone-Aufbau gibt es wegen 120 px Platz unten immer Scrollweg.
K9 und K10 prüfen hig.mjs (Verdeckung) und offline.mjs (Meldung verdeckt die Kapsel nicht).
