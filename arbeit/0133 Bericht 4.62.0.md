# Bericht – AppDesign 4.62.0 / Reiselogbuch 3.57.5 (APD-135 Paket 4)

**19.11.2026** · Sitzung 0133

## Bericht

AppDesign 4.62.0 und Reiselogbuch 3.57.5 sind veröffentlicht: AppDesign `main` 717684a, Pages ‚success‘ nach 94 s; Reiselogbuch `main` 897aeb1, Pages
‚success‘ nach 47 s. Auf `main` stehen `APP_VERSION` 3.57.5, `AD_NEEDED` 4.62.0 und `AD_VERSION` 4.62.0. Die Regeltexte haben keinen Doppeltext mehr:
Die Abschnitte nennen nur noch Werte und die Regelnummer. Bedienung und Aussehen der App bleiben gleich.

## Alle Änderungen

1. Designrichtlinie allgemein 4.62.0, Grundsatz im Kopf ‚Aufbau‘ (APD-135/W-49): Ein Abschnitt nennt nur Bau und Regelnummer.
2. Designrichtlinie allgemein: 21 Absätze in 2, 3, 4, 7, 8, 10, 15.3, 15.4, 15.8, 15.10, 15.11, 15.17 und 16 wiederholen ihre Regel nicht mehr
   (APD-135/D-27 bis APD-135/D-39). Das sind −109/+66 Zeilen. Der Katalog (17) und sein Kopf bleiben unverändert.
3. Designrichtlinie Reiselogbuch 3.57.5: Die Abweichungen 1–3 folgen demselben Grundsatz (APD-135/W-50).
4. Reiselogbuch `PROMPT.md` 3.57.5: 21 Stellen folgen demselben Grundsatz (APD-135/D-46 Nr. 1–21).
5. Reiselogbuch `PROMPT.md`, Rest von APD-135/W-51 (Wortlaut bestätigt): ‚seit 3.57.0, AppDesign APD-30‘ und ‚seit 3.57.2‘ beim Wischen sind gestrichen,
   ebenso ‚rechtsbündig‘ bei der Spalte ‚🚶🏽‍♂️km‘.
6. `tests/start-regeln.mjs` (Reiselogbuch): Nach dem Öffnen aus der Startliste wartet die Prüfung auf das Ende des Übergangs (`navFertig`). Das behebt den
   Wackler R-7.2 in WebKit.
7. `UEBERGABE.md`: Nummern mit der Vorsilbe APD-135/, damit `doku-regeln` grün ist.
8. Neu in `arbeit/`: Testfall-Liste und Prüfskript von Paket 4, Lagebild, Bau-Frage, Kleine Themen, Wortlaut zum Rest von APD-135/W-51 und dieser Bericht.
9. Fassung `fassung/4.62.0/`, die CHANGELOGs, die Versionsgeschichten und beide Backlogs mit Usertest P-112.

## Prüfungen

- **Paket-4-Skript:** vorher rot (46 alte Texte, 0 neue), nachher grün; die Gegenproben ‚Wert‘ (D-28 `.fclear`) und ‚Nummer‘ (D-37 R-7.2) sind rot.
- **`doku-regeln`:** grün. **`--gegenprobe schema`:** 20 von 20 Läufen rot.
- **Voller Prüflauf:** alle **164 Läufe grün in 81:24**, in Chromium und WebKit. Er enthält `hig` in allen 7 Varianten und `start-regeln` mit dem neuen
  Warten.
- **Gegenproben APD-30 (Wischen):** APD-30/W-87 rot (26 Meldungen), APD-30/W-88 rot (6 Meldungen), beide wie gefordert. APD-30/W-89 wurde wegen der Zeitgrenze des
  Hintergrundauftrags abgebrochen. APD-30/W-89, APD-30/W-96, APD-30/W-103 und APD-30/W-104 sind noch offen und gehen in die Übergabe.
- **github.io** ist von hier gesperrt. Die echte Seite prüfst du mit P-112/0.

## Apple-Review (HIG)

Nur Texte haben sich geändert, die App nicht. Alle Punkte **entsprechen HIG** wie in 3.57.4. Das HIG- und Regel-Prüfskript (`hig`, 7 Varianten in Chromium
und WebKit) ist **grün**.

## Usertest P-112

Bitte zuerst die App auf beiden Geräten ganz schließen und neu öffnen. Link: https://g811141a.github.io/ReiseLogBuch/

**P-112/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.5 · erstellt am … · AppDesign 4.62.0‘.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.

## Backlog

P-112 steht im Reiselogbuch-Backlog unter Abschnitt 1 (‚prüfen‘). APD-135 steht so: Paket 4 ist gebaut, als Nächstes kommen die Pakete 5–7.

## Wie weiter

Die Sitzung wurde schon zusammengefasst. Darum übergebe ich jetzt ohne Rückfrage (0 Nr. 13). Die neue Sitzung 0134 fragt nach P-112, holt die vier
Gegenproben nach und macht danach mit APD-135 Paket 5 weiter.
