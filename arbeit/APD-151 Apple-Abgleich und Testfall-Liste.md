# APD-151 – Stufen am iPhone: Apple-Abgleich, Schnittstelle, Testfall-Liste (Sitzung AppDesign 0005)

**27.11.2026** · Übergabe `arbeit/APD-149 Uebergabe.md` Abschnitt 3 Nr. 3 · Entscheidung APD-151/J-1 (Weg a: Muster im Entwurf). Noch kein Muster, kein Bau.
Die Nummern T-, F- und V- gelten nur in dieser Datei (außerhalb: APD-151/T-1 …).

## 1. Kurz

- **Heute** (R-4.6, 15.17): Am iPhone ist jedes Fenster ein Blatt ‚nur groß‘.
- **Vorschlag:** Ein Fenster kann am iPhone hoch **zwei Stufen** haben, ‚nach Inhalt‘ und ‚groß‘. Dann bekommt es einen Griff, und man kann es zwischen den Stufen ziehen.
- **Fenster zum Schreiben bleiben ‚nur groß‘.** Das sagt die HIG, das Vorbild sind Mail und Nachrichten.
- **Wo:** In der Vorführung bekommt ‚Anderes Fenster‘ die zwei Stufen. ‚Neuer Eintrag‘ und ‚Eintrag bearbeiten‘ bleiben groß.
- **Reiselogbuch:** Seine vier Fenster sind zum Schreiben bzw. groß: ‚Reiselogbuch einstellen‘, Tag, Fazit, Vorschau (`index.html`, `openDialog` an 4 Stellen). Ein kurzes Fenster hat es heute nicht.
  Die Stufen sind also zuerst für kurze Fenster künftiger Apps und Beans da.

## 2. So macht es Apple (Quellen dieser Sitzung, gelesen über die JSON-Fassungen von developer.apple.com)

**HIG ‚Sheets‘** (Stand 24.03.2026), https://developer.apple.com/design/human-interface-guidelines/sheets
- Q-1 „A resizable sheet expands when people scroll its contents or drag the grabber, which is a small horizontal indicator that can appear at the top edge of a sheet.“
- Q-2 „The system defines two detents: large is the height of a fully expanded sheet and medium is about half of the fully expanded height. Sheets can have one or more custom detent values.“
- Q-3 „Sheets automatically support the large detent. Adding the medium detent allows the sheet to rest at both heights …“
- Q-4 „In an iPhone app, consider supporting the medium detent to allow progressive disclosure of the sheet's content. For example, a share sheet displays the most relevant items within the medium detent … In contrast, you might not want to support the medium detent if a sheet's content is more useful when it displays at full height.“ Dazu: „the compose sheets in Messages and Mail display only at full height to give people enough room to create content.“
- Q-5 „Include a grabber in a resizable sheet. A grabber shows people that they can drag the sheet to resize it; they can also tap it to cycle through the detents. In addition to providing a visual indicator of resizability, a grabber also works with VoiceOver so people can resize the sheet without seeing the screen.“
- Q-6 „Support swiping to dismiss a sheet. … If people have unsaved changes in the sheet when they begin swiping to dismiss it, use an action sheet to let them confirm their action.“
- Q-7 „Designed for iPhone, detents specify particular heights at which a sheet naturally rests.“ Für das iPad: „Prefer using the page or form sheet presentation styles in an iPadOS app.“
- Auf der Seite steht **nichts** zur Tastatur und nichts zur Abdunkelung bei kleinen Stufen am iPhone.

**UIKit `UISheetPresentationController`** (iOS 15), https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller
- Q-8 `detents`: „The default value is an array that contains the value large(). … specify detents in order from smallest to largest height.“
- Q-9 `selectedDetentIdentifier`: „The default value is nil, which means the sheet displays at the smallest detent you specify in detents.“
- Q-10 `prefersGrabberVisible`: Standard `false`. „The system automatically hides the grabber at appropriate times, like when the sheet is full screen in a compact-height size class or when another sheet presents on top of it.“
- Q-11 `largestUndimmedDetentIdentifier`: „The default value is nil, which means the system adds a noninteractive dimming view underneath the sheet at all detents.“
- Q-12 `prefersScrollingExpandsWhenScrolledToEdge`: Standard `true`. „Scrolling up in the sheet increases its detent instead of scrolling the sheet's content. After the sheet reaches its largest detent, scrolling begins.“
- Q-13 `prefersEdgeAttachedInCompactHeight`: Standard `false`, „which means the sheet defaults to a full screen appearance at compact height.“ Und `medium()`: „… is inactive in compact height.“
- Q-14 `Detent.custom(identifier:resolver:)` (iOS 16): „The value you return from this closure is a height within the safe area of the sheet.“ Mit `invalidateDetents()` rechnet das Blatt die Stufe neu, wenn sich etwas ändert.

**SwiftUI** (iOS 16): Stufen sind `.medium`, `.large`, `.height(_:)`, `.fraction(_:)` und `custom`. **Eine Stufe ‚nach Inhalt‘ gibt es bei Apple nicht als Namen**, sie entsteht über eine eigene Stufe mit Höhe.
Q-15 `presentationContentInteraction`: „By default, when a person swipes up on a scroll view in a resizable presentation, the presentation grows to the next detent.“

**Liquid Glass** (die aktuelle Fassung des Systems, die Seite nennt keine Versionsnummer), https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
- Q-16 „Sheets feature an increased corner radius, and half sheets are inset from the edge of the display to allow content to peek through from beneath them. When a half sheet expands to full height, it transitions to a more opaque appearance …“

**Einordnung**
- Apples Standard ist ‚groß‘ (Q-3, Q-8). Kleinere Stufen sind für das iPhone gedacht (Q-7), am iPad bleibt das Formblatt.
- Für kurze Inhalte passt eine eigene Stufe mit der Höhe des Inhalts (Q-2, Q-14).
- Mehrere Stufen heißen immer: Griff (Q-5), Ziehen und Wischen nach oben wechseln die Stufe (Q-1, Q-12), Antippen des Griffs wechselt reihum (Q-5), und der Griff ist für VoiceOver bedienbar (Q-5).
- Quer (geringe Höhe) gibt es nur die volle Höhe, ohne Griff (Q-10, Q-13). Das passt zu R-4.6: quer volle Höhe.
- **Abweichungen bzw. ohne Apple-Quelle:**
  - F-1: Was die Tastatur mit einer kleinen Stufe macht, steht bei Apple nicht.
  - F-2: Ob die Seite dahinter bei der kleinen Stufe zurückweicht, steht dort auch nicht. Meine Vermutung: Sie weicht nur bei ‚groß‘ zurück.
  - F-3: Den Abstand vom Rand nennt Q-16 ohne Maße.
  - Für F-2 und F-3 helfen Vergleichsbilder (Abschnitt 6).

## 3. Vorschlag Schnittstelle (`presentation`, Art `sheet`)

```js
const h = AD.presentation.present('sheet', html, { command, detents: ['fit-content', 'large'], selectedDetent: 'fit-content', dirty, shouldDismiss });
h.detent;                       // 'fit-content' | 'large' – die Stufe jetzt
h.detent = 'large';             // wechselt mit Gleiten (wie animateChanges)
h.on('detent', e => …);         // { detent } nach jedem Wechsel (Ziehen, Griff, Tastatur)
```

| Teil | Vorbild | Standard | Bedeutung |
|---|---|---|---|
| `detents` | UIKit `detents`, SwiftUI `presentationDetents` | `['large']` | Stufen von klein nach groß; heute `'fit-content'` und `'large'` |
| `'fit-content'` | CSS `fit-content` (Web zuerst, 1 ‚Code englisch‘) | – | Höhe nach Inhalt: Kopf und Inhalt ganz, höchstens ‚groß‘ |
| `selectedDetent` | UIKit `selectedDetentIdentifier` | die kleinste (Q-9) | Stufe beim Öffnen |
| `h.detent`, Ereignis `detent` | `selectedDetentIdentifier`, Delegate `…DidChangeSelectedDetentIdentifier` | – | lesen, setzen, melden |
| Griff | HIG Q-5, `prefersGrabberVisible` | **keine Option:** immer bei mehr als einer Stufe | Q-5 verlangt ihn, Q-10 blendet ihn aus, wo nur eine Stufe gilt |

- **Nicht jetzt:** `'medium'` (halbe Höhe), Blatt ohne Abdunkelung (`largestUndimmedDetentIdentifier`) und eine Option ‚Rollen vor Wachsen‘. Die kommen erst, wenn eine App sie braucht.
- **Am iPad** wirken `detents` nicht, das Fenster bleibt das Formblatt wie heute (Q-7). Am iPhone quer gilt nur ‚groß‘, ohne Griff (Q-10, Q-13). Beim Zurückdrehen auf hoch kommt die Stufe von vorher wieder.
- **Ist der Inhalt höher als ‚groß‘,** gilt nur ‚groß‘, ohne Griff. Ändert sich der Inhalt, rechnet das Blatt seine Höhe neu und gleitet hin (wie `invalidateDetents`).

**Verhalten** (am iPhone hoch, mit zwei Stufen):
- **Öffnen:** gleitet von unten bis zur Stufe beim Öffnen (R-1.12).
- **Ansicht ‚nach Inhalt‘:** Die Seite dahinter bleibt groß und dunkelt mit 30 % ab (F-2, Q-11). Oben in der Mitte sitzt der Griff.
- **Ansicht ‚groß‘:** wie heute. Die Seite weicht verkleinert zurück, der Griff bleibt.
- **Ziehen** am Kopf, am Griff oder im Inhalt, wenn dieser ganz oben steht (wie heute). Das Blatt folgt dem Finger.
  - Beim Loslassen zählt der Auslaufpunkt (Tempo × 400 ms). Das Blatt geht zur nächsten Stufe oder schließt, wenn es näher am unteren Rand ist als an ‚nach Inhalt‘.
  - Über ‚groß‘ hinaus wirkt ein Gummiband.
- **Wischen nach oben im Inhalt bei ‚nach Inhalt‘:** Das Blatt wird groß (Q-12, Q-15). Erst danach rollt der Inhalt.
- **Griff antippen** wechselt reihum zwischen ‚nach Inhalt‘ und ‚groß‘ (Q-5).
- **Mit Änderungen:** Zwischen den Stufen geht es frei. Unter ‚nach Inhalt‘ zieht es zäh, federt zurück und fragt am x (Q-6, R-4.4).
- **Feld antippen bei ‚nach Inhalt‘:** Das Blatt wird groß, das Feld steht über der Tastatur (R-4.5). Das ist F-1 und **ohne Apple-Quelle**, darum Frage 3.
- **Abdunkelung antippen und Escape** wirken wie x (R-4.6).
- **VoiceOver:** Der Griff ist eine Schaltfläche ‚Größe ändern‘ mit `aria-expanded` (false bei ‚nach Inhalt‘, true bei ‚groß‘). Doppeltippen wechselt die Stufe (Q-5).
- **Bewegung reduzieren:** Öffnen blendet über, ein Stufenwechsel steht sofort am Ziel, das Ziehen folgt weiter dem Finger (R-1.9).

**Technik im Muster:**
- Der Entwurf setzt die Stufen auf das Blatt aus `v4/` auf, **ohne `v4/` zu ändern**.
- Solange ein Blatt mit zwei Stufen offen ist, stellt der Entwurf den Versatz des Blatts (`blattY`) auf die Stufe ‚nach Inhalt‘ und entscheidet beim Loslassen zwischen den Stufen.
- Jedes andere Fenster läuft unverändert über `v4/`.
- In `v5/` wird das dann in die Bean selbst eingebaut.

## 4. Testfall-Liste (0 Nr. 1)

Testfälle (automatisch) in `arbeit/APD-149/muster-pruefen.mjs`, in Chromium und WebKit (Safari-Modell). Nach jedem Schritt gelten die Grundregeln (`pruefe.mjs` schritt, `hig.mjs`).
Gerät iPhone hoch, hell, wenn nichts anderes steht. Vorführung `katalog/index.html#presentation`, ‚Anderes Fenster‘ mit `['fit-content', 'large']`.

| Nr. | Gerät · Lage | Handlung | Erwartet |
|---|---|---|---|
| T-1 | iPhone hoch | ‚Bearbeiten‘ → ‚Anderes Fenster öffnen‘ | Blatt in der Stufe ‚nach Inhalt‘: Kopf und Inhalt ganz sichtbar, Unterkante am unteren Rand, Oberkante = Rand − Höhe des Inhalts; Griff oben mittig; Seite nicht verkleinert, Abdunkelung 30 %; Öffnen mit der Feder (R-1.12); Ereignis `detent` nicht, `h.detent` = ‚fit-content‘ |
| T-2 | iPhone hoch | am Griff bzw. Kopf langsam nach oben ziehen, loslassen über der Mitte | folgt dem Finger, dann ‚groß‘ (Oberkante wie heute), Seite weicht zurück; Ereignis ‚Stufe large‘ |
| T-3 | iPhone hoch | von ‚groß‘ kurz nach unten ziehen | zurück auf ‚nach Inhalt‘, nicht zu |
| T-4 | iPhone hoch | von ‚groß‘ schnell weit nach unten wischen | zu wie x (Ereignis ‚Fenster zu‘, reason user) |
| T-5 | iPhone hoch | bei ‚nach Inhalt‘ nach unten ziehen über die Mitte zum Rand | zu wie x |
| T-6 | iPhone hoch | bei ‚nach Inhalt‘ kurz nach oben schnippen | ‚groß‘ (Auslaufpunkt) |
| T-7 | iPhone hoch | über ‚groß‘ hinaus nach oben ziehen | Gummiband, nach dem Loslassen ‚groß‘ |
| T-8 | iPhone hoch | im Inhalt nach oben wischen bei ‚nach Inhalt‘ | ‚groß‘, der Inhalt rollt dabei nicht (Q-12) |
| T-9 | iPhone hoch | Griff antippen, nochmals antippen | ‚groß‘, dann ‚nach Inhalt‘; je Ereignis `detent` |
| T-10 | iPhone hoch | Titel ändern, dann von ‚groß‘ auf ‚nach Inhalt‘ und weiter nach unten ziehen | zwischen den Stufen frei; unter ‚nach Inhalt‘ zäh, federt zurück, Sprechblase am x (R-4.4) |
| T-11 | iPhone hoch | bei ‚nach Inhalt‘ das Feld ‚Titel‘ antippen (Safari-Modell Tastatur) | ‚groß‘, Feld über der Tastatur (R-4.5), Kopf steht still (`checkTastaturStill`) |
| T-12 | iPhone hoch → quer → hoch | bei ‚nach Inhalt‘ drehen | quer volle Höhe ohne Griff, offen; zurück auf hoch wieder ‚nach Inhalt‘ (R-4.6, R-8.1) |
| T-13 | iPhone hoch | Inhalt wächst (Zeile einblenden) bzw. wird höher als ‚groß‘ | Stufe folgt dem Inhalt mit Gleiten; höher als ‚groß‘: nur ‚groß‘, kein Griff |
| T-14 | iPhone hoch | Abdunkelung antippen; Escape | wie x |
| T-15 | iPhone hoch | ‚Neuer Eintrag‘ (nur ‚groß‘) | wie heute: kein Griff, `checkSheet` B1–B24 unverändert grün |
| T-16 | iPad quer und hoch | ‚Anderes Fenster‘ | Formblatt wie heute, kein Griff, `detents` wirken nicht (APD-72/D-1 bis D-21 grün) |
| T-17 | iPhone hoch | VoiceOver-Baum: Griff | Schaltfläche ‚Größe ändern‘, `aria-expanded` false/true je Stufe; Fokus beim Öffnen wie heute (R-1.8) |
| T-18 | iPhone hoch | ‚Bewegung reduzieren‘ | Öffnen blendet über; Griff antippen: sofort am Ziel; Ziehen folgt dem Finger (R-1.9) |
| T-19 | iPhone hoch | Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein, 5 s warten | Stufe bleibt, Stapel ‚sheet‘ (APD-150) |
| T-20 | iPhone hoch | im Blatt ‚nach Inhalt‘ ein Hinweisfenster; dann Fenster ersetzen (H-3) | Blatt bleibt in seiner Stufe unter dem Hinweisfenster; das neue Blatt öffnet in seiner eigenen Stufe |
| T-21 | iPhone hoch | `h.detent = 'large'` aus der App | gleitet auf ‚groß‘, Ereignis `detent` |
| T-22 | Gegenprobe | Stufen abgeschaltet (`__adPresentationGegenprobe = 'stufen'`) | T-1, T-2 und T-9 werden rot |

**Testfälle (User), nur am Gerät** (kommen mit dem Muster als Schritte zum Ausprobieren, Bericht 0 Nr. 11):
- Ziehgefühl und Federn zwischen den Stufen
- Griff antippen
- Tastatur bei ‚nach Inhalt‘
- VoiceOver am Griff
- Aussehen neben einem Apple-Blatt (Teilen-Blatt)

## 5. Entscheidungen (Fenster)

1. **Schnittstelle und Testfall-Liste** wie in Abschnitt 3 und 4?
2. **Name der Stufe ‚nach Inhalt‘:**
   - a) `'fit-content'` (Empfohlen: nach 1 ‚Code englisch‘ geht das Vorbild aus dem Web vor, CSS `fit-content`)
   - b) `'fit'` (kürzer, ohne Vorbild)
3. **Feld antippen bei ‚nach Inhalt‘ (F-1):**
   - a) Das Blatt wird groß (Empfohlen: Zum Schreiben nennt Apple die volle Höhe, und R-4.5 bleibt wie heute)
   - b) Das Blatt wandert mit der Tastatur nach oben und bleibt klein
4. **Vergleichsbilder (2.6)** für F-2 und F-3: am iPhone hoch, z. B. in Fotos ein Foto → Teilen (ein Blatt mit halber Höhe), 1. das Blatt halb offen, 2. dasselbe Blatt nach oben gezogen.
   Daraus lese ich den Abstand vom Rand, die runden Ecken, die Abdunkelung und ob die Seite zurückweicht.
   Ohne Bilder baue ich ‚nach Inhalt‘ ohne Abstand vom Rand wie heute und nenne das als Abweichung.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
