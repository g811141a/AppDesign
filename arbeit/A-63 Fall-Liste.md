# A-63 Paket C – sichere Ränder, Suche ohne Akzente, ⓧ in Feldern, Safaris Schalter

**Stand 22.10.2026** · Sitzung ‚Reiselogbuch 0028‘ · aus A-38 (T-39/V1, T-31, T-28, T-26) · ohne Muster (Nutzer 22.10.2026)
· gebaut in AppDesign 4.29.0 / Reiselogbuch 3.27.0 mit A-41 und A-42 (Nutzer 22.10.2026: Ja, Schalter Weg b, als allgemeine
Regeln R-1.7, R-2.3, R-5.6, R-5.7) · Prüfpunkt P-63

## 1. Apple-Abgleich

| Teil | So macht es Apple | Heute bei uns (4.28.2) | Vorschlag |
|---|---|---|---|
| **C1 Sichere Ränder** | Kein Bedienelement liegt unter der Dynamic Island, den Ecken oder der Home-Leiste; Inhalt darf darunter durchrollen ([HIG – Layout](https://developer.apple.com/design/human-interface-guidelines/layout)) | wird beachtet, aber direkt an 42 Stellen in 24 Zeilen `design.css` (`env(safe-area-inset-…)`); die Prüfbrowser liefern dafür immer 0 → **nie geprüft** | Variablen `--safe-top/-bottom/-left/-right` an einer Stelle, Prüfung setzt echte Werte |
| **C2 Suche ohne Akzente** | Notizen, Mail, Kontakte, Fotos suchen ohne Rücksicht auf Akzente und Groß/klein: ‚Zurich‘ findet ‚Zürich‘ und umgekehrt | Groß/klein egal, Akzente zählen mit | Vergleich ohne Akzente, Markierung trifft das ganze Wort ‚Zürich‘ |
| **C3 ⓧ in einzeiligen Feldern** | Textfelder zeigen beim Bearbeiten rechts ein graues ⓧ, sobald etwas drinsteht; Antippen leert, Cursor und Tastatur bleiben (Kontakte, Einstellungen; UIKit `clearButtonMode = .whileEditing`, [HIG – Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)); mehrzeilige Felder haben keins | nur im Suchfeld | dasselbe ⓧ wie im Suchfeld, in allen einzeiligen Textfeldern |
| **C4 Schalter** | Knopf gleitet federnd, lässt sich ziehen, Haptik beim Umschalten, VoiceOver ‚Schalter, ein‘; iOS 26 zeichnet ihn neu (Liquid Glass) ([HIG – Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)) | eigener Schalter 51 × 31 (Größe bis iOS 18), Knopf springt, nicht ziehbar, keine Haptik, VoiceOver hört ‚Kontrollkästchen‘ | Safaris eingebauter Schalter `<input type="checkbox" switch>` (seit Safari 17.4, Haptik seit Safari 18) – Variante b unten |

Quellen zu C4: [WebKit – Features in Safari 18.0](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/) (Haptik),
[Open UI – Switch-Attribut](https://open-ui.org/components/switch.attribute.explainer/), [WebKit-Commit: VoiceOver sagt
‚Schalter‘](https://github.com/WebKit/WebKit/commit/182eb50c5c0561444510e2e0c60c3dc72c2eb51f).

**Betroffen:** HIG-Checkliste (16) Layout, Text fields, Toggles · Katalog R-2.3 (Suche), R-5.x (Eingaben), R-3.3 (Grün nur für
Schalter), G-18 (Schalter 51 × 31) · Designrichtlinie 13 (Safari), 15.2, 15.11, 15.15.

## 2. Was die Nachstellung von 4.28.2 schon zeigt (Probe dieser Sitzung)

4.28.2 mit echten Rändern nachgestellt (in `design.css` jedes `env()` durch Werte ersetzt), Chromium und WebKit, Startliste,
Reiselogbuch, Suche, Fenster ‚Tag‘:

- **iPhone hoch und quer:** kein fest stehendes Bedienelement unter Aussparung oder Home-Leiste – die Ränder stimmen heute.
- **iPad quer, Fenster:** das Fenster hält oben und unten nur **10 px** Abstand (`--dlg-max` = Höhe − 20). Die Home-Leiste am
  iPad ist 20 px hoch → die unteren 10 px des Fensters (Smiley-Leiste, ‚Standard-Smileys wiederherstellen‘) liegen unter der
  Home-Leiste. Neuer Fund, wird mit C1 behoben (Fall S-6).
- **Dein iPhone** (aus den Messungen vom 19./20.10.): 402 × 874 (iPhone 16 Pro / 17 Pro), Home-Bildschirm, Statusleiste über der
  App (Fensterhöhe 812 statt 874) → oben vermutlich 0, unten 34; quer links/rechts 62, unten 20. Die echten Werte kennt nur das
  Gerät – deshalb kommen sie künftig in den Kopf jeder Messung (Fall S-8).

## 3. Fall-Liste (jeder Fall ein automatischer Test; danach gelten die Grundregeln)

### C1 Sichere Ränder (V1)

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| S-1 | `design.css`: `:root { --safe-top: env(safe-area-inset-top, 0px); … }` – sonst nirgends `env(safe-area` (auch nicht in der App) | genau 4 Stellen | `doku.mjs` (`checkDocs`, R-1.7) |
| S-2 | iPhone hoch, Prüfwerte oben 62 / unten 34 – Startliste, Reiselogbuch, Suche offen, Fenster ‚Tag‘, Einstellungen, Menü, Sprechblase | kein fest stehendes Bedienelement (Knopf, Feld, Titel, Kapsel, Kopfzeile) schneidet die Zonen; Inhalt darf darunter rollen | `hig.mjs` (neu `safe`) in jeder Ansicht |
| S-3 | iPhone quer, links/rechts 62 / unten 20 | Kopfzeile, Suchzeile, Fensterkopf, Kapsel ‚Nach oben‘, Backup-Kachel beginnen rechts/links der Aussparung | wie S-2 |
| S-4 | iPad hoch und quer, oben 24 / unten 20; Seitenleiste angedockt und als Seite | wie S-2 | wie S-2 |
| S-5 | Tastatur offen (Safari-Modell), iPhone hoch und quer | Kapsel und Leisten wie bisher (`--vv-bottom` statt Home-Leiste) | `kapsel-iphone.mjs`, `checkFab` |
| S-6 | **iPad, Fenster** | oben und unten mindestens `max(10px, sicherer Rand)` Abstand – nichts unter der Home-Leiste | `safe` (rot gegen 4.28.2) |
| S-7 | Drehen hoch ↔ quer mit offenem Fenster und offener Suche | Ränder wechseln mit, Grundregeln (oberster Eintrag bleibt) | `safe` in beiden Lagen jeder Ansicht (hig.mjs misst quer und hoch) |
| S-8 | Messmodus: Kopfzeile nennt die vier Ränder (z. B. ‚Ränder 0/34/0/0‘) | Werte stehen im Kopf | `messung`-Prüfung im Ablauf |
| S-9 | **Gegenprobe:** Prüfwerte über `--safe-*` gesetzt, 4.28.2 nutzt sie nicht | gegen 4.28.2 rot (Kopfzeile iPhone quer beginnt bei 16 statt 62 px, S-6) | `--gegenprobe` |
| Gerät | Dynamic Island, Ecken, Home-Leiste am iPhone hoch/quer und iPad | nichts verdeckt | Prüfliste |

### C2 Suche ohne Akzente (T-31)

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| A-1 | Suche ‚Zurich‘ in einem Reiselogbuch mit ‚Zürich‘ | Treffer, ‚Zürich‘ ganz gelb markiert, ‚1 von 1‘ | `checkSearchWords` erweitert |
| A-2 | ‚Zürich‘ findet ‚Zurich‘ und ‚ZÜRICH‘ | Treffer in beiden Richtungen, Groß/klein egal wie bisher | wie A-1 |
| A-3 | ‚Sao Paulo‘ findet ‚São Paulo‘; ‚cafe creme‘ findet ‚Café Crème‘ (zwei Wörter, beide markiert) | wie A-1 | wie A-1 |
| A-4 | „Sao Paulo“ in Anführungszeichen (genaue Wortfolge) | findet ‚São Paulo‘, nicht ‚Paulo … São‘ | wie A-1 |
| A-5 | zentrale Liste (Lupe im Kopf): ‚Zurich‘ | Kachel ‚N Treffer‘, Öffnen mit gefüllter Suche, gleiche Zahl | `checkListSearch` |
| A-6 | langes Wort mit Umbruchstelle (R-6.3) und Akzent | Markierung ohne Lücke | wie A-1 |
| A-7 | Emojis mit Variante (☀️, 🙂) und Zeichen wie & < > | unverändert gefunden und markiert, kein kaputtes HTML | wie A-1 |
| A-8 | ‚ß‘, ‚ø‘, ‚æ‘ sind eigene Buchstaben (kein Akzent) | ‚Strasse‘ findet ‚Straße‘ **nicht**, wie bisher | wie A-1 |
| A-9 | Suche beim Tippen | Feld bleibt dasselbe mit Fokus, Sprung nach 0,5 s wie bisher (R-2.3) | bestehende Prüfungen |

### C3 ⓧ in einzeiligen Feldern (T-28)

Im Reiselogbuch: Titel, Teilnehmer, Ort, Quartier (mit Vorschlagsliste) und Kosten. Nicht: mehrzeilige Felder, Datum, Suchfelder
(haben ihr ⓧ schon). Ein Baustein in `ui.js`/`design.css` für alle `input[type=text]` (abschaltbar mit `data-noclear`).

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| X-1 | Feld mit Text antippen | ⓧ rechts im Feld, grau wie im Suchfeld, Antippfläche 44 × 44, Text läuft nicht darunter | `ablauf.mjs` (neu `checkClear`) |
| X-2 | ⓧ antippen | Feld leer, Cursor und Tastatur bleiben, ⓧ verschwindet; die App erfährt die Änderung (Häkchen blau, Kosten neu gerechnet) | `checkClear` |
| X-3 | leeres Feld bzw. Feld ohne Fokus | kein ⓧ | `checkClear` |
| X-4 | Pflichtfeld (Titel) mit ⓧ leeren | Fehlermeldung wie beim Löschen per Taste (R-5.3) | `checkFieldErrors` erweitert |
| X-5 | Kosten (rechtsbündig) | ⓧ rechts, Betrag rückt nach links; nach dem Verlassen ‚,00‘ wie bisher | `checkClear` |
| X-6 | Quartier mit Vorschlagsliste | ⓧ und Vorschläge stören sich nicht | `checkClear`; Gerät |
| X-7 | iPhone hoch/quer, Feld unten im Fenster, Tastatur offen, im Fenster rollen | ⓧ bleibt im Feld (rollt mit), Feld bleibt über der Tastatur (R-4.5) | `checkClear` mit Safari-Modell |
| X-8 | Drehen mit Fokus im Feld | ⓧ bleibt am Feld | `checkClear` |
| X-9 | Abbrechen (x) nach Leeren | Fenster schließt ohne Änderung wie bisher | bestehende Prüfungen |
| Gerät | Gefühl beim Antippen, Tastatur bleibt offen | | Prüfliste |

### C4 Safaris Schalter (T-26)

Die Prüfbrowser kennen den eingebauten Schalter nicht (Probe dieser Sitzung: Chromium und WebKit der Prüfumgebung zeigen ein
Kontrollkästchen) – Aussehen, Gleiten, Ziehen und Haptik zeigt nur das Gerät.

- **a) eigenes Aussehen behalten** (51 × 31, Grün) und nur `switch` + `role="switch"` ergänzen: VoiceOver sagt ‚Schalter‘; ob
  Haptik und Ziehen mit eigenem Aussehen bleiben, ist offen (WebKit schaltet mit `appearance: none` das Systemaussehen ab).
- **b) Safaris Schalter, wo es ihn gibt (Empfehlung):** Safari zeichnet den Systemschalter selbst – gleitet, ziehbar, Haptik,
  ‚Schalter‘, und auf iOS 26 automatisch im neuen Aussehen; Farbe ein = `--sw-on` über `accent-color`. Wo es ihn nicht gibt
  (Prüfbrowser, ältere Safaris), bleibt unser Schalter wie heute. Erkannt wird das in `ui.js` (`'switch' in
  HTMLInputElement.prototype`), nicht über CSS (`::thumb` ist in Safari noch hinter einem Schalter).

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| W-1 | alle `label.check.sw input` (Reiselogbuch: 4 in ‚Reiselogbuch bearbeiten‘) | Attribut `switch` und `role="switch"` | `hig.mjs` |
| W-2 | Antippen von Text oder Schalter, Tastatur (Leertaste) | schaltet um, App erfährt es (Häkchen blau) | bestehende Prüfungen |
| W-3 | gesperrt | 40 % Deckkraft, schaltet nicht | `hig.mjs` |
| W-4 | Prüfbrowser (kein eingebauter Schalter) | Aussehen wie heute 51 × 31, Grün/Grau, hell und dunkel | `hig.mjs` (G-18), Pixelvergleich |
| W-5 | mit eingebautem Schalter (in der Prüfung nachgebildet: Klasse gesetzt) | kein eigenes Zeichnen (`appearance` nicht `none`), `accent-color` = `--sw-on` | `hig.mjs` |
| Gerät | iPad und iPhone, hell/dunkel: Aussehen, Gleiten, Ziehen, Haptik, VoiceOver ‚Schalter, ein‘ | | Prüfliste |

## 4. Gleich mitgebaut (A-41, A-42 – Regeln)

- **A-41** Zusammenarbeit 2.18.0: Übergabe ab etwa 300.000 Token (0 Nr. 13), Hilfsagenten/Sitzungen parallel, wenn möglich und
  sinnvoll (0 Nr. 2), 2.1 präzisiert (ein Auswahlfenster je Antwort, Erklärung davor).
- **A-42** Designrichtlinie 1: Grundsatz ‚kein UI-Framework‘ (reines HTML, CSS, JavaScript; Ideen einzeln übernehmen).

## 5. Neue allgemeine Regeln (Katalog, 0 Nr. 3/4) – entschieden 22.10.2026

- R-1.7 **Sichere Ränder nur über `--safe-*`**, geprüft mit Gerätewerten (S-1 bis S-9).
- R-2.3 ergänzt: **Suche ohne Akzente** (A-1 bis A-9).
- R-5.6 **ⓧ in einzeiligen Feldern** (X-1 bis X-9).
- R-5.7 **Safaris Schalter**, sonst 51 × 31 (W-1 bis W-5); G-18 ohne Schaltergröße.

## 6. Beim Bau gefunden

- Die Prüfung `safe` fand am iPhone quer zwei weitere Stellen: das Menü der Startliste lag rechts in der Aussparung, die
  Sprechblase ‚Backup laden‘ 8 px unter der Home-Leiste. Behoben: Menüs, Untermenüs und Sprechblasen halten mindestens die sicheren
  Ränder ein (`rand12` in ui.js).
- Das ⓧ hing anfangs am Bezugsrahmen `#app` statt am Rahmen des Feldes und rollte nicht mit (gefunden von X-7/X-2 bei
  ‚Gesamtausgaben‘); ein Neuaufbau (`setHtml`) nahm den Bezug wieder weg. Behoben: der Rahmen um das Feld wird bei jedem Zeigen
  Bezugsrahmen.
- WebKit meldete eine ResizeObserver-Schleife (das ⓧ ändert den Innenabstand des Feldes) – behoben (Rahmengröße, nächstes Bild).
- Gegenprobe: gegen 4.28.2 rot (iPad-Fenster 14 px unter Statusleiste und 10 px unter Home-Leiste bei Prüfwerten 24/20,
  Schalter ohne `switch`, kein ⓧ, Suche mit Akzenten), gegen 4.29.0 grün.
