# Warum `disconnect()` und nicht `remove()` oder `delete()`? (swipeactions, APD-136)

Sitzung 0145, 20.11.2026, Frage des Nutzers.

## Was `entfernen()` heute tut (`v4/ui.js`, Bean `swipeactions`)

Es löscht nichts und nimmt nichts aus der Seite. Es macht die offene Zeile zu und **hört auf, die Liste zu beobachten**:

- meldet alle Hörer ab (`removeEventListener` für pointerdown, pointermove, pointerup, pointercancel, click, touchmove, keydown, scroll, resize)
- beendet den Beobachter der Liste (`mo.disconnect()` – ein `MutationObserver`)
- nimmt die Bean aus der Liste der Wisch-Beans und entfernt die Klasse `ad-swipeactions` und `data-ad-bean` an der Liste

Die Liste selbst und ihre Zeilen bleiben unverändert stehen; danach lässt sie sich nur nicht mehr wischen.

## Was die Namen im Web bedeuten (MDN, in dieser Sitzung gelesen)

| Name | MDN | passt? |
|---|---|---|
| `remove()` | `Element.remove()` – „removes the element from its parent node.“ | nein – klingt, als verschwinde die Liste aus der Seite |
| `delete` | „The delete operator removes a property from an object.“ (dazu `Map.delete()`: einen Eintrag löschen) | nein – klingt nach Daten löschen; `delete` ist außerdem ein reserviertes Wort von JavaScript |
| `disconnect()` | `ResizeObserver.disconnect()` – „unobserves all observed Element or SVGElement targets.“; `MutationObserver.disconnect()` – „tells the observer to stop watching for mutations.“ | **ja** – genau das: aufhören zu beobachten, das Beobachtete bleibt |

Andere Möglichkeit: `destroy()` (heißt in vielen JS-Bibliotheken so – Vermutung, nicht nachgelesen) – sagt aber ‚zerstören‘, obwohl nichts zerstört wird.

## Entschieden

(Nutzer 20.11.2026, Sitzung 0145, im Fenster) `disconnect()` bleibt – Web-Vorbild für genau diese Aufgabe. Das deutsche ‚entfernen‘ war schon ungenau; im Katalog steht als Beschreibung künftig
„Hört auf, die Liste zu beobachten – sie bleibt stehen, lässt sich aber nicht mehr wischen.“
