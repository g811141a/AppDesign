# RLB-120 – Wortlaut der allgemeinen Regel (Tageskachel und Kopfverlauf)

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0104‘ · Muster `arbeit/RLB-120/index.html` ok (Nutzer 08.11.2026) · allgemein (Nutzer 08.11.2026)

Alle Stellen in AppDesign `README - Designrichtlinie allgemein.md`. Was sich ändert: **Verlauf B** in Kopfzeile und Bezeichnung, Bezeichnung **halbfett**,
**Emojis in Textgröße**, Spalte 1 **breiter**, Linien **vor dem ersten und nach dem letzten Feld**. Die App-Teile (Wetter im Kopf der Tageskachel in
Textgröße; Kopfzeilen des Reiselogbuchs auf `--kopf-verlauf`) stehen nur im Code des Reiselogbuchs und brauchen keinen Regeltext.

## RLB-120/W-1 – Abschnitt 2 Farben, Tabelle

**Alt:**

| `--th-bg` / `--th-line` | `#e5e5ea` / `#c7c7cc` | `#2c2c2e` / `#48484a` | Tabellen-Kopfzeile und ihre Ränder |

**Neu:**

| `--th-bg` / `--th-line` | `#e5e5ea` / `#c7c7cc` | `#2c2c2e` / `#48484a` | Endfarbe des Kopfverlaufs; Ränder der Tabellen-Kopfzeile |
| `--kopf-verlauf` | `#ffffff` 0 %, `#ffffff` 25 %, `#f9f9fb` 50 %, `#f0f0f3` 75 %, `#e5e5ea` 100 % | dieselbe Abstufung von `--card` (`#1c1c1e`) nach `--th-bg` (`#2c2c2e`) | **Kopfverlauf** (lange weiß, das Grau erst zum Ende hin): Tabellen-Kopfzeile von oben nach unten; Bezeichnung im Kasten mit Feldern nebeneinander von links nach rechts, untereinander von oben nach unten (15.10) |

## RLB-120/W-2 – Abschnitt 9 Tabellen, erster Punkt

**Alt:** Kopfzeile grau (`--th-bg`) mit Rändern `--th-line`; die Tabelle selbst ohne äußeren Rand, mit Schatten `--table-shadow`, damit die seitlichen
Grenzen gut zu sehen sind.

**Neu:** Kopfzeile mit dem Kopfverlauf von oben nach unten (`--kopf-verlauf`: oben weiß, das Grau erst zum unteren Rand hin) und Rändern `--th-line`;
die Ausgabe (HTML/PDF) behält ihre flache graue Kopfzeile (R-6.2). Die Tabelle selbst ohne äußeren Rand, mit Schatten `--table-shadow`, damit die
seitlichen Grenzen gut zu sehen sind.

## RLB-120/W-3 – Abschnitt 15.10, Punkt ‚Kasten mit Feldern‘

**Alt:** **Kasten mit Feldern** (`.box` mit `.kv`, iPhone statt Tabellenzeile, R-6.1): Felder durch dünne Linien getrennt (1 px `--line`, wie die
Trennlinie im Menü) – waagrecht zwischen den Feldern, senkrecht zwischen Bezeichnung und Inhalt. Bezeichnung in der ersten Spalte (Wort, Emoji oder
Emoji mit Wort, z. B. ‚Verlauf‘, ‚🚶🏽‍♂️ km‘): Text in normaler Schrift, Textgröße und Textfarbe wie der Wert (R-5.8), Emojis bleiben klein; Icon und Text
der Bezeichnung stehen waagrecht mittig zur ersten Zeile des Werts, auch wenn der Wert mehrzeilig ist (R-6.5). **Technisch:**
`<span class="k"><span class="l">…</span></span>`, ein Wort allein `.k.word`, Buchstaben neben einem Emoji in `.w`.

**Neu:** **Kasten mit Feldern** (`.box` mit `.kv`, iPhone statt Tabellenzeile, R-6.1): Felder durch dünne Linien getrennt (1 px `--line`, wie die
Trennlinie im Menü) – waagrecht vor dem ersten Feld, zwischen den Feldern und nach dem letzten, mit dem Innenabstand des Kastens zum Rand; senkrecht
zwischen Bezeichnung und Inhalt. Bezeichnung in der ersten Spalte (Wort, Emoji oder Emoji mit Wort, z. B. ‚Verlauf‘, ‚🚶🏽‍♂️ km‘): Text halbfett (600)
wie die Kopfzeile der Tabelle, in Textgröße und Textfarbe wie der Wert (R-5.8); Emojis in Textgröße wie im Wert, in einer Zeile – die erste Spalte ist
dafür `calc(98px * var(--f-body))` breit (mit 8 px Innenabstand). Die Fläche der Bezeichnung trägt den Kopfverlauf (`--kopf-verlauf`) nur in ihrer Zelle:
nebeneinander von links nach rechts, bei großer Schrift (Bezeichnung als Streifen über dem Wert) von oben nach unten – die Richtung wechselt mit der
Anordnung. Icon und Text der Bezeichnung stehen waagrecht mittig zur ersten Zeile des Werts, auch wenn der Wert mehrzeilig ist (R-6.5). **Technisch:**
`<span class="k"><span class="l">…</span></span>`, ein Wort allein `.k.word`, Buchstaben neben einem Emoji in `.w`; Richtung über `html.ts-um`.

## RLB-120/W-4 – Abschnitt 17, R-6.1

**Alt:** | R-6.1 | **Tabelle und Kasten in der App:** Kopf grau, Linien zwischen allen Spalten, **Zebra je Tabellenzeile** (zusammengefasste erste Spalte =
eine Zeile), gelbe Markierung ohne blauen Rand; Kasten mit Feldern (iPhone) mit Linien waagrecht und senkrecht | hig.mjs (Zebra auch in App-Tabellen) | – | 9, 15.10 |

**Neu:** | R-6.1 | **Tabelle und Kasten in der App:** Kopf mit Kopfverlauf von oben nach unten, Linien zwischen allen Spalten, **Zebra je Tabellenzeile**
(zusammengefasste erste Spalte = eine Zeile), gelbe Markierung ohne blauen Rand; Kasten mit Feldern (iPhone) mit Linien waagrecht (auch vor dem ersten
und nach dem letzten Feld) und senkrecht, Bezeichnung mit Kopfverlauf nur in der Zelle – nebeneinander von links nach rechts, untereinander von oben nach
unten | hig.mjs (Zebra auch in App-Tabellen; `kopfVerlauf` – Richtung je nach Anordnung, Linien vor dem ersten und nach dem letzten Feld) | – | 2, 9, 15.10 |

## RLB-120/W-5 – Abschnitt 17, R-6.5

**Alt:** | R-6.5 | **Bezeichnung im Kasten mit Feldern:** Text in der ersten Spalte normal (400), in Textgröße und Textfarbe; Icon und Text waagrecht mittig
zur ersten Zeile des Werts | hig.mjs – `kastenBezeichnung` (nach jedem Schritt; Gegenprobe im Reiselogbuch `ablauf-preis-km`) | – | 15.10 |

**Neu:** | R-6.5 | **Bezeichnung im Kasten mit Feldern:** Text in der ersten Spalte halbfett (600), in Textgröße und Textfarbe; Emojis so groß wie im Wert
und in einer Zeile; Icon und Text waagrecht mittig zur ersten Zeile des Werts | hig.mjs – `kastenBezeichnung` (600 statt 400, Emoji-Höhe wie im Wert;
nach jedem Schritt; Gegenprobe im Reiselogbuch `ablauf-preis-km`) | – | 15.10 |

## Offene Frage zur Ausgabe

Die Ausgabe (HTML/PDF, `outputCss`, R-6.2) hat heute eine flache graue Kopfzeile (`#d9d9d9`). **Empfehlung: so lassen.** Die Ausgabe ist ein Dokument
mit eigener, immer heller Gestaltung (Mustertabelle, R-6.2), ein Verlauf auf Papier bringt dort nichts. W-2 ist so formuliert; bei ‚auch Verlauf‘ ändere
ich W-2 und R-6.2.

## Nachtrag: Ausgabe auch mit Verlauf (Nutzer 08.11.2026, Sitzung 0104)

‚Ausgabe ist auch mit Verlauf zu gestalten.‘ Muster `arbeit/RLB-120/ausgabe.html` (Mustertabelle `outputCss`, Kopf mit Verlauf B von oben nach unten,
Weiß → `#d9d9d9`, dieselbe Abstufung wie in der App: `#ffffff` 0 %, `#ffffff` 25 %, `#f6f6f6` 50 %, `#e9e9e9` 75 %, `#d9d9d9` 100 %). Damit ändern sich
W-2 (ersetzt den bestätigten Wortlaut) und zwei weitere Stellen:

### RLB-120/W-2 (neu gefasst) – Abschnitt 9, erster Punkt

**Alt:** Kopfzeile grau (`--th-bg`) mit Rändern `--th-line`; die Tabelle selbst ohne äußeren Rand, mit Schatten `--table-shadow`, damit die seitlichen
Grenzen gut zu sehen sind.

**Neu:** Kopfzeile mit dem Kopfverlauf von oben nach unten (`--kopf-verlauf`: oben weiß, das Grau erst zum unteren Rand hin) und Rändern `--th-line`;
in der Ausgabe (HTML/PDF) derselbe Verlauf nach `#d9d9d9` (R-6.2). Die Tabelle selbst ohne äußeren Rand, mit Schatten `--table-shadow`, damit die
seitlichen Grenzen gut zu sehen sind.

### RLB-120/W-6 – Abschnitt 10, Punkt ‚Ausgabe-Design‘

**Alt:** … Tabellen wie in der App (Kopf `#d9d9d9`, Ränder `#a5a5a5`, Zebra `#f5f5f5`), Zeilen nicht über Seitenumbrüche teilen. …

**Neu:** … Tabellen wie in der App (Kopf mit dem Kopfverlauf von oben nach unten, Weiß → `#d9d9d9`: `#ffffff` 0 %, `#ffffff` 25 %, `#f6f6f6` 50 %,
`#e9e9e9` 75 %, `#d9d9d9` 100 %; Ränder `#a5a5a5`, Zebra `#f5f5f5`), Zeilen nicht über Seitenumbrüche teilen. …

### RLB-120/W-7 – Abschnitt 17, R-6.2

**Alt:** | R-6.2 | **Mustertabelle der Ausgabe** (`outputCss`): jede Tabelle in Ausgabe, Vorschau und Bericht, Zebra je Tabellenzeile, keine eigene
Nachbildung | hig.mjs – Vergleich mit unsichtbarer Mustertabelle | – | 10, 15.18 |

**Neu:** | R-6.2 | **Mustertabelle der Ausgabe** (`outputCss`): jede Tabelle in Ausgabe, Vorschau und Bericht, Kopf mit Kopfverlauf von oben nach unten
(Weiß → `#d9d9d9`), Zebra je Tabellenzeile, keine eigene Nachbildung | hig.mjs – Vergleich mit unsichtbarer Mustertabelle (auch der Verlauf des Kopfs) | – | 10, 15.18 |
