# APD-149 – Wortlaut ‚Beans im Entwurf im Bean-Katalog‘ (Sitzung AppDesign 0001)

**26.11.2026** · zur Freigabe nach 0 Nr. 29. Grundlage ist Weg APD-149/W-1 (`arbeit/APD-149 Grobentwurf V-3.md` Abschnitt 9 und 10). Noch keine Änderung im Repo.

## 1. Ausgangslage (gelesen in dieser Sitzung)

- **Designrichtlinie 14:** Der Katalog „lädt immer `v4/`“ und hat je Bean der Liste (15) eine Datei `katalog/<kennung>.js`.
- **R-1.13** sagt: „jede Katalogdatei gehört zu einer Bean der Liste“.
- **`checkKatalog`** (Teil von `checkBeans`, `tests/doku.mjs`) liest nur `katalog/*.js` in der obersten Ebene.
  - Ein Unterordner `katalog/entwurf/` stört die Fassung 4.70.2 nicht. Das Reiselogbuch prüft mit dieser Fassung.
- **`katalog.mjs`** öffnet jede Bean, die sich im Katalog anmeldet, in 4 Ansichten mit den Grundregeln.
  - Das gilt auch für die Prüfung aus der Fassung 4.70.2, also auch im vollen Lauf des Reiselogbuchs.
  - Darum muss ein Entwurf grün sein, bevor er auf `main` kommt. Sonst wird der nächste Bau des Reiselogbuchs rot.

## 2. Wortlaut Designrichtlinie 14 (neuer Punkt nach ‚Inhalt‘)

**Alt:** – (es gibt keinen Punkt dazu. Im Punkt ‚Inhalt‘ steht nur: „`katalog/` (Bean-Katalog: … je Bean der Liste (15) eine Datei
`<kennung>.js` …; lädt immer `v4/`, gehört nicht zur festen Fassung; R-1.13)“ – das bleibt so.)

**Neu:**

> - **Beans im Entwurf:** Das Muster einer neuen AD-Bean entsteht als Entwurf im Bean-Katalog, in einer Datei
>   `katalog/entwurf/<name>.js`.
>   - Die Datei bringt den Code der Beans selbst mit. Er baut auf `v4/` auf, das CSS steht nur unter `.ad-<kennung>…`.
>   - Sie meldet jede Bean wie eine Katalogdatei an, dazu mit `draft: true`.
>   - Eine Datei darf mehrere Beans anmelden, die zusammen entstehen.
>   - Der Katalog zeigt sie in der Seitenleiste unter ‚Entwurf‘, nach den Bereichen. Statt ‚seit …‘ steht ‚Entwurf‘ da.
>   - Ein Entwurf steht nicht in der Liste (15), nicht in `ui.js`, `design.css` oder `schnittstelle.json` und in keiner Fassung.
>     Keine App lädt ihn.
>   - Er ändert sich ohne AppDesign-Version. Auf `main` kommt er nur nach Rückfrage (Pages). Vorher müssen grün sein:
>     `katalog.mjs` in Chromium und WebKit, `checkBeans` und die Fälle seiner Testfall-Liste.
>   - Wird die Bean gebaut, wandert sie in `ui.js` bzw. `design.css`, in die Liste (15) und nach `katalog/<kennung>.js`. Die Entwurfsdatei
>     wird in derselben Version gelöscht.

## 3. Wortlaut R-1.13 (Katalog 17)

**Regeltext alt** (Satz in der Mitte):
> … und denselben Regeln wie in der Liste; jede Katalogdatei gehört zu einer Bean der Liste. Wer eine Bean neu baut …

**Regeltext neu:**
> … und denselben Regeln wie in der Liste; jede Katalogdatei gehört zu einer Bean der Liste. **Beans im Entwurf (14) stehen nur in
> `katalog/entwurf/`, mit einer Kennung, die nicht in der Liste steht.** Wer eine Bean neu baut …

**Spalte Prüfung alt:**
> doku.mjs – `checkBeans` (Liste ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter dem Präfix, Namen in der App, Liste ↔ `katalog/`;
> Namen der Liste … Gegenprobe `beans:englisch`) · `katalog.mjs` (Katalog lädt fehlerfrei, jede Bean geöffnet, Grundregeln, Versionszeile =
> `AD_VERSION`)

**Spalte Prüfung neu:**
> doku.mjs – `checkBeans` (Liste ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter dem Präfix, Namen in der App, Liste ↔ `katalog/`;
> **Beans im Entwurf ↔ `katalog/entwurf/`, Gegenprobe `beans:entwurf`;** Namen der Liste … Gegenprobe `beans:englisch`) · `katalog.mjs`
> (Katalog lädt fehlerfrei, jede Bean geöffnet **– auch die im Entwurf –**, Grundregeln, Versionszeile = `AD_VERSION`)

## 4. Was `checkBeans` für Entwürfe prüft (neu in `checkKatalog`)

1. Jede Datei in `katalog/entwurf/` lässt sich lesen. Sie meldet mindestens eine Bean an, jede mit `draft: true`.
2. `katalog/index.html` lädt jede Entwurfsdatei (`<script src="entwurf/<name>.js">`).
3. Die Kennung jeder Bean im Entwurf
   - steht **nicht** in der Liste der AD-Beans (15),
   - hat kein `create<Kennung>` in `ui.js`,
   - kommt im Katalog nur einmal vor (nicht doppelt mit einer gebauten Bean).
4. Die Namen der Schnittstelle (Kennung, Anlegen, Eigenschaften, Nur lesen, Methoden, Ereignisse) sind englisch, wie bei der Liste: kein
   Umlaut, kein ß, kein Wort der Sperrliste.
5. Keine App (`index.html`, `sw.js`), kein `v4/` und keine Fassung nennt `katalog/entwurf/`.
6. Eine Katalogdatei **ohne** `draft` in `katalog/entwurf/` ist ein Fehler, ebenso `draft: true` in der obersten Ebene.
7. **Gegenprobe `beans:entwurf`:** Eine Entwurfs-Kennung steht zusätzlich in der Liste, und eine Entwurfsdatei fehlt in `index.html`.
   Beides muss rot werden.

`katalog.mjs` bleibt unverändert. Es öffnet schon heute jede angemeldete Bean, also auch die im Entwurf.

## 5. Wann kommt der Wortlaut in die Richtlinie?

- Die Designrichtlinie trägt die Versionsnummer des Repos (Kopf der Datei) und steht in jeder Fassung. Eine Regeländerung kommt darum mit
  einer AppDesign-Version.
- **Empfehlung:** Der Wortlaut ist jetzt freigegeben. In Designrichtlinie 14, R-1.13 und `checkBeans` kommt er mit der **nächsten
  AppDesign-Version**, als Punkt in ‚0. Nächste Version‘ im Backlog.
  - Bis dahin gilt er durch diese Freigabe, wie bei RLB-126/J-10.
  - Den Entwurf prüfe ich bis dahin selbst: `katalog.mjs` in Chromium und WebKit und APD-149/S-1 bis S-15. Die Punkte aus Abschnitt 4 prüfe ich mit
    einem Skript im Notizordner.
  - So muss für das Muster kein voller Prüflauf von 75 min laufen.
- Die Kette RLB-126 baut parallel. Kommt ihre Version (4.71.0) zuerst, steht der Punkt dort in ‚0. Nächste Version‘ bereit.
- **Andere Möglichkeit:** erst mit dem Bau von `commands`/`presentation` in `v5/`.

## 6. Entschieden (Nutzer 26.11.2026, Sitzung AppDesign 0001, im Fenster)

- **APD-149/J-1:** Wortlaut aus den Abschnitten 2 bis 4 **freigegeben**.
- **APD-149/J-2:** Der Wortlaut kommt mit der **nächsten AppDesign-Version** in Designrichtlinie 14, R-1.13 und `checkBeans` (Punkt in
  ‚0. Nächste Version‘). Bis dahin gilt er durch J-1. Den Entwurf prüft Claude selbst (`katalog.mjs`, APD-149/S-1 bis S-15, Skript zu
  Abschnitt 4).
