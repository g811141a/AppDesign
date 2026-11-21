# Usertest P-117 – Reiselogbuch 3.57.10 · AppDesign 4.67.0

Offen ist nur dieser Usertest. Testfälle wörtlich aus dem CHANGELOG des Reiselogbuchs 3.57.10.

Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.
Link des Katalogs (in Safari): https://g811141a.github.io/AppDesign/katalog/index.html

**P-117/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.10 · erstellt am … · AppDesign 4.67.0‘. Automatisch geprüft in `version-regeln`.

**P-117/1 – Katalog ‚Hervorgehobene Quelle‘ am iPad (APD-136 sourcehighlight)**
1. iPad quer, hell; in Safari den Link des Katalogs öffnen, ganz neu laden.
2. In der Seitenleiste unter ‚Aktionen und Menüs‘ ‚Hervorgehobene Quelle‘ antippen; unter ‚Ausprobieren‘ nacheinander ‚Fenster-Quelle: erster Knopf‘, ‚Fenster-Quelle:
   zweiter Knopf‘, ‚Fenster-Quelle frei‘ antippen.
3. Erwartet: zuerst ist ‚Erster Knopf‘ blau getönt, dann nur ‚Zweiter Knopf‘, zuletzt keiner; unter ‚Ereignisse‘ steht oben ‚change · frei · #bkQ2‘. Automatisch
   geprüft in `bausteine-pruefseite` (Teil `fenster`, APD-136/S-9) und `bean-katalog`.

**P-117/2 – Gehaltene Quelle bleibt nach dem Neuaufbau blau (APD-136 sourcehighlight)**
1. iPad quer, hell; Katalog wie in P-117/1, Seite ‚Hervorgehobene Quelle‘.
2. ‚Ersten Knopf halten‘ antippen, dann ‚Knöpfe neu aufbauen (refresh)‘, dann ‚Ersten Knopf freigeben‘.
3. Erwartet: nach ‚halten‘ und nach dem Neuaufbau ist ‚Erster Knopf‘ blau, unter ‚Ereignisse‘ ‚Neu aufgebaut · gehalten: 1‘; nach ‚freigeben‘ ist er nicht mehr blau,
   oben ‚change · frei · #bkQ1‘. Automatisch geprüft in `bausteine-pruefseite` (Teil `fenster`, APD-136/S-10).

**P-117/3 – Mehr-Knopf blau, solange das Menü offen ist (APD-136 sourcehighlight)**
1. iPhone hoch, hell; in der App in der Startliste oben auf ‚…‘ (Mehr) tippen.
2. Das Menü ansehen, dann daneben tippen.
3. Erwartet: solange das Menü offen ist, ist ‚…‘ blau hinterlegt und zeigt drei senkrechte Punkte; nach dem Schließen ist ‚…‘ wieder grau mit waagrechten Punkten.
   Automatisch geprüft in `bausteine-pruefseite` (Teil `menue`, APD-136/S-6, APD-135/Q-2).

**P-117/4 – Wischaktionen unverändert (APD-136 Namen)**
1. iPad quer, hell; mindestens zwei Reiselogbücher; in der Seitenleiste eine Kachel langsam nach links wischen.
2. Die rote Kapsel ‚Löschen‘ antippen, dann in der Sprechblase ‚Abbrechen‘.
3. Erwartet: rechts neben der Kachel zwei Kapseln mit den Wörtern ‚Einstellen‘ und ‚Löschen‘ darunter (‚Löschen‘ rot, außen); die Sprechblase wächst aus der roten
   Kapsel mit ‚‚<Titel>‘ mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher ein Backup erstellen.‘ und den Knöpfen ‚Reiselogbuch
   löschen‘ und ‚Abbrechen‘; nach ‚Abbrechen‘ gleitet die Kachel zurück, nichts ist gelöscht. Automatisch geprüft in `ablauf-wischen`.

**P-117/5 – Hinweisfenster unverändert (APD-136 Namen)**
1. iPad quer, hell; Katalog, Seite ‚Hinweisfenster‘.
2. Unter ‚Ausprobieren‘ ‚Langer Dateiname‘ antippen, dann das x.
3. Erwartet: Fenster ‚Backup‘ mit ‚Das Backup wurde in Dateien gesichert:‘ und darunter fett in einer Zeile ‚Ω Backup Reiselogbuch 2026.11.19 20.41.json‘; unter
   ‚Ereignisse‘ nach dem x oben ‚close‘. Automatisch geprüft in `bean-katalog` und `backup-regeln` (Breite nach Dateiname).

**P-117/6 – iPhone quer: Liste bleibt beim Kontextmenü stehen (APD-143)**
1. iPhone quer, hell; in der App mindestens zwei Reiselogbücher, Startliste ganz oben.
2. Die untere sichtbare Kachel lange drücken, dann daneben tippen.
3. Erwartet: die Liste bewegt sich nicht; das Menü mit ‚Reiselogbuch einstellen‘ und rot ‚Reiselogbuch löschen‘ steht linksbündig über der Kachel (passt es darunter,
   darunter); beim Schließen schrumpft es zur Kachel, nichts springt. Automatisch geprüft in `bausteine-pruefseite` (Teil `menue`, APD-143/L-1, L-2) und
   `kontextmenue-regeln`.

**P-117/7 – iPhone hoch: unterste Kachel (APD-143)**
1. iPhone hoch, hell; in der App so viele Reiselogbücher, dass die Startliste rollt; ganz nach unten rollen.
2. Die unterste Kachel (über der Backup-Kachel bzw. der Offline-Zeile) lange drücken, dann daneben tippen.
3. Erwartet: das Menü mit ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ steht über der Kachel, ganz über der Backup-Kachel; die Liste bleibt stehen, auch beim
   Schließen. Automatisch geprüft in `ablauf-seitenleiste-position` (APD-143/L-9) und `kontextmenue-regeln` (Fall ‚ende‘, APD-143/L-4).
