# Bericht – AppDesign 4.70.0 / Reiselogbuch 3.58.3 veröffentlicht

**Stand 22.11.2026, Sitzung 0159**

AppDesign 4.70.0 und Reiselogbuch 3.58.3 sind veröffentlicht: Der volle Prüflauf war mit **192 Läufen grün in 83:25** (Chromium und WebKit), beide Pages-Läufe
endeten mit ‚success‘ (AppDesign 4a46881, Reiselogbuch cb59421). Die Version korrigiert die beiden Punkte aus P-122 und bringt die neue AD-Bean `notice`.
Vorher brach das Skript zweimal vor dem Prüflauf ab, beide Ursachen sind behoben (unten). **Bitte die App auf iPad und iPhone ganz schließen und neu öffnen.**

## Alle Änderungen

- **P-122/F-1** – Schaltflächen der Vorschau nach der Meldung wie beim Öffnen (`outputSource`, PDF ebenso) · entspricht HIG (gedrückt/Quelle blau, R-3.3).
- **P-122/F-2** – Hinweise mittig, **neue Regel R-3.10**: Ergebnisfenster, Backup-Erinnerung (im Fenster und über der Vorschau), Backup-Kachel; Hinweis ‚gesperrt‘ bleibt links ·
  zur Ausrichtung sagt die HIG nichts (Abgleich 0158) – bewusst einheitlich mittig.
- **AD-Bean `notice` (neu, Sitzung 0159):** `createNotice(element, { message, detail, buttons })`, `remove()`, Ereignis `action`; baut Ergebnis und Erinnerung; Katalog
  `katalog/notice.js`, Schnittstelle, Liste der AD-Beans, R-3.10 ‚Technisch‘ (Wortlaut freigegeben) · HIG hat keinen eigenen Baustein dafür – Kennung nach der Aufgabe.
  **Abweichung vom Vorschlag 0158:** statt allgemeinem CSS `.ad-notice`/`.ad-buttons` ohne Bean (verletzte R-1.13) jetzt die Bean.
- **Backup-Kachel** gehört nicht zu `notice`, sie kommt mit APD-148 in die AD-Bean `backup`.
- **Prüfungen:** `ablauf-p120` Teile P-122/F-1 und P-122/F-2 (Gegenprobe gegen 0158 rot, 4 Fehler); `hig.mjs` prüft R-3.10 nach jedem Schritt.
- **Behoben beim Bau:** AD-Bean-Zeile im CHANGELOG nicht im Format des Skripts; Bildnamen ‚Muster A‘ in einer Arbeitsdatei sahen aus wie alte Nummern.
- **Warum es die Vorbereitung übersah:** in 0158 lief `doku-regeln` nicht – erst der Vorlauf des Skripts fand R-1.13.
- **Auffällig, nicht geändert:** über der Vorschau öffnet ‚Backup erstellen‘ der Erinnerung ein eigenes Hinweisfenster ‚Backup‘ (wie 3.58.2) – zu APD-148.

**Apple-Review:** HIG- und Regel-Prüfskript (`hig.mjs`, alle Ansichten, nach jedem Schritt) im vollen Lauf grün.

## Offene Usertests

- **P-123** (Reiselogbuch 3.58.3 / AppDesign 4.70.0) – vollständig unten. Er ersetzt die offenen Punkte von **P-122** (/2 und /4); keine weiteren offenen Usertests.

Testfälle P-123 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Für P-123/1 bis P-123/3 das Reiselogbuch ‚Test‘ verwenden; heute **noch kein Backup**
erstellen, sonst fehlen Kachel und Erinnerung (‚Backup erstellen‘ erst ganz zum Schluss). P-123 ersetzt die offenen Punkte von P-122 (/2 und /4).

**P-123/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.58.3 · erstellt am … · AppDesign 4.70.0‘. Automatisch geprüft in `version-regeln`.

**P-123/1 – Vorschau nach der Meldung wie beim Öffnen (iPad und iPhone)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Teilen → ‚Vorschau‘. Erwartet: in der Vorschau rechts oben ‚PDF‘ und Teilen blau gefüllt; Teilen der Kopfzeile dahinter
   blau getönt.
2. Teilen der Vorschau antippen, im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
3. Erwartet: über der Vorschau die Meldung ‚Ausgabe V…‘. Mit x schließen.
4. Erwartet: die Vorschau sieht aus wie beim Öffnen – Teilen **blau gefüllt**, ‚PDF‘ neutral.
5. Dasselbe mit ‚PDF‘ (Drucken-Menü abbrechen, Meldung mit x schließen). Erwartet: wie in Schritt 4.
6. Dasselbe am iPhone hoch. Erwartet: wie in Schritt 4. Automatisch geprüft in `ablauf-p120` (P-122/F-1).

**P-123/2 – Meldung und Erinnerung mittig (iPad und iPhone)**
1. iPad quer, hell; ‚Test‘ → Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘.
2. Erwartet: Meldung ‚Ausgabe V…‘ über der Vorschau; im oberen Kasten ‚✅ Teilen-Menü abgeschlossen für‘ und der Dateiname mittig; im unteren Kasten ‚💾 Denk daran,
   auch ein Backup zu erstellen.‘, ‚Letztes Backup erstellt am …‘ und **‚Backup erstellen‘ mittig** darunter. Mit x schließen, Vorschau mit x schließen.
3. Oben Teilen (Kopfzeile) → ‚HTML‘ → im Teilen-Menü ‚In Dateien sichern‘.
4. Erwartet: das Fenster ‚Ausgabe V…‘ – beide Kästen mit Text und ‚Backup erstellen‘ **mittig**.
5. Dasselbe am iPhone hoch. Erwartet: wie in Schritt 2 und 4. Automatisch geprüft in `hig.mjs` (R-3.10).

**P-123/3 – Backup-Kachel mittig (iPad und iPhone)**
1. iPad quer, hell; Seitenleiste ‚Reiselogbücher‘ ansehen.
2. Erwartet: unten die gelbe Kachel – ‚Letztes Backup erstellt am …‘ und darunter die blaue Schaltfläche ‚Backup erstellen‘, beide **mittig**.
3. iPhone hoch, Startliste. Erwartet: wie in Schritt 2.
4. Ein gesperrtes Reiselogbuch öffnen (oder ‚Test‘ sperren). Erwartet: der Hinweis ‚Dieses Reiselogbuch ist gesperrt.‘ steht **wie bisher** (links, x rechts).
   ‚Test‘ wieder entsperren.
5. Zum Schluss ‚Backup erstellen‘ antippen. Erwartet: die Kachel verschwindet. Automatisch geprüft in `hig.mjs` (R-3.10).

**AppDesign 4.70.0 – R-3.10 Hinweise mittig** (allgemeiner Teil von P-122/F-2, Wortlaut bestätigt 22.11.2026, Sitzung 0158).

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

Nächste Version: 0 Punkte bereit · Offen im Backlog: APD-148 (1), APD-135 (1), APD-136 (1), APD-145 (2), APD-147 (2), RLB-126 (3).
