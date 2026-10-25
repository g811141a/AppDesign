# APD-68 ‚Seitenleiste am iPad quer hereinwischen‘ – Apple-Abgleich, Varianten, Testfall-Liste

**Stand 23.10.2026** · Sitzung ‚Reiselogbuch 0032‘ · **gewählt: B Mitschieben** (Nutzer 23.10.2026), allgemeine Regel, **gebaut in AppDesign 4.31.0 / Reiselogbuch 3.29.0** (R-7.5, `checkNavigation` Q-1 bis Q-12, Testfälle P-67) · Muster: `arbeit/APD-68 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/APD-68%20Muster.html), Prüfung `arbeit/APD-68 Muster prüfen.mjs` (Chromium und WebKit, grün)

Anlass: P-66/4 (Nutzer 23.10.2026) – das iPad stand quer; dort holt Wischen die ausgeblendete Seitenleiste heute nicht herein
(15.4 ‚Quer (fest) ändert Wischen nichts‘). Wunsch: dieselbe Geste wie hoch auch quer.

## 1. Apple-Abgleich

- Split View (`UISplitViewController.presentsWithGesture`): eine Wischgeste zeigt die ausgeblendete Seitenleiste. Quer liegt die
  Seitenleiste bei Apple **neben** dem Inhalt, der Inhalt wird schmaler.
- Die Apple-Apps lösen das Hereinwischen quer **unterschiedlich** (Nutzer 23.10.2026) – kein einheitlicher Standard; Apple-Foren
  nennen zum Ein- und Ausblenden nur die Schaltfläche und das Ziehen der Trennlinie. **Festlegung:** wie hoch (R-7.5) von überall
  im Inhalt, am Ende neben dem Inhalt wie Apple quer.
- Betroffen: 15.4 und R-7.5 (‚Quer ändert Wischen nichts‘ entfällt), R-8.1 (ein Zustand für quer und hoch bleibt), APD-38/T-35 Vorrang,
  APD-59 ohne Ruckeln, APD-38/T-10 Wischaktionen (APD-30).

## 2. Varianten im Muster (Umschalter oben im Inhalt: Heute · A Darüber · B Mitschieben)

| | beim Ziehen | am Ende | Vorteil | Nachteil |
|---|---|---|---|---|
| **Heute** | – (Wischen ändert quer nichts) | panel-left blendet sofort ein/aus | bekannt | quer anders als hoch |
| **A Darüber, dann daneben** | Seitenleiste gleitet über den Inhalt, Inhalt bleibt stehen | rastet links ein, Inhalt wird einmal schmaler | ruhig, nur `transform` beim Ziehen | der Inhalt springt am Ende einmal auf die neue Breite |
| **B Mitschieben** (gewählt) | Inhalt rückt mit dem Finger nach rechts | Inhalt wird schmaler | näher an Apples Schieben | rechter Teil des Inhalts läuft beim Ziehen aus dem Bild |

Gemeinsam (A und B): fertig nach halber Breite oder schnellem Wischen (über 0,3 px/ms in den letzten 100 ms), sonst federt sie
zurück; entschieden nach 10 px (deutlich waagerecht, mehr als 1,2 × senkrecht, nach rechts); Rollen und der Bilderstreifen haben
Vorrang; ist die Geste entschieden, verhindert `touchmove` das Rollen von Safari (APD-67); **Ausblenden quer nur mit panel-left**
(gleitet), damit die Kacheln für Wischaktionen frei bleiben (APD-38/T-10); oberster Tag bleibt beim Ein- und Ausblenden; hoch unverändert.

## 3. Testfall-Liste (für den Bau)

Jeder Fall wird eine automatische Prüfung (Chromium und WebKit, hell und dunkel), Ausnahmen in den Testfällen. Im Muster schon
geprüft: F-1 bis F-11.

| Nr. | Fall | Erwartet |
|---|---|---|
| F-1 | iPad quer, Start | Seitenleiste fest links, Inhalt daneben (wie heute) |
| F-2 | quer: Eintrag wählen; nach links auf der Seitenleiste wischen | Seitenleiste bleibt |
| F-3 | quer: panel-left | Seitenleiste gleitet hinaus, Inhalt ganz breit, oberster Tag bleibt |
| F-4 | quer ausgeblendet: aus der Mitte langsam über die halbe Breite nach rechts | Seitenleiste folgt dem Finger (A: über dem Inhalt, B: Inhalt rückt mit), rastet ein, Inhalt schmaler, oberster Tag bleibt |
| F-5 | dasselbe unter der Hälfte, langsam loslassen | federt zurück, Inhalt ganz breit |
| F-6 | kurz und schnell nach rechts | Seitenleiste kommt |
| F-7 | senkrecht, schräg (mehr senkrecht), nach links | rollt bzw. nichts – keine Seitenleiste |
| F-8 | im Bilderstreifen bzw. in der Zeile ‚Reisemittel‘ waagerecht | Streifen rollt, keine Seitenleiste |
| F-9 | Berührung wie Safari, leicht schräg (14 px senkrecht) | Safari bricht nicht ab, Seitenleiste kommt (S-10) |
| F-10 | Berührung senkrecht | Safari rollt, keine Seitenleiste |
| F-11 | drehen während des Ziehens | Ziehen bricht ab, Zustand bleibt (R-8.1) |
| F-12 | quer ausgeblendet → hoch drehen → zurück | bleibt ausgeblendet; hoch Wischen holt sie wie heute |
| F-13 | quer eingewischt → hoch drehen | sichtbar bleibt sichtbar (hoch darübergelegt) |
| F-14 | Tastatur offen (Suche im Inhalt), quer wischen | Feld hat Vorrang (`NAV_EIGEN`), keine Seitenleiste |
| F-15 | Menü, Sprechblase oder Fenster offen | keine Geste |
| F-16 | ‚Bewegung reduzieren‘ | Überblenden statt Gleiten |
| F-17 | Messmodus | Zeilen ‚nav kandidat seite‘ … ‚fertig‘ auch quer |
| F-18 | iPhone quer, iPad schmal (Split View, iPhone-Aufbau) | unverändert (Zurückwischen wie heute) |

Gerät (Testfälle): Wischgefühl quer am iPad, Safari-Tab (Wischen vom linken Rand gehört dort Safari).
