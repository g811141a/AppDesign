# APD-140 Testfall-Liste – Bean-Katalog

**Stand 19.11.2026** · Sitzung 0141 · Nummern gelten nur in dieser Datei (außerhalb: APD-140/M-1 …). Testen schlank (Entscheidung 0139): geprüft wird, dass der
Katalog nicht veraltet und nicht kaputt ist; die eigentlichen Prüfungen der Beans bleiben auf der Prüfseite (APD-135/B-3).

## Muster (`arbeit/APD-140 Muster prüfen.mjs`, Chromium und WebKit, Varianten A und B × iPad quer, iPad hoch, iPhone hoch, iPhone quer)

| Nr. | Fall | Erwartet | Stand |
|---|---|---|---|
| M-1 | Laden | ohne Fehler in der Konsole, AppDesign aus `v4/` geladen | grün |
| M-2 | Seitenleiste | Bereiche als Abschnittsköpfe (Überschrift, R-7.6), 2 Beans als Kacheln, geplante grau und nicht antippbar; iPhone: Startliste ohne blauen Eintrag (R-7.2) | grün |
| M-3 | Bean antippen | Titel in der Leiste = Name (R-2.2), Adresse `#kennung`, am iPad die Kachel blau (R-7.1) | grün |
| M-4 | `hinweis` – Fall antippen | Fenster geht auf, Schließen meldet ‚zu‘ im Protokoll | grün |
| M-5 | `hinweis` – langer Dateiname | am iPad in einer Zeile (R-10.8); Schalter ‚Breite nach Dateiname‘ aus → Umbruch | grün · Gegenprobe `zeile` rot |
| M-6 | `swipeactions` – wischen | Kachel offen mit ‚Einstellen‘ und ‚Löschen‘, Protokoll ‚offen‘; Kachel ohne Aktionen bleibt zu | grün · Gegenprobe `wisch` rot |
| M-7 | Variante B – Auswahl-Kapsel | genau ein Teil gewählt, Inhalt wechselt (z. B. Schnittstelle mit Fabrik) | grün |
| M-8 | Grundregeln nach jedem Schritt | nichts ragt hinaus, die Seite rollt nie (R-2.1) | grün |
| M-9 | Navigation | iPad: panel-left blendet die Seitenleiste aus und ein (R-7.5); iPhone: Zurück → Startliste | grün |

## Für den Bau (Vorschlag, Version AppDesign 4.65.0)

| Nr. | Fall | Erwartet |
|---|---|---|
| Z-1 | Vollständig | jede Bean der Liste der AD-Beans (15) hat `katalog/<kennung>.js` und steht in der Seitenleiste; Kennung, Bereich, Fabrik, Schnittstelle und Regeln wie in der Liste – sonst rot (`checkBeans`, Wortlaut R-1.13 nach 0 Nr. 29) |
| Z-2 | Lädt fehlerfrei | `katalog/index.html` in Chromium und WebKit, alle 4 Lagen, jede Bean geöffnet, ohne Konsolenfehler |
| Z-3 | Grundregeln | nach jedem Schritt die Prüfungen aus `hig.mjs` (wie die Ablauf-Prüfungen) |
| Z-4 | Neueste Fassung | lädt `v4/ui.js` und `v4/design.css`; Versionszeile im Mehr-Menü = `AD_VERSION` |
| Z-5 | Gegenprobe | eine Bean ohne Katalogdatei bzw. mit abweichender Fabrik → Z-1 rot |
| Z-6 | Langes Drücken unter ‚Ausprobieren‘ (seit 4.67.1, P-117/F-2) | jede Schaltfläche und Kachel unter ‚Ausprobieren‘ jeder Bean markiert im Safari-Modell (`safariHalten`) keinen Text und zeigt kein Callout (R-3.6) |

## Testfälle (User), wenn gebaut

Version prüfen (/0) · Katalog am iPad quer öffnen, beide Beans ansehen · Wischaktionen am Gerät wischen (Wischgefühl) · Hinweisfenster mit langem Dateinamen ·
am iPhone Startliste → Bean → Zurückwischen.
