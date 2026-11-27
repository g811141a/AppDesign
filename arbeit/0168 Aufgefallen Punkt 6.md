# Aufgefallen, Punkt 6 – Kleinere Punkte

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

APD-156 (Priorität 3) steht im Backlog (`0003e09`).

## 6a – Hinweis zu `keptDeleted` ist veraltet (belegt)

- **Hinweis im Abgleichbericht** (`v4/ui.js:1852`), wenn hier gelöscht und im Backup noch vorhanden: „… – bleibt gelöscht. Zurückholen nur mit ‚Backup laden‘ → ‚Ersetzen‘ (ersetzt alle Daten auf diesem iPad).“
  - Seit ‚Zuletzt gelöscht‘ stimmt das nicht mehr: Bis zum Ende der Frist geht es mit ‚Wiederherstellen‘.
- **Vorschlag:** Das kommt zu APD-152, denn es geht um denselben Abgleich mit ‚Zuletzt gelöscht‘ und braucht kein eigenes Thema. Liegt der Eintrag noch in ‚Zuletzt gelöscht‘, lautet der Hinweis anders, sonst bleibt er.

**Wortlaut (0 Nr. 29):**
- **Hinweis neu** (nur mit `recentlyDeleted`, solange der Eintrag dort liegt): „… – bleibt gelöscht. Zurückholen in ‚Zuletzt gelöscht‘ → ‚Wiederherstellen‘ (noch N Tage).“
- **15.18 Fall 2**, rechte Spalte:
  - alt: „bleibt gelöscht – Hinweis ‚Auf diesem iPad gelöscht, im Backup vom iPhone noch vorhanden: … (gelöscht am …) – bleibt gelöscht. Zurückholen nur mit Ersetzen‘“
  - neu: „bleibt gelöscht – Hinweis ‚Auf diesem iPad gelöscht, im Backup vom iPhone noch vorhanden: … (gelöscht am …) – bleibt gelöscht. Zurückholen in ‚Zuletzt gelöscht‘ (noch N Tage)‘ bzw. ohne ‚Zuletzt gelöscht‘ oder nach der Frist ‚… Zurückholen nur mit Ersetzen‘“
- **Testfall-Liste:**
  - **APD-152/T-10:** Fall 2 mit ‚Zuletzt gelöscht‘ zeigt den neuen Hinweis mit ‚noch N Tage‘, wörtlich geprüft in `abgleich.mjs`.
  - **APD-152/T-11:** ohne `recentlyDeleted` bzw. nach der Frist der alte Hinweis.

## 6b – Kopf der README von ReiseLogBuch-Import zeigt 1.3.0 (belegt)

- In Zeile 5 steht „**Version 1.3.0** · Stand 25.10.2026“. Die Versionsgeschichte hat als neueste Zeile 1.4.0 (18.11.2026), der letzte Commit ist `2ec7d03` „1.4.0: …“.
- **Vorschlag:** Version **1.4.1** nach I-1, nur der Kopf wird berichtigt, dazu eine Zeile in der Versionsgeschichte.
  - Das Repo ist privat, ohne Pages und ohne Prüflauf der Apps. Die Konvertierung ändert sich nicht, `pruefen.mjs` bleibt unverändert.

## 6c – Überschrift ‚Tag‘ bricht senkrecht um (nicht nachgestellt)

- Ich habe in allen vier Ansichten (iPad quer und hoch, iPhone hoch und quer) bei Schrift 17 und 53 px gesucht, normal und in ‚Zuletzt gelöscht‘ (Chromium).
  - Jede Überschrift ‚Tag‘ ist 91 bis 147 px breit, nichts bricht senkrecht um.
- Wo es in 0167 auftrat, steht im Bericht nicht.
- **Vorschlag:** fallen lassen. Kommt es im nächsten vollen Lauf oder am Gerät wieder, wird es ein eigener Punkt.
