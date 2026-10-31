# APD-105 – Testfall-Liste: Antippen und langes Drücken

Stand 31.10.2026, Sitzung 0067 · Nummern B-1 bis B-8 (in 0067 mit dem vergebenen Präfix der Erkenntnisse geschrieben, umbenannt in 0068 nach Zusammenarbeit 2.4; Inhalt unverändert) · Muster `arbeit/APD-105 Muster.html` · **Variante C gewählt** (Nutzer 31.10.2026: Knöpfe dimmen, Zeilen grau) ·
aus APD-62 (APD-38/T-33, APD-38/T-34).

## Apple-Abgleich (0 Nr. 23, 2.6)

- **Antippen:** iOS dimmt eine Schaltfläche beim Berühren (UIButton ‚adjustsImageWhenHighlighted‘, Standard an – Apple Developer
  Forums https://developer.apple.com/forums/thread/694625 und die ältere UIButton-Referenz; zweitrangige Quellen). Ionic zeigt
  den gedrückten Zustand sofort, in Rolllisten verzögert (100 ms), Framework7 nach 80 ms und hebt ihn ab 5 px Bewegung auf
  (`arbeit/APD-38 Framework-Vergleich.html`, APD-38/T-33). Graue Fläche bei Listenzeilen: **Vermutung**, am Gerät mit Notizen bzw.
  Einstellungen zu vergleichen.
- **Langes Drücken:** etwa 0,5 s, der Eintrag hebt sich an (wächst, Schatten, Haptik), dann das Kontextmenü; Bewegung bricht ab
  (APD-38/T-34; HIG Context menus https://developer.apple.com/design/human-interface-guidelines/context-menus; Uxcel-Kurs zur HIG).
- **Abweichung im Web:** keine Haptik (Vermutung: Safari auf iOS bietet dafür nichts an); 0,6 s bleibt (R-3.5).
- **Betroffen:** R-3.5 (langes Drücken), R-3.1 bis R-3.3 (Schaltflächen), 4 ‚gedrückt = blau getönt‘ (Schaltfläche eines offenen
  Menüs bleibt davon unberührt), 15.12 Smiley-Leiste, 15.4 Liste, R-2.6 (APD-104, Großanzeige – beim Halten erst Rückmeldung, dann
  die Anzeige).

## Testfälle (automatisch) – im Muster schon geprüft

Notizordner der Sitzung, Chromium und WebKit, je Variante: **78 grün, 0 rot**.

| Nr. | Fall | Erwartet |
|---|---|---|
| B-1 | Knopf in der Leiste berühren | sofort gedrückt (A, C dimmen auf 0,35; B graue Fläche) |
| B-2 | loslassen | Rückmeldung blendet in 0,15 s aus, Knopf löst aus |
| B-3 | Listenzeile berühren | nach 30 ms noch nichts, nach 80 ms gedrückt (A dimmt; B, C grau) |
| B-4 | nach dem Berühren 20 px wegziehen | Rückmeldung weg, nichts ausgelöst |
| B-5 | Smiley halten | ab 0,15 s hebt es sich (größer, Schatten) |
| B-6 | Smiley 0,6 s halten | Sprechblase ‚Entfernen‘, Loslassen löst kein Antippen aus |
| B-7 | Tipp neben die Sprechblase | schließt nur sie |
| B-8 | Smiley halten, nach 0,3 s wegziehen | senkt sich, keine Sprechblase |

## Für den Bau dazu (nach der Wahl der Variante)

- Rollen (Liste, Smiley-Leiste, Kapsel) hebt die Rückmeldung auf; Wischgesten (Zurückwischen, Seitenleiste) ebenso.
- Gesperrte Schaltflächen (40 %) zeigen keine Rückmeldung; ‚Bewegung reduzieren‘: Anheben nur mit Schatten.
- Großanzeige (APD-104) ab AX1: Rückmeldung beim Berühren, nach 0,6 s die Anzeige.
- Alle Ansichten (iPad quer/hoch, iPhone hoch/quer), Fenster, Menüs, Seitenleiste; hell und dunkel; Testfälle (User) am Gerät:
  Gefühl, kein Aufblitzen beim Rollen.
