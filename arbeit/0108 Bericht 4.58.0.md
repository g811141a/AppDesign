# Bericht AppDesign 4.58.0 (APD-128)

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘

## Bericht

AppDesign 4.58.0 ist veröffentlicht: `main` `7b180d6`, Pages-Lauf ‚success‘ nach 63 s. `main` enthält `AD_VERSION = '4.58.0'` in `v4/ui.js` und
`fassung/4.58.0/ui.js`, dazu Zusammenarbeit 3.12.0. Neu ist APD-128: Eine App-Version mit reinen Textänderungen wird mit Stufe Text geprüft, alles
andere voll. Das Skript erkennt die Stufe selbst; am echten Schritt 3.55.0 → 3.55.1 ergibt es Stufe Text mit 8 Prüfungen statt 152 Läufen. Das
Reiselogbuch bleibt auf 3.55.1 mit Fassung 4.57.0 und wurde nicht gehoben.

## Alle Änderungen

1. **Zusammenarbeit 3.12.0, 0 Nr. 2:** genau ein Prüflauf je Version, Stufe Text oder voll (APD-128/V-1 mit V-4: Zeichenketten und Kommentare).
2. **AppDesign-`CLAUDE.md` 2.12.0:** ‚Technisch‘ (V-2) und ‚Veröffentlichen‘ mit `stufe` und `los … --stufe text` (V-3).
3. **`werkzeug/pruefstufe.mjs` (neu):** zerlegt `index.html` und Prüfdateien in Code, Zeichenketten und Kommentare und entscheidet Text oder voll.
   Es wählt die Prüfungen: die Grundprüfungen und alle Prüfungen mit dem alten oder neuen Text, ohne `hig`.
4. **`werkzeug/veroeffentlichen.mjs`:** Befehl `stufe` (nur lesen); `los --nur-app --app … --stufe text` prüft die Stufe vor allem anderen,
   ruft `tests/alle.mjs --nur …` auf und markiert den Merge-Commit mit ‚(Prüfstufe Text)‘. Die nächste Version läuft danach voll.
5. **Selbsttest:** 21 neue Fälle APD-128/M-1 bis M-18, Gegenprobe M-17 rot wie erwartet; ganzer Selbsttest grün. Dazu angepasst: Fall APD-5/D-4
   vergleicht jetzt mit der Fassung der App (4.57.0), weil AppDesign der App vorausgehen kann.
6. CHANGELOG, Backlog (APD-128 → Erledigt), README (Werkzeuge), Versionsgeschichte der Designrichtlinie (ohne inhaltliche Änderung).

**Prüfungen dieser Version:** `doku-regeln` grün (vorher 4 Stellen mit Nummern ohne Elternnummer im CHANGELOG korrigiert), `messung` grün,
Selbsttest des Veröffentlichungs-Skripts grün.

**Apple-Review:** keine Bedienung und kein Aussehen geändert – HIG nicht betroffen.

## Offene Usertests

Zurzeit keiner. P-102 ist erledigt (alles ok, 13.11.2026). Für 4.58.0 gibt es keinen Usertest am Gerät, weil sich die App nicht ändert.

**Noch nicht auf `main`:** Der Backlog-Eintrag ‚P-102 alles ok‘ im ReiseLogBuch liegt nur auf dem Sitzungszweig `claude/usertest-p-102-reiselogbuch-2ci6am`
(Commit `8c25f71`). Das ReiseLogBuch-`main` bekommt sonst nur Versionen über das Skript.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.
(Zurzeit ist kein Usertest offen.)

## Backlog

**Nächste Version:** AppDesign 0 Punkte bereit · Reiselogbuch 0 Punkte bereit · **Offen im Backlog:** RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 ·
APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1

## Kontext

273.388 – kurz vor der Übergabegrenze von 300.000 (0 Nr. 13). APD-128 ist abgeschlossen; ich schlage die Übergabe an **Reiselogbuch 0109** vor.
