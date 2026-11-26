# AD-Bean `alert` – wie sie heute rechnet und wie es einfacher geht (Sitzung 0162)

**26.11.2026** · Stand AppDesign 4.70.1 (`fassung/4.70.1/ui.js` `createAlert`, `placeDialogs`; `design.css` `.ad-alert`)

## 1. Deine Beobachtung

Die Tönung siehst du **auch nach Teilen → HTML** (direkter Weg). Das ist der zweite Fehler, den ich nachgebaut habe (`outputSource` setzt `sourceItem`, beim Schließen
des Hinweisfensters gibt sie niemand frei). Er ist schon in der Prüfung P-124/F-2 enthalten und rot gegen 3.58.4, und die beschlossene Lösung behebt ihn.

## 2. Wie die Bean heute vorgeht

Die Breite kommt aus **drei Quellen**, und die Lage regelt eine **eigene Funktion**:

1. **CSS-Grundbreite:** `.ad-alert` ist `min(max(360px, 360px × Textgröße), 90vw)` breit. Das breite Fenster (`.ad-alert-wide`) ist
   `min(max(600px, 600px × Textgröße), 100vw − 32px)` breit. Am iPhone gelten eigene Werte (`min(360px, 100vw − 32px)`).
2. **`showModal`:** Die Bean schreibt Titel und Text ins `<dialog>`, öffnet es und ruft dann `passen()` und `placeDialogs()` auf.
3. **`passen()` (nur iPad, nur wenn ein Dateiname `.fname` drinsteht):**
   - Sie hängt eine unsichtbare **Kopie des Dateinamens** an, misst ihre Breite in einer Zeile und entfernt sie wieder.
   - Sie misst die aktuelle Fensterbreite (Grundbreite) und rechnet daraus den Rand um den Text.
   - Sie setzt **kurz die Klasse `ad-alert-wide`**, misst die Breite (das ist die Höchstbreite, also 600 px) und nimmt die Klasse wieder weg.
   - Dann setzt sie `style.width = min(Name + Rand, 600 px)`.
4. **Inhalt kommt später:** Das Reiselogbuch setzt Ergebnis und Erinnerung (AD-Bean `notice`) erst **nach** `showModal` ein. Darum beobachtet die Bean seit 4.70.1
   jede Änderung im Fenster (`MutationObserver`) und misst neu. Bei `resize` misst sie ebenfalls neu.
5. **`placeDialogs()` (eigene Funktion für alle Fenster):** Sie liest den sichtbaren Bereich (`visualViewport`, sichere Ränder, Tastatur), setzt die Höchsthöhe
   `--msg-max` und **zentriert** das Fenster senkrecht (`top`), waagrecht über `margin: 0 auto`.

**Bewertung:** Du hast recht. Das ist in Schichten gewachsen: 4.11.0 brachte das breite Fenster, 4.64.0 `fitFileName`, 4.70.1 den `MutationObserver`. Heraus kam ein
Ablauf, der misst, nachbessert und wieder misst, statt einmal fertig zu rechnen. Beide Fehler der letzten Runden kamen genau daher:

- **P-123/F-1:** Gemessen wurde, bevor der Inhalt da war.
- **P-124/F-1:** Die Höchstbreite wird von einer CSS-Klasse geborgt (600 px), statt vom Bildschirm.

Zwei Dinge bleiben trotzdem nötig, auch in einer einfachen Lösung: Safari ändert den sichtbaren Bereich (Tastatur, Drehen, Textgröße). Deshalb muss die Bean bei
`resize` neu rechnen, mit derselben Funktion.

## 3. So würde ich es machen – eine Funktion `layout()` in der Bean

1. **Inhalt fertig vor dem Öffnen:** `showModal(title, message, …)` bekommt den ganzen Inhalt. Die Kästen der AD-Bean `notice` werden **vor** dem Öffnen eingesetzt.
   Damit fällt der `MutationObserver` weg.
2. **Verfügbare Fläche:** Breite und Höhe des sichtbaren Bereichs (`visualViewport`), abzüglich der sicheren Ränder und **eines** festen Rands je Seite.
3. **Breite** = so breit, wie der Inhalt braucht (Dateiname in einer Zeile), mindestens die Mindestbreite (360 px × Textgröße), höchstens die verfügbare Breite.
   Am iPhone ist sie wie heute fest.
4. **Höhe** = so hoch, wie der Inhalt braucht, höchstens die verfügbare Höhe; darüber rollt der Text im Fenster.
5. **Zentrieren** in der verfügbaren Fläche, in der Bean selbst.
6. **Neu rechnen** bei `resize`, Drehen, Textgröße und Tastatur – mit derselben `layout()`.

**Konstante:** Heute gibt es mehrere: 32 px (2 × 16 px Rand) beim breiten Fenster, `90vw` bei der Grundbreite, oben und unten mindestens 10 px. Ich würde sie zu
**einem festen Rand** zusammenfassen (16 px je Seite, wie die Ränder bei Apple). Einen Rand in Prozent würde ich nicht nehmen: 10 % wären am iPad quer 118 px
auf jeder Seite, und die Fläche bliebe ungenutzt.

**Prüfungen** gibt es dafür schon: `ablauf-p120` (P-123/F-1, P-123/F-2, P-124/F-1) und `ablauf.mjs` `checkDateiname` (vier Lagen, große Schrift, Drehen).
`checkDateiname` bekommt die neue Höchstbreite.

## 4. Frage

Statt der kleinen Korrektur (nur die Grenze von 600 px aufheben) baue ich in **4.70.2 die Berechnung der Bean neu** wie in Abschnitt 3. Der Rest von 4.70.2
(`sourcehighlight`, `outputSource`) bleibt wie beschlossen. Der Wortlaut von R-10.8 bleibt wie bestätigt („höchstens Bildschirmbreite − 32 px“). Dafür
ändere ich die Übergabe für 0163.

**Entscheidung (Nutzer 26.11.2026, Sitzung 0162, im Fenster):** Neubau in 4.70.2 – ja; Rand fest 16 px je Seite – ja. Gebaut wird in Sitzung 0163.
