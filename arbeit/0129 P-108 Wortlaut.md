# P-108 – Wortlaut und Testfall-Liste zur Korrektur AppDesign 4.60.2 / Reiselogbuch 3.57.2 (Sitzung 0129)

Stand 18.11.2026 · Grundlage: Muster P-108 Stand 2 ‚N wie Notizen‘ bestätigt, Abstand **11 pt wie Notizen**, Kapsel **66 × 44 bleibt**
(Nutzer 18.11.2026, Sitzung 0129) · Messwerte `arbeit/0128 P-108 Notizen Messung.md` · Befunde P-108/F-1 bis P-108/F-4, Antworten P-108/Q-1 bis P-108/Q-4
in `arbeit/0128 P-108 Rückmeldung und Klärung.md` (Q-4 ‚8 px‘ ist damit durch 11 pt ersetzt).

Freigabe nach 0 Nr. 29: V-1 bis V-6 (Regeln und Texte), dazu die Testfall-Liste M-1 bis M-12.

---

## V-1 · Designrichtlinie allgemein 15.4 ‚Wischaktionen‘

**Alt:**

> **Wischaktionen** (R-7.8): Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen des Kontextmenüs als **Kapseln**
> (66 × 44, wachsen mit der Textgröße wie die Schaltflächen der Leisten; links und rechts rund, Abstand 8 px, deckend) mit Symbol, darunter klein das Wort (11 pt, z. B. ‚Einstellen‘, ‚Löschen‘) –
> ‚Löschen‘ rot und ganz außen. Die Kachel folgt dem Finger; ab halber Aktionsbreite bleibt sie offen (bei zwei Aktionen 162 px), sonst
> federt sie zurück. Die Kapseln erscheinen nacheinander wie in Notizen: zuerst ‚Löschen‘ ganz außen – sie wächst aus dem frei werdenden Platz und blendet ein –,
> die nächste erst, wenn ‚Löschen‘ ganz da ist. Beim Zurückwischen genau umgekehrt: zuerst wird die innere kleiner und blasser, bis die Kachel ‚Löschen‘
> erreicht, dann ‚Löschen‘; keine Kapsel rückt dabei nach rechts über ihren Platz hinaus. ‚Bewegung reduzieren‘: die Kapseln stehen an ihrem Platz und
> blenden nur ein und aus. **Durchwischen** über 60 % der Kachelbreite
> macht die rote Kapsel breit und löst sie beim Loslassen aus; sie fragt mit der Sprechblase (R-4.12, 15.7), die aus der roten Kapsel
> wächst – die Kachel bleibt offen, bis entschieden ist. Höchstens eine Kachel ist offen; Tippen auf die Kachel oder daneben in der Liste
> schließt sie und löst sonst nichts aus, Schaltflächen außerhalb der Liste wirken sofort. Technisch: AD-Bean `swipeactions` (R-1.13,
> Liste in 15), die App übergibt dieselbe Aktionsliste wie dem Kontextmenü. Vorbild Notizen und Mail (iOS 26); anders als dort fragt
> das Durchwischen (16).

**Neu:**

> **Wischaktionen** (R-7.8): Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen des Kontextmenüs als **Kapseln**
> (66 × 44, wachsen mit der Textgröße wie die Schaltflächen der Leisten; links und rechts rund, deckend) mit Symbol, darunter klein das Wort (11 pt, z. B. ‚Einstellen‘, ‚Löschen‘) –
> ‚Löschen‘ rot und ganz außen. **Ein Abstand für alles: 11 pt** – Kachel–Kapsel, zwischen den Kapseln und rechts außen. Die Kachel folgt dem
> Finger; ab halber Aktionsbreite bleibt sie offen (bei zwei Aktionen 165 px), sonst federt sie zurück. Die Kapseln erscheinen wie in Notizen:
> jede steht an ihrem Platz und **wächst aus ihrer Mitte** (Größe und Deckkraft gemeinsam, gleichmäßig mit dem Weg) – sie beginnt, wenn die Kachel
> die halbe Kapsel freigibt, und ist voll, wenn auch der Abstand dahinter frei ist; so kommt zuerst ‚Löschen‘, dann die nächste. Beim Zurückwischen
> und Gleiten genau umgekehrt, allein vom Weg bestimmt; keine Kapsel rückt dabei nach rechts über ihren Platz hinaus. **Kein Durchwischen:** über
> die offene Breite hinaus geht die Kachel nur mit starkem Widerstand weiter (höchstens 60 px), die Kapseln rücken anteilig mit und werden höchstens
> 6 % größer, nichts wird langgezogen; beim Loslassen federt die Kachel auf ‚offen‘ zurück und löst nichts aus. ‚Bewegung reduzieren‘: die Kapseln
> stehen an ihrem Platz in voller Größe und blenden an denselben Stellen nur ein und aus (kein Wachsen, kein Mitrücken). Gelöscht wird nur über die
> Kapsel ‚Löschen‘; sie fragt mit der Sprechblase (R-4.12, 15.7), die aus der roten Kapsel wächst – die Kachel bleibt offen, bis entschieden ist.
> Höchstens eine Kachel ist offen; Tippen auf die Kachel oder daneben in der Liste schließt sie und löst sonst nichts aus, Schaltflächen außerhalb
> der Liste wirken sofort. Technisch: AD-Bean `swipeactions` (R-1.13, Liste in 15), die App übergibt dieselbe Aktionsliste wie dem Kontextmenü.
> Vorbild Notizen (iOS 26, gemessen 18.11.2026); anders als Apples Standard ohne Durchwischen (16).

## V-2 · Regelkatalog R-7.8 (Spalten Regel und Gerät)

**Alt (Ausschnitt, der Rest bleibt):**

> … als Kapseln 66 × 44 mit Symbol und dem Wort darunter (Kapsel, Symbol und Wort wachsen mit der Textgröße wie die Schaltflächen der Leisten, das
> Wort nie abgeschnitten); nichts ragt aus Seitenleiste oder Bild. Die Kachel folgt dem Finger, bleibt ab halber Aktionsbreite offen, sonst federt sie
> zurück; die Kapseln erscheinen nacheinander von außen – jede wächst aus dem frei werdenden Platz und blendet ein, die nächste erst, wenn sie ganz da
> ist –, beim Zurückwischen und Gleiten genau umgekehrt; keine rückt dabei über ihren Platz hinaus. **Durchwischen** über 60 % der Kachelbreite löst
> beim Loslassen die rote Aktion aus – sie fragt zuerst (R-4.12), die Kachel bleibt bis zur Entscheidung offen. Höchstens eine Kachel ist offen; …
> ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, die Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein und aus; je Bild nur
> transform und opacity

> Gerät: Wischgefühl, Rollen gegen Wischen, Durchwischen, VoiceOver

**Neu:**

> … als Kapseln 66 × 44 mit Symbol und dem Wort darunter (Kapsel, Symbol und Wort wachsen mit der Textgröße wie die Schaltflächen der Leisten, das
> Wort nie abgeschnitten), ein Abstand von 11 pt zwischen Kachel und Kapsel, zwischen den Kapseln und rechts außen; nichts ragt aus Seitenleiste oder
> Bild. Die Kachel folgt dem Finger, bleibt ab halber Aktionsbreite offen, sonst federt sie zurück; jede Kapsel steht an ihrem Platz und wächst aus
> ihrer Mitte (Größe und Deckkraft gleichmäßig mit dem Weg) – unsichtbar, bis die Kachel die halbe Kapsel freigibt, voll, wenn auch der Abstand
> dahinter frei ist –, beim Zurückwischen und Gleiten genau umgekehrt; keine rückt dabei nach rechts über ihren Platz hinaus. **Kein Durchwischen:**
> über die offene Breite hinaus folgt die Kachel nur mit starkem Widerstand (höchstens 60 px), die Kapseln rücken anteilig mit und werden höchstens
> 6 % größer, keine wird langgezogen; Loslassen federt auf ‚offen‘ und löst nichts aus. Die rote Aktion fragt beim Antippen zuerst (R-4.12), die
> Kachel bleibt bis zur Entscheidung offen. Höchstens eine Kachel ist offen; … ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, die Kapseln
> stehen an ihrem Platz in voller Größe und blenden an denselben Stellen nur ein und aus; je Bild nur transform und opacity

> Gerät: Wischgefühl, Widerstand und Zurückfedern, Rollen gegen Wischen, VoiceOver

## V-3 · Designrichtlinie allgemein 16 ‚Bewusste Abweichungen‘

**Alt:**

> | Durchwischen einer Kachel fragt mit der Sprechblase (Apple: Durchwischen löscht sofort, Mail und Notizen bieten Rückgängig bzw. ‚Zuletzt gelöscht‘) | – | ein Reiselogbuch mit allen Einträgen wäre endgültig weg; es gilt R-4.12 wie bei jedem Löschen (APD-30) | 15.11.2026 |

**Neu:**

> | Kein Durchwischen einer Kachel (Apple: in SwiftUI ist `allowsFullSwipe` standardmäßig `true` – Durchwischen löst die erste Aktion aus; Notizen nutzt es nicht) | – | wie Notizen (P-108); ein Reiselogbuch mit allen Einträgen soll nie versehentlich weg sein – gelöscht wird nur über die Kapsel, sie fragt (R-4.12) | 18.11.2026 |

Quelle: developer.apple.com, `swipeActions(edge:allowsFullSwipe:content:)`, gelesen 18.11.2026 (Sitzung 0128): „The default is `true`.“

## V-4 · Designrichtlinie allgemein 15 ‚Liste der AD-Beans‘, Zeile `swipeactions`, Spalte Eigenschaften

**Alt:** `kacheln` (Pflicht) · `aktionen` (Pflicht, …) · `durchwischen` (`true`)

**Neu:** `kacheln` (Pflicht) · `aktionen` (Pflicht, …) – die Eigenschaft `durchwischen` entfällt.

## V-5 · Designrichtlinie allgemein 15.21 Messmodus (und Kommentar in `ui.js`)

**Alt:** ‚wisch offen|durch|zurück gefedert|abgebrochen weg W‘

**Neu:** ‚wisch offen|zurück gefedert|abgebrochen weg W‘

## V-6 · Reiselogbuch `PROMPT.md` 4 (Funktionsbeschreibung)

**Alt:** … – dieselben Aktionen wie beim langen Drücken; Durchwischen über 60 % der Kachel fragt mit der Sprechblase ‚Reiselogbuch löschen‘. …

**Neu:** … – dieselben Aktionen wie beim langen Drücken; ‚Löschen‘ fragt mit der Sprechblase ‚Reiselogbuch löschen‘, über die Kapseln hinaus wird
nichts ausgelöst (seit 3.57.2, wie Notizen). …

---

## Testfall-Liste (zur Freigabe; wird fest)

Geräte iPad quer und hoch, iPhone hoch und quer · hell und dunkel · ‚Bewegung reduzieren‘ · größte Textgröße · Daten: leer, 30 Reiselogbücher,
langer Titel. Jeder Fall wird eine feste Prüfung in `checkWischen` (`AppDesign/tests/ablauf.mjs`, aufgerufen von `ReiseLogBuch/tests/ablauf-wischen.mjs`).

| Nr. | Fall | Feste Prüfung |
|---|---|---|
| M-1 | **Ablauf des Nutzers (0 Nr. 1):** iPad quer, Kachel langsam nach links: ‚Löschen‘ unsichtbar, bis die halbe Kapsel frei ist, dann wächst sie aus ihrer Mitte bis voll (mit Abstand frei); ‚Einstellen‘ erst danach ebenso | Größe und Deckkraft je Kapsel an den Schwellen, Mitte der Kapsel bleibt stehen – **rot gegen 4.60.1** |
| M-2 | Zurückwischen: genau umgekehrt, an denselben Stellen | Größe und Deckkraft je Kapsel beim Zurückwischen = beim Aufwischen am selben Weg |
| M-3 | Offen: Abstand Kachel–Kapsel = Kapsel–Kapsel = rechts außen = 11 pt, offene Breite 165 px | Rechtecke – **rot gegen 4.60.1** (dort 8 px zwischen den Kapseln) |
| M-4 | Weit über die letzte Kapsel hinaus: keine Kapsel wird breiter als 6 %, alle sichtbar, Kachel höchstens 60 px über ‚offen‘, Kapseln rücken anteilig mit | Breite, Deckkraft und Lage der Kapseln, Weg der Kachel – **rot gegen 4.60.1** (dort wird ‚Löschen‘ breit) |
| M-5 | Loslassen nach dem Überwischen: federt auf ‚offen‘, keine Sprechblase, nichts gelöscht | Endlage = offene Breite, keine Sprechblase, Speicher unverändert – **rot gegen 4.60.1** |
| M-6 | Tippen auf die offene Kachel und daneben: gleitet zurück, Kapseln vergehen umgekehrt (erst ‚Einstellen‘, dann ‚Löschen‘) | Reihenfolge von Größe und Deckkraft beim Gleiten |
| M-7 | Kapsel ‚Löschen‘ antippen fragt weiterhin (R-4.12), die Kachel bleibt offen bis zur Entscheidung | Sprechblase ‚… löschen?‘, Kachel offen |
| M-8 | ‚Bewegung reduzieren‘: Kapseln an ihrem Platz in voller Größe, nur Deckkraft, an denselben Schwellen; kein Mitrücken beim Überwischen | kein scale, kein translate der Kapseln, Deckkraft an den Schwellen |
| M-9 | Größte Textgröße: Kapseln und Abstände wachsen mit, Schwellen ebenso, nichts ragt hinaus | Rechtecke bei größter Textgröße |
| M-10 | Drehen bei offener Kachel und beim Überwischen: Zustand wie vorher (offen bzw. zu) | Grundregeln nach dem Drehen (`pruefe.mjs`) |
| M-11 | iPhone hoch und quer, 320 × 568: nichts ragt über den Bildrand, auch beim Überwischen | Rechtecke |
| M-12 | AD-Bean ohne `durchwischen`: die Eigenschaft gibt es nicht mehr, Liste der AD-Beans und `createSwipeactions` stimmen überein | `checkBeans` neu ergänzt: die Eigenschaften der Liste = die Parameter der Fabrik (heute prüft `checkBeans` das nicht) |

Am Gerät (Testfall (User) im nächsten Usertest P-109): Wischgefühl, Widerstand beim Überwischen, Zurückfedern – Vergleich mit Notizen.
