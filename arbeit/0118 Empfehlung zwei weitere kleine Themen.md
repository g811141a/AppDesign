# Empfehlung: zwei weitere kleine Themen vor dem Bau

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · gebaut ist nichts

## Meine Empfehlung

### 3. APD-54 – Fremden Text bereinigen (Prio 3, ‚später‘)

- **Worum es geht:** Texte des Nutzers werden in Meldungen als HTML eingesetzt. Beispiel im Code: `index.html` Zeile 1343 setzt den Smiley der Schnellauswahl ohne `esc()` in die Sprechblase ‚… aus der Schnellauswahl entfernen?‘.
- **Was zu tun wäre:** alle Stellen durchgehen, an denen `confirmPop`, `choosePop`, Menüs und Hinweise Text aus den Daten bekommen (im Reiselogbuch 3 Aufrufe von `confirmPop`/`choosePop`, in `ui.js` 18 Stellen mit `innerHTML`), fehlendes `esc()` ergänzen, eine Prüfung mit einem Titel wie `<b>x</b>` dazu.
- **Warum klein:** am Aussehen ändert sich nichts, kein Muster nötig. Es braucht aber vorher eine kurze Testfall-Liste (0 Nr. 1) – den Umfang kenne ich erst nach dem Durchgehen.
- **Folge:** die Version ändert dann auch Code der App, nicht nur Prüfungen und Texte.

### 4. Aufräumen ohne Bau (nur Backlog und Übergabe)

- **`color-mix` am Gerät** ist belegt: Usertest P-101 war ‚ok bis auf P-101/16‘ (Reiselogbuch-Backlog, 12.11.2026), P-101/15 ‚Tageskachel mit Verlauf‘ also ok. Der Punkt kann aus der Liste ‚aus 0106‘ der Übergabe entfallen.
- **APD-113** steht noch unter ‚2. Weitere Themen‘ mit Prio 1, ist aber durch APD-123 ersetzt (Regelwächter abgeschaltet) – nach ‚Erledigt‘ verschieben.
- **Warum klein:** zwei Zeilen Doku, keine Version nötig.

## Hinweis zur Größe der Version

Nach 0 Nr. 8 gehören 2–3 zusammengehörige Punkte und höchstens 2 Themen in eine Version. Mit APD-85 Teil 6, APD-131 und APD-54 wären es drei Punkte – das ist die Grenze. Thema 4 zählt nicht mit, es braucht keinen Bau.

## Andere Möglichkeiten (größer)

- **APD-56 Format beim Tippen als Baustein** – Beträge-Formatierung aus `index.html` nach `ui.js`; Umbau mit Risiko für die Eingabe, eher eigene Version.
- **APD-32 ‚Problem melden‘** und **APD-1 Startseite** – brauchen erst Klärung und ein Muster.
