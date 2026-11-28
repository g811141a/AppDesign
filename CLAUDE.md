# AppDesign – Hinweise für Claude

**Version 2.15.0** · Stand 28.11.2026

## Zuerst lesen (gezielt, Zusammenarbeit 0 Nr. 15)

1. `UEBERGABE.md` – Stand der letzten Sitzung, nächster Schritt, Chatnummer
2. `README - Zusammenarbeit allgemein.md` – die ganze Datei; der Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab
   der ersten Antwort
3. `README - Designrichtlinie allgemein.md` – nur die Überschriften (`grep -n '^##'`); einzelne Abschnitte, `README.md`,
   `CHANGELOG.md` und `BACKLOG.md` erst, wenn die Aufgabe sie braucht

## Verpflichtend

Alle Regeln stehen in der Zusammenarbeit allgemein – zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0; hier keine
Wiederholung.

## Technisch

- **Feste Fassung** (R-10.3, Designrichtlinie 14): jede Version liegt unveränderlich in `fassung/X.Y.Z/`; jede App lädt genau
  ihre Fassung (`../AppDesign/fassung/X.Y.Z/…`) und wird nur nach Rückfrage gehoben. `v5/` ist der Arbeitsstand (= neueste
  Fassung), `v4/` bleibt auf 4.71.1; eine Hauptversion bekommt `v6/`. `AD_VERSION` (ui.js) und `--ad-version` (design.css) steigen mit jeder
  AppDesign-Version (setzt das Skript).
- **Prüfungen** in `tests/` (Designrichtlinie 17); sie laufen über die Prüfskripte der Apps (AppDesign liegt neben dem App-Repo),
  z. B. im Reiselogbuch `sh tests/alle.sh`. Während der Arbeit nur die betroffenen, genau ein Lauf in `… los` – Stufe Text oder voll (Zusammenarbeit 0 Nr. 2).
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
- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz); Konvertieren und Prüfen nach dessen `CLAUDE.md` und
  `PROMPT.md`.
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
- **Hinweise zur Prüfumgebung:** Stand der Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`;
  ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`. Einzelne Prüfungen
  dauern bis zu 3 min. `los` führt eine neuere `main` in den Vorbereitungs-Zweig zusammen – danach den Zweig hochladen. `npm install`
  im Ordner `werkzeug` von ReiseLogBuch-Import verändert `package-lock.json` – danach `git checkout -- werkzeug/package-lock.json`.
  Nach einem Neustart des Arbeitsprozesses kann der Notizordner einen neuen Pfad bekommen. AppDesign ist nach dem Klonen ohne Zweig
  (HEAD lose): committen und mit `git push origin HEAD:main` hochladen.
- **Veröffentlichen** (Zusammenarbeit 0 Nr. 9): Vorbereitungs-Zweige `vorbereitung-X.Y.Z` in beiden Repos;
  `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app reiselogbuch=X.Y.Z` (ohne `--ad`, wenn nur die App); Texte
  schreiben (CHANGELOG mit Testfällen, Backlog, Versionsgeschichten); nach Änderungen an `v5/` oder `tests/` bzw. an Designrichtlinie
  oder Zusammenarbeit nach `vorbereiten`: `node werkzeug/veroeffentlichen.mjs fassung`; committen; vor der Bau-Frage
  `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` (schlägt die Stufe vor und nennt die Prüfungen); dann
  `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch [--stufe text]` im Hintergrund (prüft, führt eine neuere `main` vorher in die
  Vorbereitungs-Zweige zusammen – bei Konflikt Abbruch vor dem Prüflauf –, Prüflauf in der Stufe – `--stufe text` nur, wenn das Skript
  sie bestätigt, sonst Abbruch vor dem Prüflauf –, erst AppDesign, dann die App, wartet auf Pages; voll ~75 min, Text deutlich kürzer). **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version),
  dann ändern. Danach die lokalen Vorbereitungs-Zweige löschen (sonst meldet der Stop-Hook ‚unpushed‘). Zweige auf GitHub löschen
  geht aus der Cloud nicht (403) – alte Vorbereitungs-Zweige dort schaden nicht.

---

## Versionsgeschichte

Steht in `CLAUDE Versionsgeschichte.md` (neueste oben); jede neue Version bekommt dort eine Zeile.
