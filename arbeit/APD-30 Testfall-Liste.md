# APD-30 – Leere Zustände als allgemeiner Baustein: Testfall-Liste

Stand 02.11.2026 · Sitzung Reiselogbuch 0076 · Muster `arbeit/APD-30 Muster.html` (Varianten A, B, C; nur hell, quer)
(Zusammenarbeit 0 Nr. 1: jeder Fall wird ein Testfall (automatisch) mit fester Prüfung; was nur das Gerät zeigt, kommt in den Usertest)

## Entscheidung (Nutzer 02.11.2026, Sitzung 0075)

Leere Zustände als allgemeiner Baustein wie Apple (`ContentUnavailableView`: Symbol, Titel, Satz, optional ein Knopf; ‚Keine
Treffer‘ mit dem Suchbegriff) für alle Stellen im Reiselogbuch: `.emptymain`, `.side-empty`, `.empty-note`.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple:** SwiftUI `ContentUnavailableView(label:description:actions:)` – Symbol, Titel, Beschreibung und optional
  Aktionen, mittig im freien Bereich; für die Suche `ContentUnavailableView.search(text:)` mit Lupe, ‚Keine Treffer für …‘ und einem
  Satz zur Schreibweise, ohne Knopf (Quellen: developer.apple.com/documentation/swiftui/contentunavailableview,
  …/contentunavailableview/search(text:), useyourloaf.com/blog/content-unavailable-views). Die deutschen Wörter des Systems und
  die genauen Schriftgrößen sind **nicht belegt** – im Muster nachgebaut (Titel 22 pt fett, Satz 15 pt grau, Symbol 52 pt).
- **Im Web nachgebaut:** Lucide-Icons statt SF Symbols (`book-open`, `search`, `calendar`).
- **HIG-Checkliste (16):** 1 Antippflächen (Knopf 44 pt hoch), 2 Schrift (Textstile, Satz grau), 3 Kontrast (Satz `--muted` auf
  `--bg` hell und dunkel, auch ‚Kontrast erhöhen‘), 8 Texte (‚…‘, ohne ‚wir‘, kurz).
- **Katalog (17):** R-1.1 (gleicher Baustein auf iPad und iPhone), R-1.7 (sichere Ränder), R-1.8 (VoiceOver: Symbol `aria-hidden`,
  Titel als Überschrift), R-1.9 (Kontrast erhöhen), R-1.10 (Textgröße), R-2.3 (Suche ‚0‘), R-3.1 (Antippfläche), R-10.1 (Texte),
  R-10.2 (Lesbarkeit).
- **Bewusste Abweichung:** keine geplant. Satz ohne ‚du‘ wie die übrigen Hinweise der App (Vermutung, dass das passt – im Muster
  zu prüfen).

## Die Stellen und Texte (Vorschlag im Muster)

| Nr. | Stelle heute | Symbol | Titel | Satz | Knopf |
|---|---|---|---|---|---|
| S-1 | `.emptymain` – kein Reiselogbuch, Inhalt | `book-open` | Noch kein Reiselogbuch | Ein neues mit ‚plus‘ in der Seitenleiste anlegen. | Neues Reiselogbuch (= ‚plus‘) |
| S-2 | `.side-empty` – kein Reiselogbuch, Seitenleiste bzw. iPhone-Startliste | `book-open` (klein) | Noch kein Reiselogbuch | – | – |
| S-3 | `.side-empty` – Suche in der Liste ohne Treffer | `search` (klein) | Keine Treffer für ‚Begriff‘ | Schreibweise prüfen oder nach etwas anderem suchen. | – |
| S-4 | `.empty-note` – ‚Nur erfasste Tage‘, noch keiner erfasst | `calendar` | Noch keine Tage erfasst | Es werden nur erfasste Tage gezeigt. | Alle Tage zeigen (= Menü ‚Alle Tage‘) |
| S-5 | `.empty-note` – Suche im Reiselogbuch ohne Treffer (Tabelle und Kästen) | `search` | Keine Treffer für ‚Begriff‘ | wie S-3 | – |

Varianten: **A** Symbol · Titel · Satz · Knopf getönt · **B** wie A, Knopf als blauer Text · **C** nur Titel und Satz.

## Testfälle (automatisch)

| Nr. | Gerät / Lage | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| L-1 | iPad quer, hell und dunkel | App ohne Daten starten, ‚Neues Reiselogbuch‘ mit x schließen | 0 Reiselogbücher | Inhalt S-1 mittig im freien Bereich unter der Leiste; Seitenleiste S-2; kein Text ‚Noch kein Reiselogbuch angelegt.‘ mehr |
| L-2 | iPhone hoch und quer | wie L-1 | 0 Reiselogbücher | Startliste zeigt S-2 bzw. S-1 (iPhone-Aufbau ohne Inhalt rechts), nichts unter Statusleiste oder Home-Leiste (R-1.7) |
| L-3 | alle | Knopf ‚Neues Reiselogbuch‘ (A/B) | 0 Reiselogbücher | öffnet dasselbe Fenster wie ‚plus‘; nach x geht der Fokus zurück auf den Knopf (R-1.8) |
| L-4 | alle | erstes Reiselogbuch anlegen | 0 → 1 | leerer Zustand verschwindet in Seitenleiste und Inhalt ohne Springen |
| L-5 | alle | letztes Reiselogbuch löschen | 1 → 0 | S-1 und S-2 erscheinen wieder |
| L-6 | alle | Suche in der Liste: Begriff ohne Treffer | 3 Reiselogbücher | S-3 mit dem Begriff im Titel in ‚…‘; Untertitel ‚0 von 3 Reiselogbüchern‘ bleibt (RLB-92/F-8) |
| L-7 | alle | Begriff mit `<b>`, `&`, Anführungszeichen, 80 Zeichen ohne Leerzeichen | – | Begriff erscheint als Text (kein HTML), Titel bricht um, nichts ragt über den Rand |
| L-8 | alle | Begriff ändern, bis es Treffer gibt | – | S-3 verschwindet, Kacheln erscheinen; und zurück |
| L-9 | alle | ‚Nur erfasste Tage‘ in einem Reiselogbuch ohne erfassten Tag | 0 von 15 erfasst | S-4 unter Kopf, Teilnehmern und Fortschritt, mittig im freien Bereich |
| L-10 | alle | Knopf ‚Alle Tage zeigen‘ (A/B) | wie L-9 | gleiche Wirkung wie Menü ‚Alle Tage‘ (Häkchen dort wechselt), alle Tage sichtbar |
| L-11 | alle, Tabelle und Kästen (AX) | Suche im Reiselogbuch ohne Treffer | – | S-5 mit Begriff; Suchzeile zeigt ‚0‘ (R-2.3); VoiceOver-Ansage ‚Keine Treffer‘ bleibt (RLB-100) |
| L-12 | alle | Textgröße xS bis AX5 | jeder Zustand | Titel und Satz folgen den Textstilen (R-1.10), brechen um, nichts abgeschnitten; Knopf mindestens 44 pt hoch (R-3.1) |
| L-13 | alle | ‚Kontrast erhöhen‘, hell und dunkel | jeder Zustand | Satz und Symbol mindestens 4,5 : 1 bzw. 3 : 1 (R-10.2, R-1.9) |
| L-14 | alle | VoiceOver-Reihenfolge | jeder Zustand | Symbol verborgen, Titel als Überschrift, dann Satz, dann Knopf (R-1.8) |
| L-15 | iPad | drehen quer ↔ hoch | jeder Zustand | Zustand bleibt, wieder mittig; Grundregeln (`pruefe.mjs`) |
| L-16 | iPad und iPhone | Suchfeld mit Fokus, Tastatur offen | S-3, S-5 | Titel und Satz stehen im sichtbaren Bereich über der Tastatur (R-4.5 sinngemäß), Suchzeile springt nicht |
| L-17 | alle | Abgleich bringt ein Reiselogbuch bzw. erfasste Tage | S-1/S-2 bzw. S-4 | leerer Zustand verschwindet ohne Neuladen |
| L-18 | alle | Offline-Zeile (15.20) bei leerer Liste | S-2 offline | Offline-Zeile bleibt unten, überdeckt den leeren Zustand nicht |
| L-19 | alle | Seitenleiste ein/aus (iPad quer) | S-1 | Inhalt bleibt mittig im jeweils freien Bereich |
| L-20 | Gegenprobe | Satz in `--muted` durch `#c7c7cc` (hell) ersetzen; Knopf 30 px hoch | – | L-12 bzw. L-13 werden rot |

## Testfälle (User) – kommen in den Usertest der Version

- Aussehen am iPad quer und hoch und am iPhone hoch: S-1 bis S-5 wirken wie in Apple-Apps (ruhig, mittig).
- VoiceOver am Gerät: Ansage von Titel, Satz und Knopf in dieser Reihenfolge.

## Offen bis zur Entscheidung im Muster

1. ~~Variante A, B oder C.~~ **Entschieden: Variante A** – Symbol, Titel, Satz, Knopf getönt (Nutzer 02.11.2026, Sitzung 0076).
2. Texte S-1 bis S-5 so?
3. Seitenleiste bei S-2 ohne Satz (der Satz steht schon im Inhalt) – so?
