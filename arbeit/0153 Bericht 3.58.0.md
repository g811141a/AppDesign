# Bericht – Reiselogbuch 3.58.0 · AppDesign 4.68.0 (Sitzung 0153)

**Veröffentlicht 22.11.2026.** Voller Prüflauf: **alle 178 Läufe grün in 81:24** (Chromium und WebKit, alle Ansichten, HIG- und Regel-Prüfskript);
AppDesign 4.68.0 auf `main` (bc4ac5e), Pages ‚success‘ nach 63 s; Reiselogbuch 3.58.0 auf `main` (ea502c7), Pages ‚success‘ nach 47 s;
`APP_VERSION` 3.58.0, `AD_NEEDED` 4.68.0, `AD_VERSION` 4.68.0.

## Kurz

Mit RLB-125 lässt sich ein Reiselogbuch sperren: lesen und ausgeben geht, ändern und löschen nicht. Am iPhone quer passte das Kontextmenü mit
drei Punkten nicht mehr unter oder über die Kachel – es steht dort jetzt rechtsbündig auf der Kachel (R-4.2, Wortlaut von dir freigegeben).
Der erste volle Lauf fand einen weiteren Fehler aus dem dritten Menüpunkt: bei der größten Schrift (Text 53) stand das Menü über dem oberen Rand –
behoben, jetzt rollt sein Inhalt. Bitte die App vom Home-Bildschirm ganz schließen und neu öffnen.

## Alle Änderungen

**AppDesign 4.68.0**
- `createSync` mit `protect`: ein gesperrter Eintrag wird beim Abgleich nie gelöscht (15.18 Fälle 21–23, R-9.3).
- ‚Ersetzen‘ nennt die gesperrten Einträge (‚Darunter 2 gesperrte Reiselogbücher.‘).
- Icons `lock` und `lock-open`; `choosePop` in der Schnittstelle.
- Neue Regel R-4.14 ‚Nicht verfügbare Menüpunkte‘ (Menüs blass mit Grund, Kontextmenüs blenden aus).
- **Neu in 0153:** Kontextmenü am iPhone quer rechtsbündig auf der Kachel, wenn es weder darunter noch darüber passt (R-4.2, 15.4).
- **Neu in 0153 (Fehler behoben):** Kontextmenü bei großer Schrift nie über dem oberen Rand und nie über der Backup-Kachel – ist es zu hoch, rollt
  sein Inhalt (R-4.5, Regeln unverändert).
- Prüfungen: `abgleich.mjs` Fälle 21–23, Prüfseite Teil `menue` (R-4.14), `hig.mjs` Ausgabe-Tabellen, `checkWischen` je Zahl der Kapseln,
  `checkContextMenus` mit der neuen Lage (Gegenprobe ohne die neue Lage: 40 Fehler).

**Reiselogbuch 3.58.0**
- Sperren und Entsperren über Kontextmenü, Wischen und Mehr; Schloss vor dem Titel der Kachel.
- Gesperrt geöffnet: nur die Vorschau als Seite mit Hinweis und ‚Entsperren‘; oben ‚PDF‘ und Teilen.
- Kontextmenü und Wischen gesperrt: nur ‚Entsperren‘.
- Lösch-Abfrage mit Zahl der Einträge, ‚Erst Backup erstellen‘ nur ohne Backup heute.
- Sperre im Backup und im Abgleich; neue Prüfung `ablauf-sperre`.
- Kontextmenü am iPhone quer (AppDesign 4.68.0), Testfall P-120/9.

## Apple-Review

| Punkt | HIG |
|---|---|
| Kontextmenü gesperrt nur ‚Entsperren‘ | entspricht HIG ‚Context menus‘ (nicht verfügbare Punkte ausblenden, belegt in 0152) |
| Kontextmenü am iPhone quer rechts auf der Kachel | weicht ab, weil die HIG nur ‚above or below‘ nennt (belegt, `context-menus.json` dieser Sitzung) und darüber wie darunter 10 px fehlen; wie iOS es am iPhone quer löst, ist nicht belegt (Vermutung: Menü neben der Vorschau) |
| Kontextmenü bei Text 53 rollt | weicht ab, weil das Menü mit 777 px höher ist als der Platz (714 px); die HIG rät, die Höhe des Fensters nicht zu überschreiten (belegt, `context-menus.json`) |
| HIG- und Regel-Prüfskript | grün in allen 178 Läufen |

**Wackler im ersten Lauf** (allein grün): `ablauf-iphone` (Text 53, Chromium, Zeitüberschreitung) und `ablauf-markierung-menues` (WebKit,
Menü 338,3 statt 340 px breit); `kontextmenue-regeln` (WebKit, erster Fall) einmal rot, danach dreimal grün. Ursache nicht geklärt; im
zweiten vollen Lauf alle grün.

**Warum die Prüfung den Fehler bei Text 53 nicht früher fand:** in 0152 liefen nur die betroffenen Prüfungen, `ablauf-seitenleiste-position`
mit Text 53 nicht – erst der volle Lauf fand ihn.

## Offene Usertests

Nur **P-120** (unten vollständig). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst
die App ganz schließen und neu öffnen. Für P-120/7 und P-120/8 ein eigenes Reiselogbuch ‚Test‘ anlegen, damit deine echten Reiselogbücher
unberührt bleiben.

**P-120/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.58.0 · erstellt am … · AppDesign 4.68.0‘. Automatisch geprüft in `version-regeln`.

**P-120/1 – Sperren über das Kontextmenü (iPad)**
1. iPad quer, hell; in der Seitenleiste lange auf die Kachel eines Reiselogbuchs drücken.
2. Im Kontextmenü ‚Reiselogbuch sperren‘ antippen.
3. Erwartet: auf der Kachel steht ein kleines Schloss vor dem Titel, so hoch wie die Großbuchstaben. Rechts steht nur die Vorschau mit dem orangen Hinweis ‚Dieses
   Reiselogbuch ist gesperrt. Es lässt sich lesen und ausgeben, aber nicht ändern oder löschen.‘ und der Schaltfläche ‚Entsperren‘; oben ‚PDF‘ und das blaue Teilen,
   kein ‚…‘. Keine Tabelle, kein Fenster. Automatisch geprüft in `ablauf-sperre` (RLB-125/T-1, RLB-125/T-2, RLB-125/T-4).

**P-120/2 – Ausgabe bei gesperrtem Reiselogbuch (iPad)**
1. iPad quer, hell; das gesperrte Reiselogbuch aus P-120/1 ist offen.
2. Oben das blaue Teilen antippen, im Teilen-Menü ‚In Dateien sichern‘ wählen oder abbrechen; dann das Fenster mit x schließen.
3. Erwartet: das Fenster ‚Ausgabe V…‘ erscheint über der Vorschau; nach x ist wieder nur die Vorschau mit dem Hinweis zu sehen, keine Tabelle. Automatisch geprüft
   in `ablauf-sperre` (RLB-125/T-3).

**P-120/3 – Kontextmenü und Wischen gesperrt (iPad)**
1. iPad quer, hell; lange auf die Kachel des gesperrten Reiselogbuchs drücken, danach das Menü schließen.
2. Auf derselben Kachel nach links wischen.
3. Erwartet: das Kontextmenü zeigt nur ‚Reiselogbuch entsperren‘ – kein ‚Reiselogbuch einstellen‘, kein ‚Reiselogbuch löschen‘. Beim Wischen erscheint nur die Kapsel
   ‚Entsperren‘. Automatisch geprüft in `ablauf-sperre` (RLB-125/T-5).

**P-120/4 – Entsperren (iPad)**
1. iPad quer, hell; das gesperrte Reiselogbuch ist offen.
2. Im Hinweis ‚Entsperren‘ antippen.
3. Erwartet: sofort die normale Seite mit der Tabelle und oben ‚…‘; das Schloss auf der Kachel ist weg; auf der Kachel ‚geändert am <heute> … · iPad‘. Danach über
   ‚…‘ → ‚Reiselogbuch sperren‘ wieder sperren: sofort wieder nur die Vorschau. Automatisch geprüft in `ablauf-sperre` (RLB-125/T-6).

**P-120/5 – iPhone hoch: gesperrt öffnen und seitlich wischen**
1. iPhone hoch, hell; in der Startliste ein Reiselogbuch lange drücken und ‚Reiselogbuch sperren‘ wählen, dann die Kachel antippen.
2. In der Vorschau nach links wischen.
3. Erwartet: oben ‚PDF‘ und das blaue Teilen; der orange Hinweis geht über die ganze Breite, ‚Entsperren‘ steht darunter; die Vorschau rollt seitlich, Wörter sind nicht
   zerrissen, Kopfzeile und Hinweis bleiben stehen. Automatisch geprüft in `ablauf-sperre` (RLB-125/T-11). Danach ‚Entsperren‘ antippen.

**P-120/6 – Lösch-Abfrage mit Zahl der Einträge (iPad)**
1. iPad quer, hell; ein nicht gesperrtes Reiselogbuch mit Einträgen öffnen.
2. Oben ‚…‘ → ‚Reiselogbuch löschen‘ antippen.
3. Erwartet: ‚‚<Titel>‘ mit allen N Einträgen löschen? Das kann nicht rückgängig gemacht werden.‘ (N = erfasste Tage). Wurde heute auf diesem iPad noch kein Backup
   erstellt, stehen darunter ‚Erst Backup erstellen‘ (blau), ‚Reiselogbuch löschen‘ (rot) und ‚Abbrechen‘, sonst nur ‚Reiselogbuch löschen‘ und ‚Abbrechen‘.
   ‚Abbrechen‘ antippen – nichts wird gelöscht. Automatisch geprüft in `ablauf-sperre` (RLB-125/T-12).

**P-120/7 – Abgleich: gesperrt geht vor gelöscht (iPad und iPhone)**
1. Auf dem iPad ein Reiselogbuch ‚Test‘ anlegen, ‚Backup erstellen‘ → ‚In Dateien sichern‘ (iCloud Drive); auf dem iPhone ‚Backup laden‘ → diese Datei → ‚Abgleichen‘.
2. Auf dem iPad ‚Test‘ sperren (Kontextmenü), auf dem iPhone danach ‚Test‘ löschen. Auf dem iPhone ‚Backup erstellen‘ → sichern; auf dem iPad ‚Backup laden‘ → diese Datei →
   ‚Abgleichen‘ → ‚Abgleichbericht anzeigen‘.
3. Erwartet auf dem iPad: ‚Test‘ bleibt, gesperrt; im Abgleichbericht unter ‚Hinweise‘ ‚Auf dem iPhone gelöscht, auf diesem iPad gesperrt: Test – bleibt erhalten.‘
4. Auf dem iPad ‚Backup erstellen‘ → sichern; auf dem iPhone ‚Backup laden‘ → diese Datei → ‚Abgleichen‘ → ‚Abgleichbericht anzeigen‘.
5. Erwartet auf dem iPhone: ‚Test‘ ist wieder da, gesperrt; im Abgleichbericht die Zeile ‚neu angelegt‘ und unter ‚Hinweise‘ ‚Auf dem iPad gesperrt, auf diesem
   iPhone gelöscht: Test – wiederhergestellt.‘ Automatisch geprüft in `abgleich-regeln` (15.18 Fall 23).

**P-120/8 – ‚Ersetzen‘ nennt die gesperrten (iPad)**
1. iPad quer, hell; ‚Test‘ ist gesperrt (aus P-120/7).
2. Seitenleiste ‚…‘ → ‚Backup laden‘ → eine Backup-Datei wählen; die Abfrage lesen, dann ‚Abbrechen‘.
3. Erwartet: in der Kachel ‚Ersetzen‘ ‚Alle Daten auf diesem iPad werden durch das Backup ersetzt. Darunter 1 gesperrtes Reiselogbuch.‘ (bei mehreren ‚Darunter N
   gesperrte Reiselogbücher.‘); nach ‚Abbrechen‘ ist nichts geändert. Automatisch geprüft in `abgleich-regeln` (‚Darunter 2 gesperrte Reiselogbücher.‘). Zum
   Schluss ‚Test‘ auf beiden Geräten entsperren und löschen.

**P-120/9 – Kontextmenü am iPhone quer**
1. iPhone quer, hell; in der Startliste ganz nach oben rollen und lange auf die oberste Kachel drücken.
2. Das Menü ansehen, dann daneben tippen; danach ganz nach unten rollen und lange auf die letzte Kachel drücken.
3. Erwartet: das Kontextmenü mit ‚Reiselogbuch einstellen‘, ‚Reiselogbuch sperren‘ und rot ‚Reiselogbuch löschen‘ steht rechts auf der Kachel (oben bündig mit ihr bzw.
   über der Backup-Kachel); die Liste rückt nicht, Titel und Datum der Kachel bleiben ganz zu sehen; nach dem Schließen springt nichts. Automatisch geprüft in
   `kontextmenue-regeln` (iPhone quer, 3 bis 12 Einträge).


## Frage zum Wortlaut (0 Nr. 29): Icon-Tabelle, Designrichtlinie 5

**Alt:** keine Zeile für Sperren.

**Neu** (nach der Zeile ‚Löschen / Entfernen / Verwerfen‘):

| Aktion | Lucide-Icon | Darstellung |
|---|---|---|
| Sperren / Entsperren | `lock` / `lock-open` | Icon + Text (Kontextmenü, Mehr-Menü), Kapsel beim Wischen; gesperrt zeigt `lock` den Zustand |

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.

**Backlog:** Nächste Version: 0 Punkte bereit · Offen im Backlog: APD-135/B-3.3 Schritt 2, APD-145, APD-142, APD-136, APD-139, APD-141, APD-70 · RLB-126, RLB-6.
