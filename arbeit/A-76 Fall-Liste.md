# A-76 ‚Smiley-Leiste: Ziehen ist kein langes Drücken‘ – Fall-Liste

**Stand 24.10.2026** · Sitzung ‚Reiselogbuch 0041‘ · Fehler am Gerät (Nutzer 24.10.2026): wer die Smiley-Leiste mit dem Finger auf
einem Smiley seitlich zieht, bekommt nach 0,6 s die Abfrage, ob dieses Smiley gelöscht werden soll.

**Ursache:** `onLongPress` (ui.js) bricht den Zeitgeber nur bei `pointerup`/`pointerleave`/`pointercancel` und während einer
Wischgeste der Navigation (`navZug`) ab – nicht, wenn der Finger wandert oder die Leiste rollt.
**So macht es Apple:** langes Drücken gilt nur, solange der Finger höchstens etwa 10 pt wandert; beginnt das Rollen, ist es
abgebrochen (Tapback, Home-Bildschirm). **Behebung:** abbrechen bei Bewegung über 10 px und beim Rollen der umgebenden Rollfläche.

| Nr. | Fall | Erwartung |
|---|---|---|
| L1 | Nachgebauter Ablauf: iPhone, Tag öffnen, auf einem Smiley aufsetzen, seitlich ziehen (Leiste rollt), länger als 0,6 s | keine Abfrage – rot gegen 4.32.2 |
| L2 | Ziehen, danach den Finger noch stehen lassen | keine Abfrage |
| L3 | Ziehen beginnt erst nach 0,4 s (vor 0,6 s) | keine Abfrage |
| L4 | Langes Drücken still (Finger wackelt höchstens 10 px) | Abfrage ‚löschen‘ wie heute |
| L5 | Kurz antippen | fügt das Smiley ein wie heute |
| L6 | Dasselbe in der Essen-Leiste und im Fazit (alle Nutzer von `onLongPress`) | wie L1–L5 |
| L7 | Zurückwischen und Blatt ziehen | wie heute (kein langes Drücken) |
| L8 | iPad mit Maus oder Trackpad: drücken und halten / ziehen | halten löscht, ziehen nicht |
| L9 | Grundregeln nach jedem Schritt (`pruefe.mjs`), Chromium und WebKit mit Safari-Modell | grün |

Gerät (Prüfliste): Smiley-Leiste ziehen ohne Abfrage, langes Drücken löscht weiterhin.
