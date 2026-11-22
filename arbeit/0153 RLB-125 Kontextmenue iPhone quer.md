# RLB-125 – Kontextmenü am iPhone quer (Sitzung 0153)

Stand 22.11.2026 · AppDesign 4.68.0 / Reiselogbuch 3.58.0 (im Bau, nicht veröffentlicht)

## Befund (gemessen, iPhone quer 852 × 393, Chromium)

- Das Kontextmenü der Kachel hat mit RLB-125 drei Punkte (einstellen, sperren, Strich, löschen) und ist **153 px** hoch (vorher zwei Punkte).
- Frei zwischen dem oberen Rand der Liste (61 px) und der Grenze über der Backup-Kachel (286 − 12 = 274 px): **213 px**.
  Kachel (62) + Abstand (8) + Menü (153) brauchen **223 px** – es fehlen **10 px**.
- **Oberste Kachel** (106–168): darunter endet das Menü bei 329 > 274, darüber beginnt es bei −55. Die Liste rückt dann um 55 px
  (Rückfall nach R-4.2), und die Kachel rutscht oben unter die Kopfzeile (Bild 1) → `kontextmenue-regeln` rot.
- **Unterste Kachel am Ende der Liste**: dasselbe (Rollstand 1193 → 1302).
- Die mittlere Kachel passt darüber; iPhone hoch und iPad sind grün.
- **Ergebnis:** kein Fehler in `ui.js` – **es fehlt schlicht der Platz**.

## So macht es Apple

- HIG *Context menus*: „a context menu might open above or below it“ (belegt, `context-menus.json` dieser Sitzung).
- Wie iOS das am iPhone quer löst, wenn darüber und darunter kein Platz ist, steht dort nicht – **Vermutung**: das Menü steht neben der
  angehobenen Vorschau. Nicht belegt.

## Vorschlag (Muster: Bilder 2–4)

Passt das Menü weder unter noch über die Kachel, ist die Kachel aber mindestens **doppelt so breit** wie das Menü (iPhone quer), steht es
**rechtsbündig auf der Kachel**, oben bündig mit ihr bzw. ganz über der Backup-Kachel – wie neben der Kachel am iPad. Die Liste bleibt
stehen, Titel und Datum der Kachel bleiben sichtbar, die Kachel ist blau getönt. Nur wenn auch das nicht passt (z. B. große Schrift am
iPhone hoch), rückt die Liste wie bisher.

- Bild 1 `arbeit/0153-vorher-t0.png` – heute: oberste Kachel, die Liste rückt, die Kachel ist halb verdeckt.
- Bild 2 `arbeit/0153-muster-t0.png` – Vorschlag: oberste Kachel, Menü rechts auf der Kachel, Liste steht (Rollstand 0 → 0).
- Bild 3 `arbeit/0153-muster-t1.png` – mittlere Kachel: unverändert über der Kachel (passt).
- Bild 4 `arbeit/0153-muster-ende.png` – letzte Kachel am Ende der Liste: Menü rechts, endet über der Backup-Kachel (Rollstand 1193 → 1193).

Technisch: `placeAt` in `ui.js` (nur der Fall `beside` ohne Platz daneben), AD-Bean: keine, weil `placeAt` zu keiner AD-Bean gehört.

## Wortlaut (0 Nr. 29)

### Designrichtlinie 17, R-4.2 (Spalte Regel)

**Alt:**

> **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, reicht der Platz darunter nicht, darüber – immer vollständig und ganz über
> der Backup-Kachel (ohne Kachel über der Offline-Zeile bzw. dem Rand); die Liste bleibt dabei stehen, auch beim Schließen; nur wenn das
> Menü weder darunter noch darüber ganz passt (z. B. große Schrift), rückt sie dafür; ohne ‚Öffnen‘

**Neu:**

> **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, reicht der Platz darunter nicht, darüber, passt es auch darüber nicht und ist
> die Kachel mindestens doppelt so breit wie das Menü (iPhone quer), rechtsbündig auf der Kachel, oben bündig mit ihr – immer vollständig
> und ganz über der Backup-Kachel (ohne Kachel über der Offline-Zeile bzw. dem Rand); die Liste bleibt dabei stehen, auch beim Schließen;
> nur wenn das Menü auf keine dieser Arten ganz passt (z. B. große Schrift), rückt sie dafür; ohne ‚Öffnen‘

Prüfung unverändert: `kontextmenue.mjs` – `checkContextMenus` (Lage, Liste bleibt stehen) · `pruefseite.mjs` – Teil `menue`.

### Designrichtlinie 15.4, Absatz ‚Kontextmenü‘ (erster Satz)

**Alt:**

> langes Drücken (ca. 0,6 s, R-3.5) auf einen Eintrag öffnet ein Menü (15.6) rechts neben der Kachel, ohne Platz daneben (iPhone)
> linksbündig darunter, reicht der Platz darunter nicht, darüber (wie Apple); die Liste bleibt stehen – nur wenn das Menü auf keiner Seite
> ganz passt, rückt sie und bekommt bei wenigen Einträgen unten Platz;

**Neu:**

> langes Drücken (ca. 0,6 s, R-3.5) auf einen Eintrag öffnet ein Menü (15.6) rechts neben der Kachel, ohne Platz daneben (iPhone)
> linksbündig darunter, reicht der Platz darunter nicht, darüber (wie Apple); passt es auch darüber nicht und ist die Kachel mindestens
> doppelt so breit wie das Menü (iPhone quer), steht es rechtsbündig auf der Kachel, oben bündig mit ihr (wie neben der Kachel am iPad);
> die Liste bleibt stehen – nur wenn das Menü auf keine dieser Arten ganz passt, rückt sie und bekommt bei wenigen Einträgen unten Platz;

## Testfall-Liste (Ergänzung)

- **Automatisch:** `checkContextMenus` erkennt die neue Lage (rechtsbündig auf der Kachel, oben bündig bzw. über der Backup-Kachel) und
  verlangt dabei, dass die Liste stehen bleibt; geprüft am iPhone quer mit 3, 6, 8, 9 und 12 Einträgen (oberste, sichtbare und letzte
  Kachel) in Chromium und WebKit; iPhone hoch und iPad unverändert. Gegenprobe: ohne die neue Lage wird `kontextmenue-regeln (iPhone)` rot
  (heutiger Stand).
- **Usertest P-120:** neuer Testfall (User) ‚iPhone quer, langes Drücken auf die oberste Kachel → Menü rechts auf der Kachel, die Liste
  bleibt stehen, die Kachel bleibt ganz sichtbar‘.

## Nach dem Ja

Prüfung anpassen, `kontextmenue-regeln` und die fünf angepassten Prüfungen laufen lassen, Doku und CHANGELOG (P-120) ergänzen, `fassung`,
`stufe`, `los --app reiselogbuch` (voll) – die Bau-Frage gilt (Ja aus 0152).
