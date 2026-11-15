# APD-30 Rest – Kurzmeldung und Wischaktionen: Klärung vor dem Muster

**Stand 15.11.2026** · Sitzung Reiselogbuch 0116 · geplant mit APD-85 Teil 6 in einer Version (Nutzer 15.11.2026)

## Stand heute (gelesen in dieser Sitzung)

- **Löschen eines Reiselogbuchs:** langes Drücken auf die Kachel → Kontextmenü ‚Reiselogbuch einstellen‘ · ‚Reiselogbuch löschen‘ (rot) → Sprechblase ‚… mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher ein Backup erstellen.‘ (ReiseLogBuch `index.html`, `tripContextMenu`, `deleteTrip`). Ebenso im Mehr-Menü des Inhalts.
- **Regeln:** R-4.12 ‚Erst fragen, dann zerstören‘ (jede Lösch-Aktion zeigt zuerst die Sprechblase); Designrichtlinie 15.4 Kontextmenü: ‚Kein Wischen‘.
- **Kurzmeldung:** nur die Offline-Meldung (`.nettoast`, 15.20): weiße Karte unten, 4 s, Antippen schließt, sperrt nichts, liegt über Fenstern, wird angesagt. Lage neben Seitenleiste, über Tastatur und Backup-Kachel ist gelöst. Kein Knopf, kein allgemeiner Baustein.
- **Kollision mit dem Wegwischen der Seitenleiste (APD-68): schon gelöst.** 15.4 ‚Gesten‘: Ausblenden nur mit panel-left – ‚nach links wischen ändert nichts, damit die Kacheln für Wischaktionen frei bleiben‘. Im iPhone-Aufbau gibt es in der Startliste kein Zurückwischen. Wischen nach links auf einer Kachel ist also frei.
- **Entschieden am 02.11.2026 (Sitzung 0075):** ‚Rückgängig statt Abfrage‘ – die Abfrage bleibt; Rückgängig erst zusammen mit Wischaktionen und Kurzmeldung neu bewerten. Das ist jetzt.

## So macht es Apple (Quelle: `arbeit/APD-38 Framework-Vergleich.html`, Zeilen APD-38/T-10, T-20, T-21)

- **Wischaktionen:** Mail und Notizen – nach links wischen zeigt rotes ‚Löschen‘, ganz durchwischen löscht; alles geht auch über das Kontextmenü.
- **Kurzmeldung:** kurze Einblendungen wie ‚Kopiert‘ oder ‚Rückgängig‘ in Mail; Abfragen nicht nur zum Informieren verwenden.
- **Rückgängig:** Mail und Notizen löschen ohne Rückfrage und bieten Rückgängig; die HIG rät, häufige, umkehrbare Aktionen nicht abzufragen. Nicht umkehrbare Aktionen behalten die Abfrage.
- Nicht belegt in dieser Sitzung: genaue Maße, Dauer und deutsche Wörter des Systems – vor dem Muster recherchiere ich das nach.

## Entscheidung 1 – Was passiert beim Löschen über das Wischen?

| | Variante | Folge |
|---|---|---|
| **a** | **Wischen zeigt die Aktionen, ‚Löschen‘ fragt wie heute mit der Sprechblase.** Durchwischen öffnet ebenfalls die Sprechblase. Kein ‚Widerrufen‘. | R-4.12 bleibt unverändert; überall gilt dasselbe (Kontextmenü, Mehr-Menü, Wischen). Abweichung von Apple: dort löscht Durchwischen sofort. Die Kurzmeldung dient dann nur für Bestätigungen. |
| **b** | **Wie Apple: Löschen ohne Rückfrage, danach Kurzmeldung ‚Gelöscht · Widerrufen‘** – überall (Wischen, Kontextmenü, Mehr-Menü). | R-4.12 und 15.4 brauchen neuen Wortlaut (0 Nr. 29). Risiko: Ein ganzes Reiselogbuch ist nach Ablauf der Meldung endgültig weg – Apple hat dafür ‚Zuletzt gelöscht‘ (30 Tage), wir nicht. |
| **c** | **Wie b, aber die Meldung bleibt länger** (z. B. 8 s statt 4 s) und ‚Widerrufen‘ gilt bis zur nächsten Aktion. | Wie b, etwas sicherer; weiter kein Papierkorb. |

**Empfehlung: a.** Ein Reiselogbuch zu löschen ist selten und betrifft viele Einträge; laut HIG ist die Abfrage genau dafür richtig, und du hast am 02.11. so entschieden. Die Wischaktion bringt trotzdem den schnellen Apple-Weg zu ‚Löschen‘ und ‚Einstellen‘.

## Entscheidung 2 – Welche Aktionen erscheinen beim Wischen nach links?

| | Variante |
|---|---|
| **a** | **‚Einstellen‘ (grau, settings) und ‚Löschen‘ (rot, trash)** – dieselben zwei wie im Kontextmenü; Durchwischen löst ‚Löschen‘ aus. |
| **b** | Nur ‚Löschen‘ (rot, trash). |

**Empfehlung: a** – Wischen und Kontextmenü bieten dasselbe (wie Mail und Notizen), niemand muss sich zwei Sätze von Aktionen merken.

## Entschieden (Nutzer 15.11.2026, Sitzung 0116)

- **Entscheidung 1: a** – ‚Löschen‘ fragt wie heute mit der Sprechblase, auch beim Durchwischen; kein ‚Widerrufen‘; R-4.12 bleibt.
- **Entscheidung 2: a** – Wischen nach links zeigt ‚Einstellen‘ (grau, settings) und ‚Löschen‘ (rot, trash), dieselben wie im Kontextmenü.

## Entscheidung 3 – Wofür die Kurzmeldung?

Mit Entscheidung 1 a entfällt ‚Gelöscht · Widerrufen‘ – der Hauptgrund für die Kurzmeldung mit Knopf. Übrig bleiben reine Bestätigungen. Heute zeigt das Reiselogbuch dafür kleine Fenster (`inform`):

| Stelle | Text heute | Als Kurzmeldung geeignet? |
|---|---|---|
| Backup erstellen, Ausgabe HTML/PDF, Abgleichbericht teilen | ‚✅ Teilen-Menü geöffnet für‘ + Dateiname in eigener Zeile (R-10.8) + Hinweis, bzw. ‚⚠️ … abgebrochen‘ | bedingt – Dateiname und Hinweis sind für 4 s viel Text; Abbruch und Fehler müssten Fenster bleiben |
| Abgleichen (Ergebnis, ‚Abgleichbericht anzeigen‘) | Zahlen und Knopf zu den Einzelheiten | nein – R-4.3 ‚Meldung mit Weiterweg‘ |
| Speichern fehlgeschlagen, Backup nicht lesbar, neue Version wird geladen | Fehler bzw. wichtiger Hinweis | nein – muss stehen bleiben |

| | Variante | Folge |
|---|---|---|
| **a** | **Kurzmeldung zurückstellen** (Status ‚später‘, bis eine Stelle sie braucht); die Version enthält APD-85 Teil 6 und die Wischaktionen. | Kleine, klare Version; keine Regel zu Meldungen ändert sich. |
| **b** | Baustein jetzt bauen und die Erfolgsmeldung nach Backup und Ausgabe als Kurzmeldung zeigen (Abbruch und Fehler bleiben Fenster). | Abschnitt 10 und R-10.8 brauchen neuen Wortlaut; Muster für den langen Dateinamen nötig; größere Version. |
| **c** | Nur den allgemeinen Baustein bauen (die Offline-Meldung nutzt ihn), im Reiselogbuch keine neue Stelle. | Umbau ohne sichtbaren Nutzen. |

**Empfehlung: a** – ohne ‚Widerrufen‘ gibt es im Reiselogbuch keine Stelle, an der die Kurzmeldung klar besser ist als das Fenster; ein Baustein ohne Verwendung widerspricht ‚nur bauen, was gebraucht wird‘.

**Entschieden: a** – Kurzmeldung zurückgestellt, bis eine Stelle sie braucht (Nutzer 15.11.2026, Sitzung 0116). Die Version enthält APD-85 Teil 6 und die Wischaktionen.

## Danach

- Recherche Apple (Maße, Verhalten der Wischaktionen), Muster nur hell: Kachel mit Wischaktionen am iPad und iPhone.
- Testfall-Liste, ‚allgemeine Regel?‘, Wortlaut für 15.4 (‚Kein Wischen‘ entfällt) und eine neue Regel zu Wischaktionen.
