# AD-Bean zuerst – ist das sichergestellt?

**Stand 19.11.2026** · Sitzung 0136 (nach der Übergabe)

## Was heute in den Regeln steht

- **R-1.13** (Designrichtlinie 17): ‚ein allgemeines Element, das neu entsteht oder umgebaut wird, ist eine **AD-Bean** in `ui.js`‘ – mit Fabrik
  `create<Kennung>(…)`, Eigenschaften, Methoden, Ereignissen, eigenem CSS unter `.ad-<kennung>`, Eintrag in der Liste der AD-Beans (15).
- **0 Nr. 25** (Zusammenarbeit): ‚bei allgemein: welche AD-Bean – eine bestehende mit neuer Eigenschaft oder eine neue mit Kennung (R-1.13); das steht im
  Muster und in der Bau-Frage‘.
- **Prüfung:** `doku.mjs` – `checkBeans` prüft nur die **vorhandenen** Beans (Liste ↔ `ui.js`/`design.css`, CSS-Präfix, Namen in der App). Ob eine Änderung an
  einem allgemeinen Element als AD-Bean gebaut wurde, prüft **nichts automatisch** – das ist Selbstkontrolle. Im Kasten ‚Immer‘ steht es nicht.
- **Heute gibt es eine AD-Bean:** `swipeactions` (`createSwipeactions`); `createSync` ist älter und nicht in der Liste.

**Antwort:** Du musst es nicht wiederholen – die Regel gilt. Sicher ist es aber nicht, wie diese Sitzung zeigt.

## Fehler in dieser Sitzung (mein Fehler)

- **APD-138:** Ich habe geschrieben ‚das bestehende Hinweisfenster `#msg` bekommt die Eigenschaft ‚Breite nach Dateiname‘, keine neue Bean (R-1.13)‘. Das
  Hinweisfenster (`inform`) ist aber **keine** AD-Bean. Nach R-1.13 muss es bei diesem Umbau eine werden – oder die Abweichung hätte ich dir als Frage stellen
  müssen. Das steht so auch in der Testfall-Liste und im Vorschlag, die du bestätigt hast.
- **Paket 6 Schritt 1, B-4.2:** `markHeld(root)` ist eine neue lose Funktion bei den gedrückten Schaltflächen (`hold`, `release`, `setOpener`). Das ist eine kleine
  Bereinigung der Schnittstelle, aber auch hier hätte ich die Frage ‚AD-Bean?‘ stellen müssen.
- Warum es durchrutschte: Es gibt keine automatische Prüfung, und die Frage steht nicht im Kasten ‚Immer‘ oder ‚Jede Antwort‘, den ich vor jeder Antwort prüfe.

## Vorschlag

1. **APD-138 als AD-Bean:** Das Hinweisfenster wird die AD-Bean **`hinweis`** (Bereich ‚Fenster und Meldungen‘, Fabrik `createHinweis(…)`) mit der Eigenschaft
   `breiteNachDateiname` (Standard ein am iPad). `inform(…)` bleibt als kurzer Aufruf der Bean, damit die App nicht an allen Stellen umgestellt werden muss.
   Schnittstelle, Wortlaut für die Liste in 15 und Ergänzung der Testfall-Liste macht Sitzung 0137 vor der Bau-Frage (0 Nr. 29). `markHeld` prüft 0137 ebenso:
   gehört es in eine Bean der gedrückten Schaltflächen, oder bleibt es bewusst eine Funktion (mit Grund).
2. **Absichern statt wiederholen:**
   - Im Kasten ‚Immer‘ (Zusammenarbeit 0) kommt dazu: ‚allgemein = AD-Bean (R-1.13, Nr. 25)‘.
   - `veroeffentlichen.mjs` prüft beim `vorbereiten` und vor `los`: Ändert eine AppDesign-Version `ui.js` oder `design.css`, nennt ihr CHANGELOG-Eintrag je
     Punkt ‚AD-Bean: `<kennung>` (neu | neue Eigenschaft …)‘ oder ‚AD-Bean: keine, weil …‘. Fehlt das, bricht das Skript ab.
   - Den genauen Wortlaut legt 0137 dir zur Bestätigung vor (0 Nr. 29).
3. Ich gebe deine Entscheidung sofort an die laufende Sitzung **Reiselogbuch 0137** weiter, damit sie die Vorbereitung entsprechend anpasst.
