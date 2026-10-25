# AppDesign – Hinweise für Claude

**Version 2.8.0** · Stand 25.10.2026

## Zuerst lesen (gezielt, Zusammenarbeit 0 Nr. 15)

1. `UEBERGABE.md` – Stand der letzten Sitzung, nächster Schritt, Chatnummer
2. `README - Zusammenarbeit allgemein.md` – nur Abschnitte 0 (Arbeitsmodell) und 1 (Sprache und Ton: per du)
3. `README - Designrichtlinie allgemein.md` – nur die Überschriften (`grep -n '^##'`); einzelne Abschnitte, `README.md`,
   `CHANGELOG.md` und `BACKLOG.md` erst, wenn die Aufgabe sie braucht

## Verpflichtend

Alle Regeln stehen in der Zusammenarbeit allgemein (hier keine Wiederholung) – besonders Startfrage ohne Auftrag (0 Nr. 19),
nie ohne ‚Ja‘ bauen (0 Nr. 21), Testfall-Liste vor jedem Bau (0 Nr. 1), erst Usertests, dann Neues (0 Nr. 22), Auswahlfenster mit
‚Ich schreibe im Chat‘ (0 Nr. 7) und die Zeile mit Zeit und Token am Ende jeder Antwort (`node werkzeug/messung.mjs`, 2.2).

## Technisch

- **Feste Fassung** (R-10.3, Designrichtlinie 14): jede Version liegt unveränderlich in `fassung/X.Y.Z/`; jede App lädt genau
  ihre Fassung (`../AppDesign/fassung/X.Y.Z/…`) und wird nur nach Rückfrage gehoben. `v4/` ist der Arbeitsstand (= neueste
  Fassung), eine Hauptversion bekommt `v5/`. `AD_VERSION` (ui.js) und `--ad-version` (design.css) steigen mit jeder
  AppDesign-Version (setzt das Skript).
- **Prüfungen** in `tests/` (Designrichtlinie 17); sie laufen über die Prüfskripte der Apps (AppDesign liegt neben dem App-Repo),
  z. B. im Reiselogbuch `sh tests/alle.sh`. Während der Arbeit nur die betroffenen, der volle Lauf genau einmal in `… los`.
- **GitHub Pages:** Branch `main`, Hauptordner.

## Arbeitsumgebung (Cloud)

- **Repos nebeneinander** unter `/home/user`: AppDesign ist angehängt; ReiseLogBuch und ReiseLogBuch-Import (privat) mit
  `add_repo` (Zugriff push) dazuholen und klonen: `git clone --depth 50 https://github.com/g811141a/<Repo> /home/user/<Repo>`.
  Die Sitzung erwartet kleingeschriebene Pfade – Verweise `ln -s AppDesign appdesign`, `ln -s ReiseLogBuch reiselogbuch`,
  `ln -s ReiseLogBuch-Import reiselogbuch-import`, dann je `register_repo_root` mit `/home/user/appdesign`,
  `/home/user/reiselogbuch`, `/home/user/reiselogbuch-import`.
- **Flacher Klon:** ein neu angelegter Zweig hat nach dem Push keine Verfolgung (Stop-Hook meldet ‚unpushed‘):
  `git config --add remote.origin.fetch '+refs/heads/<zweig>:refs/remotes/origin/<zweig>' && git fetch origin`. Der lokale
  `main` kann veraltet sein: vor dem ersten Commit `git fetch origin main` und auf `origin/main` aufsetzen
  (`git checkout -b <zweig> origin/main`); `git reset --hard` ist gesperrt.
- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz) – Originale, Ergebnisse und Protokolle nur im
  Notizordner der Sitzung. Im Ordner `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.
- **Tests einrichten:** im Ordner `ReiseLogBuch/tests` `npm install playwright@1.56.1` (die entstehenden `package.json` und
  `package-lock.json` nicht hochladen – löschen); WebKit kommt über das Setup-Skript der Umgebung. Dann im App-Ordner
  `node tests/alle.mjs` (`--alle`, `--gegenprobe [grundregeln]`, `--abdeckung`); einzeln in WebKit
  `PRUEF_BROWSER=webkit node tests/<datei>.mjs`; AppDesign-Selbsttest `node tests/lauf-selbsttest.mjs`. Es laufen höchstens so
  viele Browser wie Kerne, erst Chromium, dann WebKit; `offline.mjs` erkennt den Absturz des WebKit-Netzprozesses der
  Prüfumgebung und prüft die Ansicht einmal neu.
  Bringt die Umgebung einen neueren Chromium als die Revision zu Playwright 1.56.1 (1194; zurzeit Chrome 153 = 1243), danach Verweise
  anlegen, sonst meldet die Prüfung ‚chromium fehlt‘: `mkdir -p /opt/pw-browsers/chromium-1194 /opt/pw-browsers/chromium_headless_shell-1194 &&
  ln -sfn /opt/pw-browsers/chromium-1243/chrome-linux64 /opt/pw-browsers/chromium-1194/chrome-linux &&
  ln -sfn /opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64 /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux &&
  ln -sfn chrome-headless-shell /opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/headless_shell`.
- **Veröffentlichen** (Zusammenarbeit 0 Nr. 9): Vorbereitungs-Zweige `vorbereitung-X.Y.Z` in beiden Repos;
  `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app reiselogbuch=X.Y.Z` (ohne `--ad`, wenn nur die App); Texte
  schreiben (CHANGELOG mit Testfällen, Backlog, Versionsgeschichten); nach Änderungen an `v4/` oder `tests/` bzw. an Designrichtlinie
  oder Zusammenarbeit nach `vorbereiten`: `node werkzeug/veroeffentlichen.mjs fassung`; committen; dann
  `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch` im Hintergrund (prüft, voller Prüflauf, erst AppDesign, dann die
  App, wartet auf Pages; ~8 min). **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version),
  dann ändern. Danach die lokalen Vorbereitungs-Zweige löschen (sonst meldet der Stop-Hook ‚unpushed‘). Zweige auf GitHub löschen
  geht aus der Cloud nicht (403) – alte Vorbereitungs-Zweige dort schaden nicht.

---

## Versionsgeschichte

| Version | Datum | Inhalt |
|---|---|---|
| 2.8.0 | 25.10.2026 | APD-78 Nummernschema: Verweise mit den neuen Nummern (APD-n, RLB-n, Usertest, Testfall-Liste); Tabelle alt → neu in `ZUORDNUNG.md` |
| 2.7.0 | 24.10.2026 | Tests einrichten: Chromium-Verweise für einen neueren Chromium der Umgebung (Chrome 153) dauerhaft hier statt in UEBERGABE.md (Nutzer 24.10.2026) |
| 2.6.0 | 21.10.2026 | APD-39 Konsolidierung: Arbeitsumgebung (klonen, Verweise, Tests einrichten, Veröffentlichen) dauerhaft hier statt in UEBERGABE.md (APD-39/F-9); Verweise auf Zusammenarbeit 2.17.0 (0 Nr. 21, 22, Abschnitt 2.2) |
| 2.5.0 | 20.10.2026 | Zu Beginn Abschnitte 0 und 1 der Zusammenarbeit (Sprache und Ton: per du) – Zusammenarbeit 2.14.0 |
| 2.4.0 | 16.10.2026 | Zeile Zeit und Token mit `werkzeug/messung.mjs` (APD-12) |
| 2.3.0 | 16.10.2026 | Startfrage zu Beginn einer Sitzung ohne Auftrag (Zusammenarbeit 0 Nr. 19) |
| 2.2.0 | 15.10.2026 | Gezielt lesen (nur Abschnitt 0 und Überschriften), ein voller Prüflauf je Version (APD-7) |
| 2.1.1 | 14.10.2026 | Fassung enthält Designrichtlinie und Zusammenarbeit statt Git-Markierung (aus der Cloud gesperrt) |
| 2.1.0 | 14.10.2026 | Feste Fassung `fassung/X.Y.Z/` statt `v4/…?v=` (APD-5 Version B, APD-5/W-4), Veröffentlichungs-Skript |
| 2.0.0 | 14.10.2026 | Neu gefasst (APD-2 Schritt 4): zuerst UEBERGABE.md, Regeln nur noch als Verweis auf die Zusammenarbeit (ohne Antwortzeile), Prüfungen und Versionskopplung |
| 1.1.0 | 10.10.2026 | Zeitmessung |
| 1.0.0 | 09.10.2026 | erste Fassung |
