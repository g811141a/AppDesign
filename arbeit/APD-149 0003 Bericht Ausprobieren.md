# APD-149 – Muster am Gerät ausprobieren (Sitzung AppDesign 0003)

**27.11.2026, 12:43 Uhr** · Kein Bau, keine AppDesign-Version (0 Nr. 21). Das Muster ist auf `main` (Commit 49ddb88), Pages ‚success‘.

## Bericht

Das Muster mit den Beans `commands` und `presentation` ist nach AppDesign 4.71.0 auf `main` gekommen, wie du es gewählt hast.
Vorher habe ich den Zweig `apd-149-muster` auf die neue `main` gesetzt. Einziger Konflikt war `katalog/index.html`, wo beide Stände eine Zeile ergänzen: `recentlydeleted.js` (4.71.0) und die Entwurfsdatei – beide bleiben, der Entwurf danach.
Alle Prüfungen auf dem neuen Stand sind in Chromium und WebKit wie in 0002: 0 Fehler, die Gegenprobe S-15 rot wie verlangt, `bean-katalog` und `doku-regeln` grün.
Die bekannte Abweichung R-1.4 (Durchlass, Fund 1 im Bericht 0002) besteht weiter.

## Alle Änderungen auf `main`

| Datei | Was |
|---|---|
| `katalog/entwurf/presentation-commands.js` (neu) | Beans `commands` und `presentation`, Vorführung ‚Ausprobieren‘, beide mit `draft: true` |
| `katalog/index.html` | lädt die Entwurfsdatei nach `recentlydeleted.js`; Gruppe ‚Entwurf‘ in der Seitenleiste; Kopf mit ‚· 2 im Entwurf‘ |
| `arbeit/APD-149/muster-pruefen.mjs` (neu) | APD-149/S-1 bis S-15 und APD-149/L-1 bis L-4 |
| `arbeit/APD-149/entwurf-regeln.mjs` (neu) | die 7 Prüfungen aus Wortlaut Abschnitt 4 |
| `arbeit/APD-149 0003 Lagebild.md`, diese Datei (neu) | Lagebild und Bericht dieser Sitzung |

- Keine Änderung an `v4/`, `tests/`, den Richtlinien oder einer Fassung.

## Prüfungen auf dem Stand nach 4.71.0 (diese Sitzung)

| Prüfung | Chromium | WebKit |
|---|---|---|
| `muster-pruefen.mjs` S-1 bis S-14, L-1 bis L-4 | 0 Fehler, 1 Abweichung R-1.4 | 0 Fehler, 1 Abweichung R-1.4 |
| Gegenprobe S-15 | ohne Ableitung S-1, S-3 rot · ohne Freigabe S-2, S-3 rot | ebenso |
| `entwurf-regeln.mjs` | alles in Ordnung, Gegenprobe `beans:entwurf` rot | – (ohne Browser) |
| `bean-katalog` (Reiselogbuch 3.59.0) | alles in Ordnung | alles in Ordnung |
| `doku-regeln` | alles in Ordnung (auch nach dem Bericht von 0167) | – |

- Pages: Lauf für 49ddb88 ‚success‘ (GitHub-API). Die Seite selbst kann ich hier nicht abrufen, `github.io` sperrt die Umgebung (403).

## Ausprobieren am iPad und iPhone

Link: https://g811141a.github.io/AppDesign/katalog/index.html#presentation

Vorher in Safari die Seite neu laden (oder einen neuen Tab öffnen), damit der neue Stand kommt.

0. Version prüfen: In der Seitenleiste oben auf ‚…‘ (Mehr) tippen. Erwartet: unten grau ‚Bean-Katalog · AppDesign 4.71.0 (v4, neueste Fassung)‘; in der Seitenleiste die Gruppe ‚Entwurf‘ mit zwei Beans.

1. iPad quer, hell: Link öffnen, in der Seitenleiste unter ‚Entwurf‘ ‚Stapel (Steuer-Bean)‘ antippen. Erwartet: Unter ‚Ausprobieren‘ rechts drei runde Schaltflächen: plus, share (‚Ausgabe‘), ellipsis (‚Mehr‘).
2. ‚Mehr‘ antippen, dann sofort ‚Ausgabe‘. Erwartet: Ein Tipp genügt. ‚Mehr‘ ist zu und nicht mehr blau, ‚Ausgabe‘ ist offen und blau.
3. ‚Ausgabe‘ noch einmal antippen. Erwartet: Das Menü geht zu, nichts ist blau.
4. ‚Mehr‘ antippen, dann plus. Erwartet: Ein Tipp öffnet das Fenster ‚Neuer Eintrag‘. Plus ist blau, bis das Fenster zu ist.
5. ‚Mehr‘ antippen, dann neben das Menü auf die Kachel ‚Rom 2025‘. Erwartet: Nur das Menü geht zu. Im Protokoll steht kein ‚Kachel angetippt‘.
6. ‚Mehr › Ansicht › Groß‘. Erwartet: Untermenü neben dem Menü; danach ist alles zu, ‚Mehr‘ nicht mehr blau.
7. ‚Mehr › Bearbeiten‘, dann ‚Hinweisfenster über dem Fenster‘, x. Erwartet: Das Hinweisfenster liegt über dem Fenster. Nach x ist das Fenster wieder oben. ‚Mehr‘ bleibt blau.
8. Im Fenster ‚Zwei Hinweisfenster nacheinander‘. Erwartet: Erst ‚Erster Hinweis‘, nach x ‚Zweiter Hinweis‘.
9. Im Fenster ‚Anderes Fenster öffnen‘. Erwartet: Nur ein Fenster ‚Anderes Fenster‘.
10. ‚Mehr › Bearbeiten‘, den Titel ändern, neben das Fenster tippen. Erwartet: Die Sprechblase ‚Die Änderungen in diesem Fenster gehen verloren.‘ mit ‚Änderungen verwerfen‘ und ‚Weiter bearbeiten‘.
11. ‚Ausgabe › Teilen‘. Erwartet: Das Teilen-Menü von iPadOS. Danach das Hinweisfenster ‚Teilen‘. ‚Ausgabe‘ bleibt blau, bis es zu ist.
12. Kachel ‚Rom 2025‘ lange drücken, ‚Endgültig löschen‘. Erwartet: Kontextmenü mit ‚Wiederherstellen‘ und rot ‚Endgültig löschen‘. Danach die Sprechblase an der Kachel. ‚Abbrechen‘ ändert nichts.
13. Kachel ‚Wien 2024 (gesperrt)‘ nach links wischen. Erwartet: nur die Kapsel ‚Zurück‘, kein ‚Löschen‘.
14. Schalter ‚Eintrag ausgewählt‘ aus, dann ‚Mehr‘. Erwartet: ‚Eintrag löschen‘ gedimmt. Bei ‚Rom 2025‘ fehlt ‚Endgültig löschen‘ im Kontextmenü und beim Wischen.
15. Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein, ‚Mehr‘ öffnen und 5 s warten. Erwartet: ‚Mehr‘ bleibt blau, das Menü bleibt an der Schaltfläche.
16. Bei offenem Menü drehen (quer → hoch → quer). Erwartet: Das Menü steht an der Schaltfläche, ‚Mehr‘ bleibt blau.

Am iPhone hoch gelten dieselben Schritte; bewusste Abweichung (Grobentwurf): Am iPhone bleibt eine Abfrage eine Sprechblase. Schritt 16 am iPhone: quer → hoch.

## Alle offenen Usertests

### P-126 – Reiselogbuch 3.59.0 / AppDesign 4.71.0 (aus Sitzung 0167, weiter in Reiselogbuch 0168)

Testfälle P-126 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Vor P-126/1 auf beiden Geräten ein **Backup erstellen** (Sicherheit). Zum Probieren ein
Reiselogbuch ‚Test‘ mit mindestens einem erfassten Tag anlegen; deine echten Reiselogbücher nicht löschen.

**P-126/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.59.0 · erstellt am … · AppDesign 4.71.0‘. Automatisch geprüft in `version-regeln`.

**P-126/1 – Löschen ohne Abfrage (iPad)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Mehr (ellipsis) → ‚Reiselogbuch löschen‘.
2. Erwartet: keine Sprechblase; ‚Test‘ ist aus der Liste verschwunden, die Startreise ist offen; unten in der Liste die Kachel ‚Zuletzt gelöscht‘ mit Papierkorb und ‚1‘.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-1, T-2).

**P-126/2 – Liste und Vorschau (iPad)**
1. iPad quer, hell; die Kachel ‚Zuletzt gelöscht‘ antippen.
2. Erwartet: Kopf ‹ ‚Zuletzt gelöscht‘ · ‚1 Reiselogbuch‘; darunter ‚Gelöschte Reiselogbücher bleiben hier 30 Tage. Danach werden sie endgültig gelöscht.‘; ‚Test‘ blau
   mit ‚Gelöscht am <heute> · noch 30 Tage‘. Rechts die Vorschau mit ‚Dieses Reiselogbuch ist gelöscht. Gelöscht am <heute> – wird in 30 Tagen endgültig gelöscht.‘
   und ‚Wiederherstellen‘; keine Felder, kein Mehr. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-3, T-4).

**P-126/3 – Wischgefühl in ‚Zuletzt gelöscht‘ (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ langsam nach links wischen und loslassen.
2. Erwartet: die Kachel folgt dem Finger, daneben die Kapseln ‚Wiederherstellen‘ und ‚Löschen‘ (rot, ganz außen); das Wort ‚Wiederherstellen‘ ist ganz lesbar; die
   Kachel bleibt offen bzw. federt zurück wie bei ‚Reiselogbücher‘.
3. Neben die Kachel in die Liste tippen. Erwartet: die Kachel schließt, nichts wird ausgelöst.

**P-126/4 – Endgültig löschen fragt (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ lange drücken.
2. Erwartet: Menü ‚Wiederherstellen‘ · Strich · ‚Endgültig löschen‘ (rot).
3. ‚Endgültig löschen‘ antippen. Erwartet: Sprechblase ‚‚Test‘ mit 1 Eintrag endgültig löschen? Das kann nicht rückgängig gemacht werden.‘ (bzw. ‚mit allen N
   Einträgen‘) mit ‚Endgültig löschen‘ (rot) und ‚Abbrechen‘ – kein ‚Erst Backup erstellen‘.
4. ‚Abbrechen‘ antippen. Erwartet: ‚Test‘ bleibt in ‚Zuletzt gelöscht‘. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-7).

**P-126/5 – Wiederherstellen (iPhone)**
1. iPhone hoch, hell; in der Startliste unten ‚Zuletzt gelöscht‘ antippen, dann ‚Test‘.
2. Erwartet: eigene Seite ‚Test‘ mit ‹, darunter der Hinweis ‚Dieses Reiselogbuch ist gelöscht. …‘ mit ‚Wiederherstellen‘ und die Vorschau.
3. ‚Wiederherstellen‘ antippen. Erwartet: ‚Test‘ öffnet mit seinen Tagen; zurück in der Startliste steht ‚Test‘ wieder unter seinem Jahr, ‚Zuletzt gelöscht‘ ist weg.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-4, T-5).

**P-126/6 – Abgleich zweier Geräte über ‚Backup laden‘**
1. iPad: ‚Test‘ löschen (Mehr → ‚Reiselogbuch löschen‘), dann Mehr der Seitenleiste → ‚Backup erstellen‘ und in Dateien (iCloud Drive) sichern.
2. iPhone: Mehr der Startliste → ‚Backup laden‘, das Backup vom iPad wählen, ‚Abgleichen‘.
3. Erwartet auf dem iPhone: ‚Test‘ ist aus ‚Reiselogbücher‘ verschwunden und steht unter ‚Zuletzt gelöscht‘ mit ‚Gelöscht am <Tag auf dem iPad> · noch N Tage‘.
4. iPhone: ‚Test‘ in ‚Zuletzt gelöscht‘ lange drücken → ‚Wiederherstellen‘; Backup erstellen und sichern. iPad: dieses Backup laden, ‚Abgleichen‘.
5. Erwartet auf dem iPad: ‚Test‘ steht wieder in ‚Reiselogbücher‘, ‚Zuletzt gelöscht‘ ist leer bzw. weg. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-9).

**P-126/7 – Backup in Dateien sichern und laden**
1. iPad: ‚Test‘ löschen, Backup erstellen und in Dateien sichern.
2. iPad: ‚Test‘ in ‚Zuletzt gelöscht‘ wiederherstellen; dann ‚Backup laden‘ mit dem Backup aus Schritt 1, ‚Ersetzen‘.
3. Erwartet: ‚Test‘ steht wieder unter ‚Zuletzt gelöscht‘ mit dem Löschdatum aus Schritt 1. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-10).

**P-126/8 – VoiceOver**
1. iPad, VoiceOver ein (Einstellungen → Bedienungshilfen); ein Reiselogbuch ‚Test‘ über Mehr → ‚Reiselogbuch löschen‘ löschen.
2. Erwartet: VoiceOver sagt ‚‚Test‘ nach ‚Zuletzt gelöscht‘ verschoben‘.
3. Zur Kachel ‚Zuletzt gelöscht‘ streichen. Erwartet: ‚Zuletzt gelöscht, 1, Taste‘; doppelt tippen öffnet die Liste, ‹ heißt ‚Reiselogbücher‘.
4. In der Vorschau ‚Wiederherstellen‘ doppelt tippen. Erwartet: ‚‚Test‘ wiederhergestellt‘.


## Danach

Funde aus dem Bericht 0002 mit dir klären: R-1.4 und der Durchlass, Escape am Fenster in v4, Listen-Ebene.

Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1). Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
