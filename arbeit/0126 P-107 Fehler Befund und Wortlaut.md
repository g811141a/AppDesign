# P-107 Fehler F-1 bis F-4 – Apple-Abgleich, Ursachen, Testfälle, Wortlaut (Sitzung 0126)

**Stand 17.11.2026** · Grundlage `arbeit/0125 Usertest P-107 Befund.md` · Ziel: **AppDesign 4.60.1 mit Reiselogbuch 3.57.1** (Fehlerbehebung, voll)

## 1. Apple-Abgleich

- **Vorgabe ist deine Beobachtung in Notizen (P-107):** Beim Aufwischen erscheint zuerst ‚Löschen‘ ganz außen, blendet ein und wächst bis zur vollen
  Größe. Erst dann erscheint die nächste Kapsel. Beim Zurückwischen geht es genau umgekehrt, und dabei rückt nichts über die Seitenleiste hinaus.
- **HIG – Accessibility, Abschnitt Motion** (developer.apple.com/design/human-interface-guidelines/accessibility, gelesen 17.11.2026): *„When this
  setting is active, ensure your app or game responds by reducing automatic and repetitive animations, including zooming, scaling, and peripheral
  motion.“* Dazu: *„Tracking animations directly with people’s gestures“* und *„Replacing transitions in x-, y-, and z-axes with fades to avoid motion“*.
  Daraus folgt für ‚Bewegung reduzieren‘: Die Kachel folgt weiter dem Finger. Die Kapseln wachsen nicht und rücken nicht herein, sie blenden nur ein
  und aus.
- **HIG – Typography** (gelesen 17.11.2026): *„Make sure your app’s layout adapts to all font sizes“* und *„Increase the size of meaningful interface
  icons as font size increases.“* Daraus folgt: Die Kapseln samt Symbol wachsen mit der Textgröße wie die übrigen Schaltflächen (`--fb`).
- Zu den Wischaktionen selbst (Reihenfolge, Ablauf) habe ich in der HIG (Lists and tables) keine Aussage gefunden. Es bleibt bei deiner Beobachtung.
- **Katalog:** R-7.8 (Wischaktionen), R-1.13 (AD-Beans), R-1.10 (Textgröße), R-1.12 (Gleiten: Kurve und Dauer bleiben gleich).
- **HIG-Checkliste (16):** Bewegung reduzieren, Textgröße, Treffer mindestens 44 pt (bleibt erfüllt, wächst mit).

## 2. Ursachen und Behebung

| Fehler | Ursache in 4.60.0 | Behebung (in Arbeit, nicht gebaut) |
|---|---|---|
| P-107/F-1 | `bild()` ließ alle Kapseln gleichzeitig von 50 auf 100 % wachsen | Jede Kapsel hat ihren Startpunkt von außen. Sie wächst von 0 auf 100 % und blendet ein, während die Kachel ihren Platz freigibt. Die nächste beginnt erst danach |
| P-107/F-2 | Beim Zurückwischen rückten die Kapseln nach rechts heraus (‚Löschen‘ bis 395 px, Seitenleiste bis 363 px). In der Nachbildung schnitt der Kasten sie ab, am Gerät ragten sie hinaus | Jede Kapsel steht rechts bündig an ihrem Platz, ihre linke Kante geht mit der Kachel. Beim Gleiten laufen Zwischenbilder entlang des Wegs, damit es auch dann nacheinander geht |
| P-107/F-3 | Mit ‚Bewegung reduzieren‘ wuchsen die Kapseln zwar nicht, rückten aber weiter von rechts herein (sah wie Gleiten und Wachsen aus) | Mit ‚Bewegung reduzieren‘ steht jede Kapsel an ihrem Platz in voller Größe und blendet nur ein |
| P-107/F-4 | Kapseln fest 66 × 44 in design.css | 66 × 44 mal `--fb` wie die Schaltflächen der Leisten (AX5: 89 × 60), das Symbol wächst mit (`--k`) |

In der Nachbildung (WebKit, iPad quer) erscheint jetzt zuerst ‚Löschen‘ (bei 80 px ganz da), danach ‚Einstellen‘. Beim Zurückwischen vergeht zuerst
‚Einstellen‘, dann ‚Löschen‘. ‚Löschen‘ steht dabei fest bei 339 px, innerhalb der Seitenleiste (Rand 363 px). Das ist in der Nachbildung behoben und
am Gerät zu bestätigen.

## 3. Testfälle (automatisch) W-81 bis W-90

Stehen in `arbeit/APD-30 Wischaktionen Testfall-Liste.md` (Nachtrag P-107), mit der Begründung, warum die Prüfung die Fehler übersah. Kurz:
W-81 nacheinander auf · W-82 zurück umgekehrt · W-83 beim Gleiten · W-84 nichts rechts hinaus · W-85 ‚Bewegung reduzieren‘ ohne Herausrücken und
Wachsen · W-86 mit der Textgröße · W-87 bis W-90 Gegenproben.

**Ergebnisse dieser Sitzung (`ablauf-wischen` mit dem Arbeitsstand `v4`):**
- **Gegen 4.60.0** (Chromium, iPad und iPhone) sind W-81 bis W-86 rot. Die Prüfung zeigt also P-107/F-1 bis F-4.
- **Mit der Behebung** gibt es keine Fehler: Chromium iPad und iPhone, WebKit alle Ansichten.
- **Gegenproben** (Chromium, iPad):
  - W-87 → W-81, W-82 und W-83 rot;
  - W-88 → W-85 rot;
  - W-89 → W-84 rot;
  - W-90 → W-86 rot.

## 4. Wortlaut alt und neu (0 Nr. 29)

### P-107/V-1 – Katalog R-7.8 (Designrichtlinie allgemein 17)

**Alt (Auszug):**
> … als Kapseln mindestens 66 × 44 mit Symbol und dem Wort darunter (wächst mit der Textgröße, nie abgeschnitten); nichts ragt aus Seitenleiste oder
> Bild. Die Kachel folgt dem Finger, bleibt ab halber Aktionsbreite offen, sonst federt sie zurück; beim Zurückwischen werden die Kapseln kleiner und
> blasser. … ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, alles Übrige ohne Gleiten und ohne Größenänderung; je Bild nur transform und opacity

**Neu:**
> … als Kapseln 66 × 44 mit Symbol und dem Wort darunter (Kapsel, Symbol und Wort wachsen mit der Textgröße wie die Schaltflächen der Leisten, das
> Wort nie abgeschnitten); nichts ragt aus Seitenleiste oder Bild. Die Kachel folgt dem Finger, bleibt ab halber Aktionsbreite offen, sonst federt sie
> zurück; die Kapseln erscheinen nacheinander von außen – jede wächst aus dem frei werdenden Platz und blendet ein, die nächste erst, wenn sie ganz da
> ist –, beim Zurückwischen und Gleiten genau umgekehrt; keine rückt dabei über ihren Platz hinaus. … ‚Bewegung reduzieren‘: die Kachel folgt dem
> Finger, die Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein und aus; je Bild nur transform und opacity

### P-107/V-2 – 15.4 ‚Wischaktionen‘ (Designrichtlinie allgemein)

**Alt (Auszug):**
> … als **Kapseln** (66 × 44, links und rechts rund, Abstand 8 px, deckend) mit Symbol, darunter klein das Wort (11 pt, z. B. ‚Einstellen‘,
> ‚Löschen‘) – ‚Löschen‘ rot und ganz außen. Die Kachel folgt dem Finger; ab halber Aktionsbreite bleibt sie offen (bei zwei Aktionen 162 px), sonst
> federt sie zurück. Beim Zurückwischen werden die Kapseln kleiner (bis 50 %) und blasser. …

**Neu:**
> … als **Kapseln** (66 × 44, wachsen mit der Textgröße wie die Schaltflächen der Leisten; links und rechts rund, Abstand 8 px, deckend) mit Symbol,
> darunter klein das Wort (11 pt, z. B. ‚Einstellen‘, ‚Löschen‘) – ‚Löschen‘ rot und ganz außen. Die Kachel folgt dem Finger; ab halber
> Aktionsbreite bleibt sie offen (bei zwei Aktionen 162 px), sonst federt sie zurück. Die Kapseln erscheinen nacheinander wie in Notizen: zuerst
> ‚Löschen‘ ganz außen – sie wächst aus dem frei werdenden Platz und blendet ein –, die nächste erst, wenn ‚Löschen‘ ganz da ist. Beim Zurückwischen
> genau umgekehrt: zuerst wird die innere kleiner und blasser, bis die Kachel ‚Löschen‘ erreicht, dann ‚Löschen‘; keine Kapsel rückt dabei nach
> rechts über ihren Platz hinaus. ‚Bewegung reduzieren‘: die Kapseln stehen an ihrem Platz und blenden nur ein und aus. …

### P-107/V-3 – Katalog R-1.13 (AD-Beans)

**Alt:**
> … Maße und Schwellen der Bedienung sind fest in der Bean (nur lesbar). …

**Neu:**
> … Maße und Schwellen der Bedienung legt die Bean fest (nur lesbar); Maße von Schaltflächen wachsen dabei mit der Textgröße wie alle Schaltflächen
> (R-1.10). …

Dazu passend, ohne eigene Regel: Kommentar und Liste der AD-Beans nennen `masse` als „Maße bei Textgröße ‚groß‘ und Schwellen“.

## 5. Weiter

**Wortlaut P-107/V-1 bis V-3 bestätigt (Nutzer 18.11.2026, Sitzung 0126) und in die Designrichtlinie allgemein übernommen.** Jetzt folgt die Bau-Frage **AppDesign 4.60.1 mit Reiselogbuch 3.57.1** (Prüflauf voll, weil Code in AppDesign und App
geändert), danach Usertest P-108.
