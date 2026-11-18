# RLB-125 – Reiselogbuch für die Erfassung sperren (neues Thema)

**Stand 18.11.2026** · Sitzung 0127 · Wunsch des Nutzers, **Priorität 2 mittel** (Nutzer 18.11.2026)

## Eintrag für das Reiselogbuch-Backlog (2. Weitere Themen)

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| RLB-125 | 2 | **Reiselogbuch für die Erfassung sperren (Nutzer 18.11.2026, Sitzung 0127):** ein Reiselogbuch lässt sich sperren, damit nicht irrtümlich etwas geändert wird; lesen bleibt möglich. Ein gesperrtes Reiselogbuch lässt sich auch nicht löschen. Sperren und Entsperren über langes Drücken auf die Kachel, im Kontextmenü. Auf der Kachel zeigt rechts unten ein Symbol, dass gesperrt ist. Zu klären: welche Handlungen gesperrt sind (Einträge, Einstellungen, Löschen, Abgleich, Backup laden), Symbol (Lucide `lock`), Wischaktionen bei Sperre, Ansicht der Felder (nur lesen), Verbesserungen beim Löschen RLB-125/L-1 bis L-5 (Nutzer 18.11.2026), allgemein oder App (Teile davon als AD-Bean, R-1.13) | offen |
| RLB-126 | 3 | **‚Zuletzt gelöscht‘ (aus RLB-125/L-6, Nutzer 18.11.2026, Sitzung 0127):** ein gelöschtes Reiselogbuch bleibt 30 Tage wiederherstellbar (eigener Bereich in der Seitenleiste); berührt Datenmodell, Abgleich und Speicherplatz; So macht es Apple in der Klärung mit Quelle | offen |

## Löschen heute (Reiselogbuch 3.57.x)

- Kontextmenü (langes Drücken): ‚Reiselogbuch löschen‘ (rot).
- Wischaktionen: Kapsel ‚Löschen‘ (rot, ganz außen); Durchwischen über 60 % fragt.
- Abfrage: Sprechblase ‚‚<Titel>‘ mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher ein Backup erstellen.‘ mit
  ‚Reiselogbuch löschen‘ (rot) und ‚Abbrechen‘.

## Verbesserungsempfehlungen zum Löschen

**Mit Sperre (gehört zu RLB-125):**

| Nr. | Empfehlung | Warum |
|---|---|---|
| RLB-125/L-1 | **Kontextmenü:** bei gesperrtem Reiselogbuch steht ‚Reiselogbuch löschen‘ blass und lässt sich nicht antippen, darunter klein ‚Gesperrt‘; daneben ‚Entsperren‘ | Man sieht, dass es Löschen gibt und warum es gerade nicht geht. Ausblenden würde eher verwirren |
| RLB-125/L-2 | **Wischaktionen:** bei Sperre keine Kapsel ‚Löschen‘ und kein Durchwischen; es bleibt nur ‚Entsperren‘ (Symbol `lock-open`), die Bean bietet dafür schon `durchwischen: false` | Durchwischen würde sonst ins Leere laufen. Eine einzelne harmlose Aktion passt besser |
| RLB-125/L-3 | **Sperre gilt überall:** auch beim Abgleich und beim Laden eines Backups. Der Sperrstatus wird mit abgeglichen, und ein gesperrtes Reiselogbuch wird auf dem anderen Gerät nicht gelöscht | Sonst könnte man über das andere Gerät löschen, was hier gesperrt ist |

**Unabhängig von der Sperre (eigene Themen, falls gewünscht):**

| Nr. | Empfehlung | Warum |
|---|---|---|
| RLB-125/L-4 | **Anzahl in der Abfrage:** ‚‚<Titel>‘ mit allen 42 Einträgen löschen? …‘ | Wer die Zahl liest, merkt eher, dass gerade das falsche Reiselogbuch gelöscht wird |
| RLB-125/L-5 | **Backup aus der Abfrage:** in der Sprechblase zusätzlich ‚Erst Backup erstellen‘, das das Backup startet und danach erneut fragt | Heute steht dort nur ein Tipp. Mit der Schaltfläche ist es ein Griff |
| RLB-125/L-6 | **‚Zuletzt gelöscht‘:** ein gelöschtes Reiselogbuch bleibt 30 Tage wiederherstellbar (eigener Bereich in der Seitenleiste) | Löschen wird damit umkehrbar. Vermutung: so machen es Notizen und Fotos – Quelle in der Klärung. Das ist der größte Schritt, auch beim Abgleich und beim Speicherplatz |

**Entschieden (Nutzer 18.11.2026):** L-1 bis L-5 in RLB-125, L-6 als eigenes Thema RLB-126 mit Priorität 3.

## Ergänzung des Nutzers (18.11.2026): Symbol auf der Kachel und im geöffneten Reiselogbuch

**Wunsch:** auf der Kachel der Seitenleiste rechts unten immer ein Symbol – offen bzw. geschlossen an derselben Stelle. Im geöffneten Reiselogbuch
ein Symbol, wenn es gesperrt ist; bei nicht gesperrtem kein Symbol (Frage: oder was meinst du?).

**Meine Einschätzung:**

| Nr. | Stelle | Empfehlung | Warum |
|---|---|---|---|
| RLB-125/S-1 | Kachel, gesperrt | `lock` rechts unten, in der Farbe der Nebenschrift der Kachel | Wie gewünscht, man sieht den Zustand ohne Öffnen |
| RLB-125/S-2 | Kachel, nicht gesperrt | **Variante a (meine Empfehlung):** kein Symbol. **Variante b:** `lock-open` an derselben Stelle, deutlich blasser als `lock` | a: Der Normalfall braucht kein Zeichen, so fällt ein gesperrtes Reiselogbuch sofort auf und die Liste bleibt ruhig. Vermutung: Apple zeigt in Listen nur den Sonderfall (Schloss in Notizen) – Quelle in der Klärung. b: hat den Vorteil, dass man sieht, dass Sperren möglich ist; die Blässe hält den Normalfall zurück |
| RLB-125/S-3 | Geöffnetes Reiselogbuch, gesperrt | `lock` in der Kopfzeile neben dem Titel; Antippen öffnet die Sprechblase ‚Reiselogbuch entsperren?‘ mit ‚Entsperren‘ und ‚Abbrechen‘. Dazu sind plus und alle Bearbeiten-Schaltflächen ausgeblendet, die Felder nur lesbar | Man sieht es dort, wo man etwas ändern wollte, und kann ohne Umweg über die Seitenleiste entsperren |
| RLB-125/S-4 | Geöffnetes Reiselogbuch, nicht gesperrt | kein Symbol – ich stimme dir zu | Dass man ändern kann, zeigen die Bearbeiten-Schaltflächen selbst; ein offenes Schloss wäre doppelt |

**Entschieden (Nutzer 18.11.2026):** RLB-125/S-2 Variante a – nicht gesperrt zeigt die Kachel kein Symbol; RLB-125/S-1, S-3 und S-4 wie empfohlen (Ausgestaltung von S-3 im Muster).

## So macht es Apple

**Weiß ich nicht – ich prüfe es.** Die Apple-Hilfe und die HIG sind von hier nicht erreichbar, weil das Netz support.apple.com sperrt. Vermutungen,
die ich in der Klärung mit Quelle nachhole (0 Nr. 23, 27): Notizen sperrt über das Menü der Notiz und zeigt in der Liste ein Schloss; Menüpunkte, die
gerade nicht gehen, stehen blass; Notizen und Fotos haben ‚Zuletzt gelöscht‘.

## Wann eintragen

Ich trage es ins Backlog ein, sobald der laufende Bau (Reiselogbuch 3.57.1) veröffentlicht ist.
