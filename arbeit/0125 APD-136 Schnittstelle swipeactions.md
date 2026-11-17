# APD-136 – Apple-Abgleich und Schnittstelle der ersten AD-Bean `swipeactions` (Sitzung 0125)

**Stand 17.11.2026** · **Bestätigt (Nutzer 17.11.2026, Sitzung 0125): Schnittstelle 2.1 bis 2.4, Maße fest in der Bean, Testfälle W-72 bis W-80** · Grundlage: `arbeit/0123 Kapselung Klärung.md` (Entscheidungen 0123), Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md`
(APD-30/D-1 bis D-11, W-1 bis W-71, bestätigt), Wortlaut `arbeit/APD-30 Wischaktionen Wortlaut.md` (APD-30/V-1 bis V-11, bestätigt). Noch nichts gebaut, nichts
an Regeln geändert. Der Wortlaut der allgemeinen Regel kommt im nächsten Schritt (0 Nr. 29).

## 1. Apple-Abgleich (0 Nr. 23, mit Quellen)

**So macht es Apple** – gelesen in der Apple-Dokumentation (Quellen unten):

| Apple | Wortlaut (Auszug) | Für uns |
|---|---|---|
| SwiftUI `swipeActions(edge: HorizontalEdge = .trailing, allowsFullSwipe: Bool = true, content:)` [1] | ‚Adds custom swipe actions to a row in a list.‘ | **Bean-Muster bestätigt:** ein Baustein, wenige Eigenschaften mit **Standardwerten**, die Aktionen als Liste |
| `allowsFullSwipe` [1] | ‚whether a full swipe automatically performs the first action. The default is `true`.‘ | Eigenschaft `durchwischen`, Standard `true` |
| Reihenfolge [1] | ‚Actions appear in the order you list them, starting from the swipe's originating edge.‘ | Apple: das erste Element steht ganz außen. Bei uns gilt die **Reihenfolge des Kontextmenüs** (R-7.8: ‚gleiche Reihenfolge, die zerstörende … ganz außen‘), also steht das **letzte** Element außen. Das Aussehen ist gleich, nur die Liste ist umgekehrt. Grund: Die App übergibt **eine** Liste für beides (APD-30/D-1). |
| Rolle [1] | Mit der Rolle `destructive` erscheint die Aktion rot. | `red: true` wie im Menü |
| `swipeActionsContainer()` [2] | ‚Coordinates swipe action dismissal and mutual exclusion across rows in a container.‘ · ‚Only one row's swipe actions are revealed at a time.‘ Dazu schließen Rollen und Tippen außerhalb die offenen Aktionen (ab iOS 27; `List` macht das von selbst). | **Die Bean hängt an der Liste, nicht an der einzelnen Kachel** – wie Apples Container: höchstens eine offen, Rollen und Tippen daneben schließen (APD-30/D-3) |
| UIKit `UISwipeActionsConfiguration` [3] | ‚The set of actions to perform when swiping on rows of a table.‘ · `actions` · `performsFirstActionWithFullSwipe` | Dasselbe in UIKit: Liste plus Schalter für das Durchwischen. Einen Standardwert nennt die Seite nicht. |
| `UIContextualAction` [4] | `title` (‚displayed on the action button‘), `image`, `style`, `handler` (‚to execute when the user selects the action‘) | Ein Eintrag hat Wort, Symbol, Stil (rot) und Aktion – bei uns `kurz`, `icon`, `red` und `act` |

**Abweichungen (bewusst):**
- Reihenfolge der Liste umgekehrt (siehe oben). Das Aussehen ist wie bei Apple.
- Durchwischen fragt zuerst (steht schon in 16, APD-30/V-6).
- Apple bietet keine öffentlichen Schwellen (Weg, Tempo) an. Die Bean bietet sie **auch nicht** als Eigenschaft an (siehe 2.3).

**Technik – Web Components oder Fabrik-Funktion (entschieden in 0123: Fabrik-Funktion):** Die Vermutung aus 0123 ist jetzt belegt. WebKit
unterstützt die Erweiterung eingebauter Elemente (`is=`) nicht, der Eintrag ist als ‚RESOLVED WONTFIX‘ geschlossen [5]. Laut MDN plant Safari
das auch nicht [6]. Die Entscheidung für die Fabrik-Funktion bleibt.

## 2. Schnittstelle `swipeactions` (Ergänzung zur Testfall-Liste APD-30)

### 2.1 Eintrag in der Liste der AD-Beans

| Feld | Inhalt |
|---|---|
| Kennung | `swipeactions` |
| Bereich | Aktionen und Menüs |
| Name | Wischaktionen |
| Fabrik | `createSwipeactions(liste, einstellungen)` – einmal je Liste, z. B. beim Start der App |
| Eigenschaften (Standard) | `kacheln` – Selektor der wischbaren Kacheln (Pflicht) · `aktionen` – `kachel => Einträge`, **dieselbe Funktion wie für das Kontextmenü** (Pflicht) · `durchwischen` (`true`) |
| Einträge | wie für `openMenu`: `{ icon, label, kurz, red, act }`; `'sep'` wird übergangen. `kurz` = das Wort unter der Kapsel (‚Einstellen‘), `label` = Name für VoiceOver (‚Reiselogbuch einstellen‘, APD-30/D-7). Eine leere Liste bedeutet: Kachel nicht wischbar (APD-30/D-11). |
| Aktion | `act({ anker, quelle: 'wischen' })` – `anker` = die Kapsel (die Sprechblase wächst aus ihr, APD-30/D-6). Gibt `act` ein Promise zurück, bleibt die Kachel offen, bis es erfüllt ist, und gleitet dann zurück. Sonst schließt sie sofort. Das Kontextmenü ruft `act()` wie heute ohne Angaben auf. |
| Nur lesen | `offen` – die offene Kachel oder `null` · `masse` – feste Werte: Kapsel 66 × 44, Abstand 8, offen ab 0,5 der Aktionsbreite, Durchwischen ab 0,6 der Kachelbreite, Entscheidung nach `NAV_ENTSCHEID` (10 px) und `NAV_WAAGRECHT` (1,2) |
| Methoden | `schliessen()` – schließt ohne Aktion · `entfernen()` – nimmt die Bean von der Liste (kein Wischen mehr) |
| Ereignisse | `on('offen', kachel => …)` · `on('zu', kachel => …)` – `on` gibt eine Funktion zum Abmelden zurück |
| CSS / Aufbau | nur unter `.ad-swipeactions…` (z. B. `.ad-swipeactions-kapsel`, `.ad-swipeactions-kapsel.rot`) · die Liste trägt `data-ad-bean="swipeactions"` |
| Messmodus | ‚wisch kandidat‘, ‚wisch verworfen dx dy‘, ‚wisch offen|durch|zurück gefedert|abgebrochen weg W‘ (wie bestätigt in APD-30/V-5) |
| Regeln | R-7.8 (neu), R-4.12, R-4.13, R-1.4, R-1.8 |
| Prüfung | `checkWischen` (Verhalten, W-1 bis W-71) und neu `checkBeans` (Schnittstelle, W-72 bis W-80) |
| Abschnitt | Designrichtlinie 15.4 ‚Wischaktionen‘ |

### 2.2 Was die Bean selbst erledigt – die App muss es nicht

Gesten und Entscheidung (Rollen gegen Wischen, langes Drücken), höchstens eine offene Kachel, Schließen bei Tippen, Rollen, Wischen an einer
anderen Kachel, Drehen und Esc. Sie schließt auch beim **Neuaufbau der Liste**: Sie hört an der Liste mit und merkt selbst, wenn die offene
Kachel ersetzt wurde – eine Methode `aktualisieren()` (Entwurf 0123) entfällt damit. Dazu kommen: gesperrt bei offenem Fenster, Menü oder offener
Sprechblase; ‚Bewegung reduzieren‘, Textgröße, VoiceOver und Tastatur (APD-30/D-7 bis D-9); Messmodus.

**Die App ruft nur:** die Fabrik einmal und `schliessen()` beim Ausblenden der Seitenleiste – das sieht die Bean nicht selbst.

### 2.3 Änderung gegenüber dem Entwurf aus 0123

- **Maße fest statt Eigenschaften:** Im Entwurf aus 0123 waren `offenBreite`, `einrasten`, `durchwischen` (als Zahl), `kapsel`, `entscheid` und
  `waagrecht` Eigenschaften. Vorschlag: Diese Werte sind **fest in der Bean** und nur lesbar (`masse`). Grund: Apple bietet sie nicht an [1][3],
  und R-1.1 verlangt gleiche Bedienung in allen Apps – einstellbare Schwellen würden die Apps auseinanderlaufen lassen. Die offene Breite ergibt
  sich aus der Zahl der Aktionen (bei zwei 162 px, APD-30/V-3). Für die Gegenprobe W-68 wird der Wert in der Prüfkopie geändert, nicht über
  die Schnittstelle.
- `durchwischen` ist jetzt ein Schalter (`true`/`false`) wie Apples `allowsFullSwipe`.
- Ereignis `aktion` entfällt: Die Aktion steckt im Eintrag (`act`), wie beim Menü.
- `aktualisieren()` entfällt (siehe 2.2).

### 2.4 So nutzt das Reiselogbuch sie (Skizze, nicht gebaut)

```js
// eine Liste für Kontextmenü und Wischaktionen (APD-30/D-1)
const tripAktionen = row => { const trip = getTrip(row.dataset.id); if (!trip) return []; return [
  { icon: 'settings', label: 'Reiselogbuch einstellen', kurz: 'Einstellen', act: () => { setOpener(…); openTripDialog(trip); } },
  'sep',
  { icon: 'trash', label: 'Reiselogbuch löschen', kurz: 'Löschen', red: true, act: w => deleteTrip(trip, w?.anker || row) },
]; };
const tripContextMenu = row => openMenu(row, tripAktionen(row), 'beside');
const wischen = createSwipeactions(side, { kacheln: '[data-id]', aktionen: tripAktionen });   // einmal beim Start
// in toggleSide beim Ausblenden: wischen.schliessen();
```

`deleteTrip` gibt schon heute ein Promise zurück: Die Kachel bleibt offen, bis in der Sprechblase entschieden ist (APD-30/D-6).

### 2.5 Ergänzung zur Testfall-Liste APD-30 – Abschnitt 9 ‚Schnittstelle‘ (Testfälle automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| W-72 | `checkBeans`: Liste der AD-Beans (Designrichtlinie 15) gegen `v4/ui.js` und `v4/design.css` | `createSwipeactions` vorhanden; Kennung nur einmal in der Liste; CSS der Bean nur unter `.ad-swipeactions…`; jede Fabrik in `ui.js`, die eine Bean ist, steht in der Liste |
| W-73 | `checkBeans`: Code des Reiselogbuchs (`index.html`) | nennt keine Klasse `.ad-swipeactions…` und keinen inneren Namen der Bean – nur `createSwipeactions`, die Eigenschaften, `offen`, `masse`, `schliessen`, `entfernen`, `on` |
| W-74 | Nach dem Start | die Liste (`#side`) trägt `data-ad-bean="swipeactions"` |
| W-75 | `createSwipeactions` ohne `kacheln` oder `aktionen`, oder ein Eintrag ohne `kurz` | Fehler ‚swipeactions: … fehlt‘ in der Konsole; die Liste bleibt bedienbar (Tippen öffnet, langes Drücken zeigt das Kontextmenü) |
| W-76 | Standardwert: ohne `durchwischen` über 60 % wischen; mit `durchwischen: false` dasselbe | ohne: Sprechblase wie W-17 · mit `false`: Kachel rastet offen ein, keine Sprechblase |
| W-77 | `offen` und Ereignisse: öffnen, schließen per Tippen, öffnen, Neuaufbau der Liste | `offen` = Kachel bzw. `null`; ‚offen‘ und ‚zu‘ je genau einmal pro Vorgang, auch beim Neuaufbau ‚zu‘ |
| W-78 | ‚Löschen‘ antippen | `act` bekommt `anker` = rote Kapsel und `quelle` = ‚wischen‘; die Kachel bleibt offen, bis das Promise erfüllt ist; nach ‚Abbrechen‘ gleitet sie zurück (wie W-14) |
| W-79 | `schliessen()` bei offener Kachel; danach `entfernen()` und wischen | schließt ohne Aktion, ‚zu‘ einmal · nach `entfernen()` bewegt sich keine Kachel, `data-ad-bean` ist weg, Tippen und Kontextmenü wie vorher |
| W-80 | Gegenprobe: in `index.html` eine Regel für `.ad-swipeactions-kapsel` einfügen | W-73 wird rot |

Die Prüfung `checkBeans` (in `doku.mjs`) ist ein erster Teil von APD-135/B-4 (öffentliche Namen als Liste mit Prüfung). Paket 6 baut sie später
für alle Beans aus.

## Quellen

1. Apple, SwiftUI `swipeActions(edge:allowsFullSwipe:content:)` – https://developer.apple.com/tutorials/data/documentation/swiftui/view/swipeactions(edge:allowsfullswipe:content:).md
2. Apple, SwiftUI `swipeActionsContainer()` – https://developer.apple.com/tutorials/data/documentation/swiftui/view/swipeactionscontainer().md
3. Apple, UIKit `UISwipeActionsConfiguration` – https://developer.apple.com/documentation/uikit/uiswipeactionsconfiguration.md
4. Apple, UIKit `UIContextualAction` – https://developer.apple.com/documentation/uikit/uicontextualaction.md
5. WebKit Bugzilla 182671 ‚Implementation (or not) of customized builtins (is="" attribute)‘ – https://bugs.webkit.org/show_bug.cgi?id=182671
6. MDN, globales Attribut `is` – https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/is

Seiten 1–4 gelesen am 17.11.2026. Der erste Abruf lief mit dem Helfer `web-fetch` auf **Haiku 5.5** (Aufwand mittel). Das widerspricht der Festlegung ‚Hilfsagenten nur mit Opus 5.5 und Aufwand hoch‘. Deshalb wurden alle Zitate mit **Opus 5.5, Aufwand hoch** noch einmal geprüft: alle bestätigt (zu [1]: ‚rot‘ steht dort zum Beispiel – ‚the delete action appears in red because it has the destructive role‘). Quellen 5 und 6 sind nur aus den Suchergebnissen belegt (Titel und Auszug). bugs.webkit.org ist im Netz dieser Umgebung gesperrt, die Seite selbst konnte nicht geöffnet werden.

## Nebenbefund `messung.mjs` (noch nicht im Backlog)

Nach dem Abruf meldet `messung.mjs` ‚⚠ Modell claude-opus-5-5‘, obwohl die Sitzung durchgehend mit Opus 5.5 läuft. Ursache: Das Werkzeug liest die
Zeilen der Hilfsagenten (`subagents/`) mit ein und nimmt die letzte Anlage ‚model‘ als ‚eingestellt‘ – das war die des Haiku-Helfers. Es fehlt die
Bedingung `!isSidechain` bei der Suche nach der Anlage (`werkzeug/messung.mjs`, APD-130/W-5). Folge: Fehlalarm nach jedem Hilfsagenten mit anderem
Modell. Ins Backlog frage ich im nächsten Fenster.

## Fragen

1. Schnittstelle `swipeactions` wie in 2.1 bis 2.4 bestätigen?
2. Maße fest in der Bean und nur lesbar, statt Eigenschaften (2.3)?
3. Ergänzung zur Testfall-Liste W-72 bis W-80 bestätigen?

## Antworten (17.11.2026)

1. Schnittstelle `swipeactions` 2.1 bis 2.4: **Ja**
2. Maße fest in der Bean, nur lesbar: **Ja**
3. Ergänzung W-72 bis W-80: **Ja** – eingetragen in `arbeit/APD-30 Wischaktionen Testfall-Liste.md`, Abschnitt 9
