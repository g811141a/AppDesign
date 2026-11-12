# P-101 – Rückmeldung und Rückfragen zu P-101/16

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0107‘

## Deine Rückmeldung

- **P-101/16 Schritt 3 nicht ok:** ‚PDF öffnet nicht das Drucken-Menü. Auch nicht aus der Vorschau heraus.‘
- Zu den anderen Testfällen (/0 bis /15, /16 Schritte 1 und 2) hast du nichts geschrieben. Ich lese das als **ok** und frage es in der Kachel nach.
- Eingetragen: **RLB-124** (Priorität 1) in `ReiseLogBuch/BACKLOG.md`, Abschnitt ‚0. Nächste Version‘, Status in Klärung.

## Was ich geprüft habe

- **Nachbildung:** Ich habe iPad quer in Chromium 153 und WebKit 26.0 durchgespielt, einmal über Teilen-Icon › ‚PDF‘ und einmal über die Vorschau › ‚PDF‘.
  In beiden Browsern und auf beiden Wegen wird `window.print()` 53 bis 109 ms nach dem Antippen aufgerufen. Das Antippen gilt dabei noch
  (`userActivation` aktiv), die Druckausgabe ist gefüllt, und es gibt keinen Fehler in der Konsole. **Der Fehler lässt sich damit noch nicht nachstellen.**
- **Code:** `exportPdf` ist Zeichen für Zeichen gleich wie in 3.43.0. Am Gerät zuletzt geprüft und ok war das Drucken in **P-84**
  (3.43.0, AppDesign 4.45.0, 31.10.2026). Danach gab es bis P-101 keinen PDF-Testfall mehr.
- **Mögliche Ursachen (Vermutung, nicht belegt):** (a) eine Änderung in AppDesign 4.46.0 bis 4.57.0, die Safari das Antippen nicht mehr als
  Antippen erkennen lässt (z. B. die Klicksperre APD-108 ab 4.50.0); (b) ein iPadOS-Update, das `window.print()` in der App vom
  Home-Bildschirm nicht mehr zulässt.

## Proben am Gerät (unterscheiden die Ursachen)

**Probe A – Fenster nach ‚PDF‘**
1. iPad quer, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen, Teilen-Icon (share) › ‚PDF‘.
2. Erwartet: Fenster ‚Ausgabe V…‘ mit ‚Drucken-Menü geöffnet für‘ und darunter der Dateiname. → Erschien das Fenster?

**Probe B – in Safari statt in der App vom Home-Bildschirm**
1. iPad quer, hell: in **Safari** https://g811141a.github.io/ReiseLogBuch/ öffnen. Gibt es dort kein Reiselogbuch, ein kurzes mit einem Tag anlegen.
2. Ein Reiselogbuch öffnen, Teilen-Icon (share) › ‚PDF‘.
3. Erwartet: das Drucken-Menü öffnet sich. → Öffnet es sich?

**Probe C – iPhone**
1. iPhone hoch, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen, Teilen-Icon (share) › ‚PDF‘.
2. Erwartet: das Drucken-Menü öffnet sich. → Öffnet es sich?

**Probe D – Version des Systems**
1. iPad: Einstellungen › Allgemein › Info.
2. Erwartet: Zeile ‚iPadOS-Version‘, z. B. ‚26.1‘. → Welche Version steht dort, und gab es seit dem 31.10.2026 ein Update?

Antwort kurz im Chat, z. B. ‚A ja · B ja · C nein · D 26.1, Update ja‘.

## Danach

- B öffnet das Menü, die App vom Home-Bildschirm nicht: Die Ursache liegt bei Safari in der App vom Home-Bildschirm. Ich suche einen anderen Weg
  zum PDF (Vorschlag mit ‚So macht es Apple‘).
- B öffnet es auch nicht: Die Ursache liegt im Code seit 4.46.0. Ich grenze die Fassung ein, stelle sie als feste Prüfung nach (rot gegen 3.55.0)
  und behebe sie in einer Korrekturversion (nur nach deinem ‚Ja‘).

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): /16 Schritt 3 nicht ok → RLB-124. Die vollständigen Schritte stehen in `arbeit/0107 Lagebild.md`.
