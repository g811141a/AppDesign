# A-27 – Messmodus: Fall-Liste und Muster

**Stand 19.10.2026** · Sitzung Reiselogbuch 0015 · Grundlage: `arbeit/A-24 Analyse nach P-56.md` (Abschnitt 2 Nr. 5)

**Ziel:** Die App zeichnet am Gerät auf, was Safari beim Suchen wirklich tut. Ich lese die Messung, statt zu raten, und
richte damit das Safari-Modell (`tests/safari.mjs`) aus. **Schlank:** ein Baustein in `ui.js`, keine Kopie der App
(Lehre aus A-18/E-42), aus, solange er nicht gestartet ist, und mit einer Zeile in der App wieder zu entfernen.

**Vorschlag Version:** AppDesign **4.26.0** / Reiselogbuch **3.24.0** (neue Funktion → Nebenversion, ein Thema).

## 1. Bedienung (Muster)

```
Mehr-Menü der Seitenleiste ‚Reiselogbücher‘ (ellipsis)      während der Messung
┌──────────────────────────────┐                     ┌──────────────────────────────┐
│ ⤓ Backup erstellen            │                     │ ⤓ Backup erstellen            │
│ ⤒ Backup laden                │                     │ ⤒ Backup laden                │
│ ─────────────────────────── │                     │ ─────────────────────────── │
│ ◎ Messung starten             │                     │ ◉ Messung beenden und teilen  │
│   Für Claude: Bewegungen      │                     │   läuft · 0:42 · 1 318 Zeilen │
│   aufzeichnen                 │                     │                               │
│ ─────────────────────────── │                     │ ─────────────────────────── │
│ Version 3.24.0 · AppDesign …  │                     │ Version 3.24.0 · AppDesign …  │
└──────────────────────────────┘                     └──────────────────────────────┘
```

- **Starten:** Mehr-Menü der Seitenleiste (am iPhone: Startliste) → ‚Messung starten‘. Kein Zeichen auf dem Bildschirm
  (es würde selbst mitrutschen und die Messung stören); der Zustand steht nur im Menü.
- **Beenden:** gleicher Eintrag ‚Messung beenden und teilen‘ → Teilen-Menü mit der Datei `messung-2026-10-19-1432.txt`
  → in der Claude-App in den Chat. Ohne Teilen-Menü wird die Datei geladen (wie Backup).
- **Von selbst Schluss** nach 5 Minuten oder 20 000 Zeilen; beim nächsten Öffnen des Menüs steht ‚Messung beenden und
  teilen‘ (die Daten bleiben bis dahin im Speicher). Neu laden der App verwirft eine Messung (nichts wird gespeichert).
- **Datenschutz:** keine Texte. Vom Suchfeld nur die **Länge** der Eingabe, keine Buchstaben; keine Reisedaten.

## 2. Was aufgezeichnet wird

**Kopf (einmal):** App- und AppDesign-Version, Gerät (`userAgent`), Home-Bildschirm ja/nein (`standalone`),
Bildschirm (Breite × Höhe, Pixeldichte), Darstellung, Startzeit.

**Je Bild** (`requestAnimationFrame`), **nur wenn sich ein Wert geändert hat** (sonst keine Zeile – das hält die Datei kurz):

| Spalte | Wert |
|---|---|
| `t` | ms seit Start |
| `sy` | `scrollY` |
| `sh` | Seitenhöhe (`scrollHeight`) |
| `ih` | `innerHeight` |
| `vh` / `vt` | `visualViewport.height` / `offsetTop` |
| `vvtop` | unser Ausgleich `--vv-top` |
| `kopf` / `such` | Oberkante von Kopfleiste und Suchzeile am Bildschirm (`getBoundingClientRect().top`) |
| `inh` | Oberkante des ersten sichtbaren Inhalts |
| `fokus` | was den Fokus hat (Suchfeld Liste / Suchfeld Eintrag / anderes / keins) |
| `lage` | hoch / quer |

**Ereignisse (sofort, mit Zeit):** `focus`, `blur`, Eingabe (Länge), ⓧ, ⌃ ⌄, Suche öffnen/schließen, `scroll`,
`visualViewport resize/scroll`, `orientationchange`, Neuaufbau (`setHtml`, `render`).

**Muster der Datei (Text, eine Zeile je Bild):**

```
# Messung · Reiselogbuch 3.24.0 · AppDesign 4.26.0 · iPhone iOS 26.0 · Home-Bildschirm · 393×852 @3 · hell
t     sy   sh    ih   vh   vt   vvtop kopf such inh  fokus  lage
0     0    4120  852  852  0    0     0    52   104  -      hoch
812   0    4120  852  852  0    0     0    52   104  liste  hoch   ! focus liste
1104  0    4120  852  516  0    0     0    52   104  liste  hoch   ! vv resize
1650  0    980   852  516  0    0     0    52   104  liste  hoch   ! eingabe 3 · render
1651  0    980   852  516  148  0    -148 -96  -44  liste  hoch      ← Leiste rutscht weg
1668  0    980   852  516  148  148  0    52   104  liste  hoch   ! vv scroll ← Ausgleich ein Bild später
```

Genau so ein Ausschnitt zeigt dann schwarz auf weiß, ob die Vermutung aus A-24 stimmt (Seite zu kurz → `vt` springt →
Ausgleich zu spät).

## 3. Fall-Liste (jeder Fall wird eine automatische Prüfung)

| Nr. | Fall | Erwartet |
|---|---|---|
| F1 | Messung aus (Normalfall) | kein `requestAnimationFrame`, keine Ereignis-Hörer des Messmodus, App unverändert (Pixelvergleich mit 3.23.1) |
| F2 | Starten im Mehr-Menü (iPad Seitenleiste, iPhone Startliste) – hell und dunkel | Eintrag wechselt auf ‚Messung beenden und teilen‘ mit Laufzeit und Zeilen |
| F3 | Rollen, Suche öffnen, tippen, ⓧ, weitertippen, ⌃ ⌄ (Seitenleiste und Eintrag) | je Handlung die Ereigniszeile; Werte stimmen mit dem Zustand der Seite überein |
| F4 | Nachgebildete Tastatur (Safari-Modell, iPhone hoch und quer) | `vh`/`vt` stehen in der Datei, Leistenlage wird mitgeschrieben |
| F5 | Drehen hoch ↔ quer während der Messung | `orientationchange` und `lage` erfasst, Messung läuft weiter |
| F6 | Ruhe (nichts ändert sich) | keine neuen Zeilen |
| F7 | Grenze 5 min / 20 000 Zeilen | Messung endet von selbst, Menü zeigt ‚beenden und teilen‘ |
| F8 | Beenden und teilen | Datei `messung-JJJJ-MM-TT-hhmm.txt`, Kopf vollständig, Teilen bzw. Laden wie Backup |
| F9 | Datenschutz: Suche nach ‚Rom‘ | in der Datei steht nur `eingabe 3`, nie ‚Rom‘ und keine Reisetitel |
| F10 | Leere App (kein Reiselogbuch) und viele Tage | Starten, Messen und Teilen gehen in beiden Fällen |
| F11 | Neu laden während der Messung | Messung verworfen, Menü zeigt wieder ‚Messung starten‘ |
| F12 | Messung beeinflusst die Ansicht nicht | Suchablauf mit und ohne Messung: gleiche Lage der Leisten (`ablauf-suche-iphone.mjs` läuft auch mit Messung) |

**Nur am Gerät (Prüfliste P-57):** die Messung selbst, iPhone vom Home-Bildschirm hoch und quer: Suche öffnen, 3–4
Buchstaben tippen, ⓧ, weitertippen; dann dasselbe am iPad mit Bildschirmtastatur; Teilen in die Claude-App.

## 4. Was ich danach mache (nicht Teil dieser Version)

Auswertung der Messung → `tests/safari.mjs` an den echten Werten ausrichten → `ablauf-suche-iphone.mjs` rot gegen
4.25.1/3.23.1 und gegen 4.26.0/3.24.0 → Umbau B (A-28) mit A-29.

## 5. Vorschläge für AppDesign

| Nr. | Vorschlag | Nutzen |
|---|---|---|
| V7 | **Messmodus als allgemeiner Baustein** (`AD.messung`), jede App schaltet ihn mit einer Zeile ein; Eintrag immer im Mehr-Menü der Seitenleiste neben Backup | jeder künftige Bewegungsfehler in jeder App ist messbar |
| V8 | **Messung abspielen:** eine geteilte Messdatei wird in einer Prüfung als Vorgabe für das Safari-Modell geladen (die Prüfung macht genau das, was das Gerät gemessen hat) | Nachbildung und Gerät können nicht mehr auseinanderlaufen |
| V9 | Später: ‚Problem melden‘ – Messung, Version und Gerät in einer Datei | eine Rückmeldung enthält alles, was ich brauche |
