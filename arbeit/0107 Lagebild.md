# Lagebild – Reiselogbuch 0107

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0107 – Usertest P-101‘

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.55.0** veröffentlicht (Fassung 4.57.0, `main` `cddc637`) |
| AppDesign | **4.57.0** veröffentlicht (`main` `a19e621`, Übergabe 0106) |
| Zusammenarbeit allgemein | **3.11.0** |
| AppDesign-`CLAUDE.md` | **2.11.0** |

## Sitzung

- **Modell:** Opus 5.5 – `get_session`: `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`. Kein Modellwechsel: `model_fallback` steht in der
  Sitzungsdatei nur als Text (Starttext, gelesene Zusammenarbeit), kein Eintrag des Systems.
- **Aufwand:** hoch – `CLAUDE_CODE_EFFORT_LEVEL=high`, `get_session` `effort_level: high`, alle Aufrufe in der Sitzungsdatei `"effort":"high"`.
- **Hooks:** `~/.claude/settings.json` = `{}` – keine Hooks.
- **Umgebung:** ReiseLogBuch geklont, Verweise `appdesign`/`reiselogbuch` angelegt und angemeldet; Playwright 1.56.1 in `ReiseLogBuch/tests`
  (`package.json`/`package-lock.json` gelöscht); Chromium-Verweise 1194 → 1243 angelegt; Probestart: Chromium 153.0.8010.12 und WebKit 26.0 starten.

## Backlog

- **Nächste Version:** AppDesign 0 Punkte bereit · Reiselogbuch 0 Punkte bereit.
- **Offen im Backlog:** RLB-121 (Statistik teuerste/günstigste Quartiere) · APD-85 Teil 6 (Wackler WebKit) · APD-80 (Kontrast dunkel) · APD-30 übrige
  Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · APD-32 · RLB-6 · APD-1.
- **Ohne bestätigten Wortlaut (aus 0106):** PROMPT.md ‚Emojis klein‘; VoiceOver-Name für Rückgängig; Zeile ‚Cursor am Ende‘ in Designrichtlinie 16;
  `tests/README.md` zum Teil; `color-mix` in iOS-Safari am Gerät (P-101/15).
- **Vereinbarung:** Muster bis auf Weiteres nur hell (Nutzer 30.10.2026).

## Offener Usertest P-101 (Reiselogbuch 3.55.0, AppDesign 4.57.0)

Wörtlich aus `ReiseLogBuch/CHANGELOG.md`:

Testfälle P-101 (Schritt für Schritt, Zusammenarbeit allgemein 3.11.0). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-101/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.55.0 · erstellt am … · AppDesign 4.57.0‘.

**P-101/1 – Cursor am Ende**
1. iPad quer, hell: ein Reiselogbuch öffnen und einen Tag antippen.
2. In ‚Quartier‘ (mit Text) vorn auf den ersten Buchstaben tippen; danach noch einmal vorn tippen.
3. Erwartet: nach dem ersten Antippen steht der Cursor hinter dem letzten Zeichen; nach dem zweiten an der angetippten Stelle.

**P-101/2 – Leeres Feld einzeilig, wächst mit**
1. iPhone hoch, hell: einen Tag mit leerem ‚Wie war was?‘ öffnen.
2. Das Feld ansehen, antippen, ‚Gut‘ tippen, Eingabetaste, ‚Essen‘ tippen; dann alles löschen.
3. Erwartet: leer ist das Feld eine Zeile hoch; nach der Eingabetaste zwei Zeilen; nach dem Löschen wieder eine Zeile; der Cursor bleibt über der
   Tastatur sichtbar.

**P-101/3 – Verlauf: Vorschlag über dem Feld, am Ende, klein weiter** (wiederholt P-100/1)
1. iPad quer, hell: einen Tag mit zwei Zeilen im Verlauf öffnen.
2. In die erste Zeile des Verlaufs tippen, oben über dem Feld auf ‚Weiterfahrt nach …‘ tippen, dann ‚rom‘ tippen.
3. Erwartet: die Vorschläge stehen über dem Feld; ‚Weiterfahrt nach rom‘ steht als neue letzte Zeile, die Tastatur blieb auf Kleinbuchstaben.

**P-101/4 – ‚Sonstiges …‘**
1. iPhone hoch, hell: einen Tag mit Verlauf öffnen.
2. Über dem Feld auf ‚Sonstiges …‘ tippen, noch einmal auf ‚Sonstiges …‘ tippen.
3. Erwartet: am Ende steht genau eine neue leere Zeile mit dem Cursor, sie ist zu sehen. Danach mit x ‚Änderungen verwerfen‘.

**P-101/5 – Seitenleiste gleitet wie in Notizen**
1. iPad quer, hell: die Seitenleiste mit dem Knopf links oben aus- und wieder einblenden; zum Vergleich in Notizen dasselbe.
2. Mehrmals wiederholen.
3. Erwartet: einblenden weich, ohne Nachschwingen, etwa so schnell wie in Notizen; ausblenden etwas schneller und ruhig.

**P-101/6 – Blatt und Navigation am iPhone**
1. iPhone hoch, hell: ein Reiselogbuch öffnen und mit ‚<‘ zurück; einen Tag öffnen und mit x schließen; einen Tag öffnen, das Blatt halb nach unten
   ziehen und loslassen.
2. Jeweils mehrmals.
3. Erwartet: hinein und öffnen weich (nicht ‚extrem schnell‘), zurück und schließen ruhig; nach dem Loslassen gleitet das Blatt zurück; nichts springt.

**P-101/7 – Titel antippen = nach oben**
1. iPad quer, hell: ein langes Reiselogbuch öffnen, weit nach unten rollen.
2. Auf den Titel oben in der Kopfzeile tippen.
3. Erwartet: der Inhalt gleitet weich ganz nach oben, ohne Nachschwingen.

**P-101/8 – Rückgängig im Feld**
1. iPhone hoch, hell: einen Tag öffnen, ‚Ort‘ antippen.
2. ⓧ antippen. Erwartet: das Feld ist leer, rechts im Feld ein graues Rückgängig-Icon.
3. Rückgängig antippen. Erwartet: der Ort steht wieder da, der Cursor am Ende, rechts wieder das ⓧ.

**P-101/9 – Mehrzeilig ohne Sprechblase**
1. iPad quer, hell: einen Tag mit mehreren Zeilen im Verlauf öffnen, den Verlauf antippen.
2. ⓧ antippen. Erwartet: sofort leer, keine Sprechblase, das Feld ist eine Zeile hoch.
3. Rückgängig antippen. Erwartet: alle Zeilen sind zurück, das Feld ist wieder so hoch wie vorher.

**P-101/10 – Zwischenablage**
1. iPhone hoch, hell: einen Tag öffnen, den Verlauf antippen, ⓧ antippen.
2. In Notizen in eine Notiz tippen und ‚Einsetzen‘ wählen.
3. Erwartet: der geleerte Verlauf wird eingesetzt. Danach im Reiselogbuch mit x ‚Änderungen verwerfen‘.

**P-101/11 – Rückgängig verfällt**
1. iPad quer, hell: einen Tag öffnen, ‚Quartier‘ antippen, ⓧ antippen, dann ‚a‘ tippen.
2. Erwartet: rechts das ⓧ statt Rückgängig.
3. In ein anderes Feld tippen, dort ⓧ antippen, dann zurück in ‚Quartier‘ und wieder in das geleerte Feld. Erwartet: im geleerten Feld kein Knopf.
   Danach mit x ‚Änderungen verwerfen‘.

**P-101/12 – Dateiname nach ‚Backup erstellen‘**
1. iPad hoch, hell: in der Seitenleiste oben ‚…‘ (Mehr) → ‚Backup erstellen‘.
2. Im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
3. Erwartet: kleines Fenster ‚Backup‘ mit ‚✅ Teilen-Menü abgeschlossen für‘, darunter fett, zentriert und allein ‚Ω Backup Reiselogbuch JJJJ.MM.TT
   hh.mm.json‘; bricht der Name um, dann nur an einem Leerzeichen.

**P-101/13 – Dateiname nach abgebrochener Ausgabe**
1. iPhone quer, hell: ein Reiselogbuch öffnen, oben das Teilen-Icon (share) → ‚HTML‘.
2. Das Teilen-Menü ohne Auswahl schließen.
3. Erwartet: Fenster ‚Ausgabe V…‘ mit ‚⚠️ Teilen-Menü abgebrochen – nicht gespeichert:‘, darunter fett, zentriert und allein der Name ‚Reiselogbuch
   <Titel> JJJJ.MM.TT-JJJJ.MM.TT V….html‘; das Datum ‚JJJJ.MM.TT-JJJJ.MM.TT‘ bleibt zusammen.

**P-101/14 – Statistik: Umbruch nur nach ‚·‘**
1. iPhone hoch, hell: ein Reiselogbuch mit vielen verschiedenen Wetter-Zeichen und Smileys öffnen, nach unten zur ‚Statistik‘ rollen.
2. Die Zeilen ‚Wetter‘ und ‚Smileys‘ ansehen.
3. Erwartet: jede umbrochene Zeile endet mit ‚·‘, die nächste beginnt mit der Anzahl (z. B. ‚8×⛅‘); Anzahl und Zeichen stehen nie getrennt.

**P-101/15 – Tageskachel mit Verlauf**
1. iPhone hoch, hell: ein Reiselogbuch öffnen.
2. Die Tageskacheln ansehen. Erwartet: Spalte 1 links weiß, nach rechts grau, Text fett; Emojis in Spalte 1 und das Wetter oben rechts so groß wie die
   Smileys in Spalte 2; eine Linie unter dem Datum und eine unter der letzten Zeile.
3. iPhone-Einstellungen › Anzeige & Helligkeit › Textgröße ganz groß (Größere Textgrößen ein), zurück in die App. Erwartet: jede Bezeichnung als Streifen
   über dem Wert, oben weiß, nach unten grau.
4. Darstellung dunkel. Erwartet: der Verlauf zart von Dunkelgrau zu etwas hellerem Grau, Text gut lesbar.

**P-101/16 – Kopfzeile in Tabelle und Ausgabe**
1. iPad quer, hell: ein Reiselogbuch öffnen. Erwartet: die Kopfzeile der Tabelle der Tage und der Quartiere oben weiß, nach unten grau.
2. Teilen-Icon (share) › ‚Vorschau‘. Erwartet: die Kopfzeilen der Tabellen oben weiß, nach unten grau.
3. Vorschau schließen, Teilen-Icon (share) › ‚PDF‘, im Drucken-Menü die Vorschau ansehen. Erwartet: im PDF dieselben Kopfzeilen mit Verlauf.


## Rückmeldung

In der Kachel oder im Chat, z. B. ‚P-101: alles ok‘ oder ‚ok bis auf 5, 12‘ (Nummer und ein Stichwort genügen).
Danach: ok → P-101 in beiden Backlogs nach ‚Erledigt‘; Abweichungen → ‚0. Nächste Version‘ und klären (erst Usertests, dann Neues).
