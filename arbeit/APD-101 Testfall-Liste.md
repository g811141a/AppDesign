# APD-101 – Testfall-Liste

Stand 31.10.2026 · Sitzung Reiselogbuch 0065 · allgemein (AppDesign, jede App). Ein mit ‚…‘ gekürzter Titel in der Kopfzeile (15.3)
oder der Fenster-Kopfzeile (15.8) zeigt beim langen Drücken den ganzen Titel in einer Sprechblase direkt darunter. Entschieden (Nutzer
31.10.2026): nur wenn der Titel gekürzt ist · Fenster und Kopfzeile · Leisten-Knöpfe später als eigenes Thema · Variante B Sprechblase
(Muster `arbeit/bilder/APD-101 4` und `5`) · öffnen mit langem Drücken · bleibt stehen bis Tippen, Rollen oder Esc.

## Ablauf in einem Satz

Wer bei großer Schrift einen gekürzten Titel (‚Reiselogbuch eins…‘) lange drückt, liest den ganzen Titel in einer Sprechblase darunter
und schließt sie mit dem nächsten Tippen.

## So macht es Apple

Ein Apple-Ingenieur (developer.apple.com/forums/thread/831754): Titel der Navigationsleiste wachsen nur wenige Stufen und bleiben dann
stehen; „the user can press and hold to access the Large Content Viewer“ – die Großanzeige erscheint groß in der Mitte des Bildschirms
(WWDC 2019/261). **Abweichung:** bei uns eine Sprechblase unter dem Titel statt der Großanzeige in der Mitte (Wunsch des Nutzers,
Variante B); dieselbe Geste (langes Drücken).

## L – Testfälle (automatisch)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| L-1 | iPhone hoch, größte Schrift | Fenster ‚Reiselogbuch einstellen‘: Titel lange drücken | ein Reiselogbuch | Sprechblase mit genau ‚Reiselogbuch einstellen‘ direkt unter dem Kopf, Pfeil zur Mitte des Titels, Text nicht gekürzt, ganz auf dem Bildschirm (R-4.5) |
| L-2 | iPhone hoch, größte Schrift | Kopfzeile: Titel der Reise lange drücken | Titel ‚Australien und Neuseeland‘ | Sprechblase mit dem ganzen Titel unter der Kopfzeile, Pfeil zur Titelmitte |
| L-3 | iPhone hoch, größte Schrift | Fenster eines Tages: Titel lange drücken | ein Tag | Sprechblase mit dem ganzen Titel des Tages (iPhone: ‚Donnerstag, 27.08.2026‘), wenn er gekürzt ist |
| L-4 | iPhone hoch, größte Schrift | sehr langer Titel lange drücken | Reisetitel mit 80 Zeichen | Sprechblase mehrzeilig, ganz sichtbar, nichts überlappt die Knöpfe der Leiste |
| L-5 | alle Ansichten, normale Schrift | ganz sichtbaren Titel lange drücken (Kopfzeile, Fenster) | kurzer Titel | keine Sprechblase, nichts geschieht |
| L-6 | iPhone hoch, größte Schrift | gekürzten Titel kurz antippen | – | keine Sprechblase |
| L-7 | iPhone hoch, größte Schrift | beim langen Drücken wandert der Finger (mehr als `LANG_WEG`) bzw. rollt | – | keine Sprechblase (R-3.5) |
| L-8 | iPhone hoch, größte Schrift | offene Sprechblase: daneben tippen – auch auf x bzw. Häkchen | – | Sprechblase zu; der Tipp schließt **nur** sie (Fenster bleibt offen, nichts gespeichert) |
| L-9 | iPhone hoch, größte Schrift | offene Sprechblase: Inhalt rollen | – | Sprechblase zu |
| L-10 | iPhone hoch, größte Schrift, Hardware-Tastatur | offene Sprechblase: Esc | – | Sprechblase zu, Fenster bleibt offen (R-4.7) |
| L-11 | iPhone hoch → quer | offene Sprechblase: drehen | – | Sprechblase zu; oberster Eintrag bleibt (Grundregeln) |
| L-12 | alle | nach jedem Schritt | – | Grundregeln (`pruefe.mjs`): Leisten stehen fest (R-2.1), nichts überlappt; der Titel selbst hat den ganzen Text (VoiceOver liest ihn ganz, R-1.8) |
| L-13 | iPhone hoch, größte Schrift | Gegenprobe: ohne Sprechblase | – | L-1 bis L-3 werden rot |

Prüfung: neue Datei `ablauf-titel-blase` im Reiselogbuch (L-1 bis L-11, L-13; rot gegen 3.44.0); Regel R-2.5 in `ablauf.mjs` bzw.
`hig.mjs` (L-5, L-12) für jede App.

## Testfälle (User), nur am Gerät

- iPhone hoch, Textgröße ganz groß: Fenstertitel, Titel der Reise und Titel eines Tages lange drücken – Sprechblase mit dem ganzen Titel;
  daneben tippen schließt sie, ohne etwas anderes auszulösen.
- Dasselbe bei normaler Schrift: nichts geschieht.
