# AD-Bean `notice` – Wortlaut und Bau-Frage

**Stand 22.11.2026, Sitzung 0159** · Umgesetzt auf den Vorbereitungs-Zweigen (`vorbereitung-4.70.0` d9b9ec0, `vorbereitung-3.58.3` e0a4d68), **nicht veröffentlicht**.

## Umgesetzt

- **AppDesign `v4/ui.js`:** neue AD-Bean `notice` – `createNotice(element, { message, detail, buttons })`; Eigenschaften `message`, `detail`, `buttons`
  (je `{ id, label, icon, primary }`, setzen baut neu auf), Methode `remove()`, Ereignis `action` (`{ id }`).
- **`v4/design.css`:** CSS nur unter `.ad-notice` und `.ad-notice-buttons` (Text und Schaltflächen mittig); `.ad-buttons` entfällt. `.bhint` (Backup-Kachel)
  mittig – die Kachel ist **nicht** Teil von `notice`, sie kommt mit **APD-148** in die AD-Bean `backup`.
- **Katalog** `katalog/notice.js` (mit ‚Ausprobieren‘), **Schnittstelle** `createNotice`, CHANGELOG 4.70.0, Versionsgeschichte, Fassung 4.70.0 neu.
- **Reiselogbuch `index.html`:** Ergebnis und Backup-Erinnerung über `createNotice` (im Fenster und im Hinweisfenster über der Vorschau);
  `backupReminderHtml`/`bindBackupReminder` ersetzt durch `showBackupReminder`. CHANGELOG 3.58.3.
- **Prüfung:** `ablauf-p120` neuer Teil P-122/F-2 (Testfall-Liste in `arbeit/0159 AD-Bean notice Vorschlag.md`).
- Nebenbei behoben: AD-Bean-Zeile im CHANGELOG im Format des Skripts; Bildnamen von Muster A in `arbeit/0158 P-122 Vorschlag.md` als Text (alte Nummer).

## Prüfungen dieser Sitzung (nur die betroffenen)

| Prüfung | Chromium | WebKit |
|---|---|---|
| `ablauf-p120` (alle Teile) | alles in Ordnung | alles in Ordnung |
| `bean-katalog` | alles in Ordnung | alles in Ordnung |
| `doku-regeln` | alles in Ordnung | – |
| `schnittstelle-regeln` | alles in Ordnung | – |
| Gegenprobe: Teil P-122/F-2 gegen die App aus 0158 (ohne Bean) | rot, 4 Fehler | – |

**Auffällig, nicht geändert:** über der Vorschau öffnet ‚Backup erstellen‘ in der Erinnerung ein eigenes Hinweisfenster ‚Backup‘ mit dem Ergebnis (so schon in
3.58.2 – `saveBackup` sucht die Erinnerung nur im Fenster); im Fenster ersetzt das Ergebnis die Erinnerung an Ort und Stelle. Gehört zu APD-148.

## Wortlaut zur Freigabe (0 Nr. 29)

**1. Designrichtlinie 4, R-3.10 ‚Technisch‘**

- Alt: „Technisch: Hinweis-Kasten `.ad-notice` und Schaltflächenzeile `.ad-buttons` (design.css) – keine eigene Ausrichtung in der App.“
- Neu: „Technisch: Hinweis-Kasten über die AD-Bean `notice` (Ergebnis und Erinnerung, im Fenster und im Hinweisfenster; Liste in 15) – keine eigene
  Ausrichtung in der App.“

**2. Designrichtlinie 15, Liste der AD-Beans – neue Zeile**

| Kennung | Bereich | Anlegen | Eigenschaften (Standard) | Nur lesen | Methoden | Ereignisse | Regeln | Abschnitt |
|---|---|---|---|---|---|---|---|---|
| `notice` | Fenster und Meldungen | `createNotice(element, …)` | `message` (`''`, HTML) · `detail` (`''`, grau darunter) · `buttons` (`[]`, je `{ id, label, icon, primary }`) | – | `remove()` | `action` | R-3.10, R-1.13 | 4, 7 |

## Bau

AppDesign **4.70.0** / Reiselogbuch **3.58.3** mit P-122/F-1, P-122/F-2 (R-3.10) und der AD-Bean `notice`, Prüflauf **Stufe voll** (AppDesign geändert).
Danach Usertest **P-123** (Testfälle unverändert: Aussehen wie Variante B).
