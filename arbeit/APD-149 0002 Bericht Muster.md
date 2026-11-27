# APD-149 – Bericht Muster im Bean-Katalog (Sitzung AppDesign 0002)

**27.11.2026** · Weg APD-149/W-1. Kein Bau, keine AppDesign-Version (0 Nr. 21). Das Muster liegt auf dem Zweig **`apd-149-muster`**, noch nicht auf `main`.

## Bericht

Die beiden Beans `commands` (Befehle) und `presentation` (Stapel) stehen als Entwurf im Bean-Katalog, in einer Datei `katalog/entwurf/presentation-commands.js`.
Sie bauen auf `v4/` auf, mit H-1 bis H-9 und dem Durchlass in der Kopfzeile auch ohne Menü (APD-149/J-3).
Alle Fälle APD-149/S-1 bis S-14 und die vier RLB-126-Fälle sind in Chromium und WebKit grün; die Gegenprobe S-15 wird in beiden Browsern rot, wie sie soll.
`katalog.mjs` ist in beiden Browsern grün, ebenso die 7 Prüfungen aus Abschnitt 4 des Wortlauts und `doku-regeln`.
Offen ist ein Fund der Grundregeln (R-1.4, unten): Er folgt aus dem Durchlass und braucht eine Entscheidung.

## Alle Änderungen

| Datei | Was |
|---|---|
| `katalog/entwurf/presentation-commands.js` (neu) | Beans `commands` und `presentation` unter `window.AD`, Vorführung ‚Ausprobieren‘, beide mit `draft: true` angemeldet |
| `katalog/index.html` | lädt die Entwurfsdatei; Seitenleiste: Gruppe ‚Entwurf‘ nach den Bereichen, ‚Entwurf‘ statt ‚seit …‘, Kopf ‚4 AD-Beans · 2 geplant · 2 im Entwurf‘ |
| `arbeit/APD-149/muster-pruefen.mjs` (neu) | APD-149/S-1 bis S-15 und APD-149/L-1 bis L-4, mit den Grundregeln nach jedem Schritt |
| `arbeit/APD-149/entwurf-regeln.mjs` (neu) | die 7 Prüfungen aus Wortlaut Abschnitt 4, Gegenprobe `beans:entwurf` |

- Keine Änderung an `v4/`, `tests/`, den Richtlinien oder einer Fassung.

## Was die Beans können

- **`commands`:**
  - `add`, `menu`, `validate`, `execute`, `revalidate`, `items(id, { place })` für Menü, Kontextmenü und Wischen (H-7)
  - `toolbar(element, ids)` baut die Kopfzeile. Das steht im Grobentwurf Abschnitt 4 und ist neu in der Schnittstelle.
- **`presentation`:**
  - `present(kind, content, { command, sourceItem, from, shouldDismiss, dirty, align })` für sheet, alert, menu, submenu, popover und activity
  - `dismiss`, `refresh`, `stack`, `top`, Ereignisse `change` und `reject`
  - Tönung, `aria-expanded`, `aria-haspopup`, Mehr-Icon, Sperre und Lage leitet die Bean nach jeder Änderung ab, auch nach einem Neuaufbau (MutationObserver).
- **Bewusst aus v4 übernommen:**
  - Fenster über `openDialog` (`#dlg`), Hinweisfenster über `adAlert` (`#msg`), Sprechblase über `choosePop`
  - Lage über `placeAt`, Wachsen und Schrumpfen, Tönung über `adSourcehighlight`
  - Ebene über `blockingLayer`. Sie hat ein Loch über der Kopfzeile (`clip-path`). Außerhalb schluckt sie den Klick weiter (Übergabe 3.3, geprüft in S-2).

## Ergebnis der Prüfungen (diese Sitzung)

| Prüfung | Chromium | WebKit |
|---|---|---|
| `muster-pruefen.mjs` S-1 bis S-14, L-1 bis L-4 | 0 Fehler | 0 Fehler |
| Grundregeln dabei | 1 Abweichung: R-1.4 | 1 Abweichung: R-1.4 |
| Gegenprobe S-15 | ohne Ableitung S-1 und S-3 rot, ohne Freigabe S-2 und S-3 rot | ebenso |
| `bean-katalog` (`katalog.mjs`, 4 Ansichten, jede Bean) | alles in Ordnung | alles in Ordnung |
| `entwurf-regeln.mjs` (Wortlaut Abschnitt 4) | alles in Ordnung, Gegenprobe rot | – (ohne Browser) |
| `doku-regeln` | alles in Ordnung | – |

- Die Fälle liefen in der Ansicht iPad quer. S-13 dreht dabei nach hoch und zurück. `katalog.mjs` öffnet die Seiten in allen 4 Ansichten.
- **S-15 hat zwei Teile.** Ohne jede Ableitung bleibt S-2 grün, weil dann auch nichts freizugeben ist. Darum gibt es dazu die Gegenprobe ‚Freigabe abgeschaltet‘.

## Funde und Entscheidungen für die nächste Runde

1. **R-1.4 und der Durchlass (H-6, APD-149/J-3).**
   - Die Grundregel verlangt: Bei offenem Menü ist alles neben dem Menü inert, auch `#app`.
   - Mit dem Durchlass bleibt die Kopfzeile der Quelle bedienbar. Darum kann `#app` als ihr Vorfahr nicht inert sein. Gesperrt sind seine anderen Teile.
   - Das braucht später eine Ergänzung in R-1.4 und in der Prüfung (`hig.mjs`): ‚außer der Leiste der Quelle‘. Den Wortlaut lege ich vor, wenn die Beans gebaut werden (0 Nr. 29).
2. **Escape am Fenster:** In Chromium kam das `click()` aus dem `cancel`-Hörer von v4 nicht an (`dlg` → `#dlgX`), wenn der Fokus im Feld lag.
   - Der Entwurf leitet Escape darum direkt über den Stapel (`shouldDismiss`).
   - Ob v4 selbst betroffen ist, habe ich nicht geprüft (Vermutung: ja, in Chromium).
3. **Listen-Ebene (RLB-126):** Kopf ‹, Zurück und Fokus sind Navigation, kein Eintrag im Stapel. Bei Apple ist das ein Push im Navigationsstapel, kein `present`.
   - Geprüft habe ich nur, dass Kontextmenü und Tönung einen Neuaufbau der Liste überstehen (APD-149/L-4).
   - Vorschlag: Die Listen-Ebene bleibt bei der Navigation (`navVor`, `navZurueck`).
4. **Neu in der Schnittstelle gegenüber dem Grobentwurf:**
   - `commands.toolbar`, `commands.items`, `commands.context`
   - Optionen `from`, `dirty` und `align` bei `present`
   - Ereignis `reject`
   - Sie stehen im Katalog unter ‚Schnittstelle‘.

## Ausprobieren am Gerät – erst nach dem Hochladen

Link (geht erst, wenn das Muster auf `main` ist): https://g811141a.github.io/AppDesign/katalog/index.html#presentation

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

- **Offene Usertests:** keine.
- **Apple-Abgleich:** H-6 mit Quellen in `arbeit/APD-149 0001 H-6 Befund und Apple-Abgleich.md`, H-1 bis H-9 im Grobentwurf Abschnitt 3.
- **Bewusste Abweichung** (wie im Grobentwurf): Am iPhone bleibt eine Abfrage eine Sprechblase.

Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1). Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
