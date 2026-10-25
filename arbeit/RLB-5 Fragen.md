# RLB-5 – Alte Reiselogbücher importieren: offene Fragen

Stand 16.10.2026 · Sitzung ‚Reiselogbuch 0007 – RLB-5 Alte Reiselogbücher‘

## Was es schon gibt (gelesen im Code)

- **Backup laden → ‚Abgleichen‘** (R-9.2, `createSync().merge`) fügt Reisen, die es auf dem Gerät noch nicht gibt
  (andere `id`), **hinzu** und lässt alle vorhandenen Reisen stehen. Das Ergebnisfenster nennt sie unter ‚Hinzugefügt‘.
- Damit gibt es einen Weg **ohne neue App-Version**: Claude erstellt aus den alten Unterlagen eine Datei im
  Backup-Format (nur die alten Reisen, neue `id`s), du lädst sie mit ‚Backup laden‘ → ‚Abgleichen‘.
  Nachteil: im Ergebnisfenster stehen auch alle vorhandenen Reisen als ‚nur auf diesem Gerät‘; Name und Abfrage
  sprechen von ‚Backup‘.

## Die Wege

| Weg | Was | App-Version nötig |
|---|---|---|
| **a** | Claude baut ein **komplettes Backup** (deine aktuellen Daten + alte Reisen), du lädst es mit ‚Ersetzen‘ | nein – aber du musst mir dein aktuelles Backup geben; Gefahr, Änderungen seit dem Backup zu überschreiben |
| **a2** (Empfehlung für den Anfang) | Claude baut eine Datei **nur mit den alten Reisen**, du lädst sie mit ‚Backup laden‘ → **‚Abgleichen‘** | nein |
| **b** | neue Funktion **‚Reiselogbuch importieren‘** (Mehr-Menü): Datei wählen, Vorschau, Überschneidungen anzeigen, hinzufügen | ja (Reiselogbuch 3.16.0, evtl. AppDesign) |

Empfehlung: **a2** – sofort nutzbar, kein Risiko für vorhandene Daten. Stört dich das Ergebnisfenster oder willst du
regelmäßig importieren, kommt **b** später als eigene Version.

## Die Fragen im Auswahlfenster

1. **Form der Unterlagen** – Word, PDF, Excel, HTML, Fotos (mehrere möglich)
2. **Anzahl** – wie viele alte Reiselogbücher
3. **Weg** – a2, b oder a
4. **Übergabe der Dateien** – wie du mir die Dateien gibst (Anhang im Chat oder ins Repo hochladen)

## Antworten (16.10.2026)

1. Form: Word/PDF, Excel, Fotos/HTML – alles kommt vor
2. Anzahl: mehr als 10
3. Weg: **a2** – Datei nur mit den alten Reisen, laden über ‚Backup laden‘ → ‚Abgleichen‘ (keine neue Version)
4. Übergabe der Dateien: schreibt der Nutzer im Chat
