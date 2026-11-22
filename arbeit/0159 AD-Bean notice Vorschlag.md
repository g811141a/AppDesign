# AD-Bean für Hinweise und Ergebnisse – Vorschlag zur Klärung

**Stand 22.11.2026, Sitzung 0159** · Auslöser: Bau 4.70.0 / 3.58.3 im Vorlauf `doku-regeln` rot – `.ad-notice` und `.ad-buttons` tragen das Präfix der
AD-Beans, sind aber keine (R-1.13 W-72). Deine Antwort: **eigene AD-Bean für die Generierung der Hinweis- und Ergebnisfenster** (statt Umbenennen).

## Heute (Reiselogbuch 3.58.3, vorbereitet)

Die App baut die Kästen selbst als HTML-Text (`index.html`):

| Stelle | Funktion in der App | Inhalt |
|---|---|---|
| Ergebnis ‚Ausgabe V…‘ im Fenster | `showOutputResult` → `openDialog` | Kasten mit ‚✅ Teilen-Menü abgeschlossen für …‘ |
| Ergebnis über der Vorschau | `showOutputResult(…, { over })` → `inform` (AD-Bean `alert`) | derselbe Kasten im Hinweisfenster |
| Backup-Erinnerung (beides) | `backupReminderHtml` + `bindBackupReminder` | ‚💾 Denk daran …‘, ‚Letztes Backup …‘, Schaltfläche ‚Backup erstellen‘ |
| Backup-Kachel der Seitenleiste | `.bhint` (eigenes HTML) | ‚Letztes Backup …‘, ‚Backup erstellen‘ |

## So macht es Apple

- HIG, Komponenten ‚Presentation‘, ‚Status‘, ‚Content‘ (abgerufen 22.11.2026 als JSON): Action sheets, Alerts, Page controls, Panels, Popovers, Scroll views,
  Sheets, Windows · Activity rings, Gauges, Progress indicators, Rating indicators · Charts, Image views, Text views, Web views – **kein eigener Baustein für einen
  Hinweis-Kasten im Inhalt**. Das Hinweisfenster selbst ist *Alert* (bei uns schon die AD-Bean `alert`).
- Daher **Kennung ohne Vorbild, nach der Aufgabe** (R-1.13): **`notice`** – derselbe Name, der 0145 für den Hinweis-Kasten festgelegt wurde
  (`arbeit/0145 Namen nach Vorbild.md`).

## Vorschlag

- **AD-Bean `notice`**, Bereich ‚Fenster und Meldungen‘, Anlegen **`createNotice(container, { text, detail, buttons })`** – erzeugt einen Hinweis-Kasten:
  Text (Pflicht), darunter optional `detail` (grau), darunter die Schaltflächenzeile, **alles mittig** (R-3.10); CSS nur unter `.ad-notice…`
  (`.ad-notice`, `.ad-notice-detail`, `.ad-notice-buttons`).
- Eigenschaften: `text` (Pflicht) · `detail` (`''`) · `buttons` (`[]`, je `{ id, title, icon, primary }`). Methoden: `update({ text, detail, buttons })` ·
  `remove()`. Ereignis: `action` (mit `id` der Schaltfläche).
- Die App ruft nur noch `createNotice(…)` (W-73: kein `ad-notice` im Code der App); im Hinweisfenster über `alert` und im Fenster gleich.
- `.ad-buttons` entfällt (wird `.ad-notice-buttons`).
- **Aussehen unverändert** gegenüber Variante B (Muster aus 0158, bestätigt) – deshalb kein neues Muster.
- Dazu: Zeile in der Liste der AD-Beans (Designrichtlinie 15), Katalogdatei `katalog/notice.js`, Bean-Katalog `bausteine`/Prüfseite, Testfall-Liste mit
  festen Prüfungen, R-3.10 ‚Technisch‘ auf `createNotice` umgestellt (Wortlaut folgt zur Freigabe).

## Zu klären

1. **Umfang:** a) Ergebnis-Kasten und Backup-Erinnerung – genau die Stellen mit `.ad-notice` heute (Empfohlen; die Backup-Kachel kommt mit **APD-148** in die
   AD-Bean `backup`) · b) zusätzlich die Backup-Kachel · c) zusätzlich der leere Zustand (15.23).
2. **Version:** a) in **4.70.0 / 3.58.3** einbauen – noch nicht veröffentlicht, kein doppelter Umbau; P-123 kommt dadurch später (Empfohlen) · b) 4.70.0 jetzt
   mit Zwischen-Namen `.notice`/`.buttons` veröffentlichen (Korrektur P-122 sofort, 0 Nr. 8), AD-Bean als eigene nächste Version.
3. **Kennung `notice`:** ja (Empfohlen) · anderer Name.

Danach: Testfall-Liste, Wortlaut (R-3.10, Liste der AD-Beans) zur Freigabe, dann Umsetzung und die Bau-Frage.

## Entscheidung (Nutzer 22.11.2026, Sitzung 0159, im Fenster)

1. Umfang **a)** Ergebnis-Kasten und Backup-Erinnerung (Backup-Kachel mit APD-148). 2. **In 4.70.0 / 3.58.3.** 3. Kennung **`notice`**.
Umgesetzt mit `message` statt `text` und `label` statt `title` (wie die AD-Bean `alert`); Eigenschaften setzen baut neu auf, daher kein `update(…)`.

## Testfall-Liste (Testfall (automatisch), Zusammenarbeit 0 Nr. 1)

| Nr. | Gerät × Lage | Handlung | Daten | Feste Prüfung |
|---|---|---|---|---|
| H-1 | iPad quer, iPhone hoch | Vorschau → Teilen gesichert → Hinweisfenster: zwei Kästen `#result`, `#reminder` mit `data-ad-bean="notice"`, Texte | ohne Backup heute | `ablauf-p120` Teil P-122/F-2 |
| H-2 | iPad quer, iPhone hoch | ‚Backup erstellen‘ in der Erinnerung über der Vorschau → Hinweisfenster ‚Backup‘ mit dem Ergebnis (Verhalten wie 3.58.2) | ohne Backup heute | `ablauf-p120` Teil P-122/F-2 |
| H-3 | iPad quer, iPhone hoch | Teilen → ‚HTML‘ gesichert → Fenster ‚Ausgabe V…‘ mit denselben Kästen; ‚Backup erstellen‘ → Erinnerung zeigt das Ergebnis, keine Schaltfläche | ohne Backup heute | `ablauf-p120` Teil P-122/F-2 |
| H-4 | alle Ansichten | Text und Schaltflächen mittig nach jedem Schritt aller Prüfungen | alle | `hig.mjs` `masseStile` (R-3.10) |
| H-5 | – | Liste der AD-Beans ↔ `ui.js`, `design.css` (CSS nur unter `.ad-notice…`), App nennt keine Klasse der Bean, Katalog gleich | – | `doku-regeln` `checkBeans` (R-1.13) |
| H-6 | alle 4 Ansichten, Chromium und WebKit | Bean-Katalog: `notice` öffnen, ‚Ausprobieren‘ ohne Fehler | – | `bean-katalog` (APD-140/Z-2) |
| H-7 | – | `createNotice` steht in der Schnittstelle | – | `schnittstelle-regeln` (R-1.14) |

Gegenprobe: gegen die Vorbereitung aus 0158 (Kästen ohne Bean) ist H-1 rot (kein `data-ad-bean="notice"`).
