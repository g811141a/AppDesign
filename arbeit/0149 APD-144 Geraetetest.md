# APD-144 – Gerätetest: Fokusrahmen nach ‚Zurück‘ (iPhone mit Hardware-Tastatur)

Stand 21.11.2026 · Sitzung 0149 · Reiselogbuch 3.57.11 · AppDesign 4.67.1

## Worum es geht

In WebKit der Prüfumgebung hat am iPhone kein Element mehr einen Fokusrahmen, wenn man nacheinander das Mehr der Kopfzeile öffnet und schließt, ein Reiselogbuch öffnet
und dann ‚Zurück‘ wählt. Chromium zeigt den Fehler nicht. Bevor ich etwas ändere, prüfst du am Gerät, ob es dort genauso ist. Nur wenn auch dort kein Rahmen erscheint,
baue ich eine feste Prüfung und behebe es: Der Fokus soll dann auf die zuletzt geöffnete Kachel zurückgehen.

Apple (**Vermutung**, nicht belegt): Der Fokus kehrt auf die Zeile zurück, von der man kam.

## Link

https://g811141a.github.io/ReiseLogBuch/ – in der **App vom Home-Bildschirm**, mit deinen echten Daten. Es wird nichts geändert.

## Vorbereitung

- Eine Hardware-Tastatur mit dem iPhone verbinden (Bluetooth oder Magic Keyboard).
- Markiert die Tab-Taste nichts: In den Safari-Einstellungen gibt es vermutlich einen Schalter, mit dem Tab jedes Element hervorhebt. Den bitte einschalten. Wie er
  genau heißt, ist nicht belegt.

## Schritte (iPhone hoch, hell)

1. Die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und neu öffnen. Erwartet: Die Startliste ‚Reiselogbücher‘ ist offen.
2. Tab drücken, bis oben die Schaltfläche ‚…‘ (Mehr) einen Fokusrahmen hat. Leertaste drücken. Erwartet: Das Menü öffnet.
3. Esc drücken. Erwartet: Das Menü ist zu, ‚…‘ hat wieder den Fokusrahmen.
4. Tab drücken, bis eine Kachel eines Reiselogbuchs den Fokusrahmen hat. Leertaste drücken. Erwartet: Das Reiselogbuch öffnet.
5. Tab drücken, bis oben links ‚Zurück‘ (`chevron-left`) den Fokusrahmen hat. Leertaste drücken. Erwartet: Die Startliste ist wieder offen.
6. Ansehen, ohne eine Taste zu drücken: **Wo ist jetzt ein Fokusrahmen?** Am besten liegt er auf der Kachel, von der du kamst.
7. Danach einmal Tab drücken. Wo landet der Rahmen?

## Rückmeldung

Im Fenster: Rahmen auf der Kachel · Rahmen woanders · kein Rahmen – Einzelheiten zu Schritt 7 bitte im Chat.

## Ergebnis (Nutzer 21.11.2026, Sitzung 0149, im Fenster)

Nach ‚Zurück‘ liegt der Fokusrahmen **auf der Kachel**, von der man kam. Am Gerät gibt es keinen Fehler, nichts wird geändert. APD-144 ist erledigt (Backlog AppDesign).
