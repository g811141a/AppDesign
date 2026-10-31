# APD-105 – Wortlaut: Antippen und langes Drücken (Variante C)

Stand 31.10.2026, Sitzung 0067 · Variante **C** gewählt (Nutzer 31.10.2026: Knöpfe dimmen, Zeilen grau) · **Wortlaut bestätigt**
(dein ‚Ja‘ 31.10.2026, Zusammenarbeit 0 Nr. 29) · allgemeine Regel (0 Nr. 4) · Designrichtlinie allgemein.

Begriff: **‚Berühren‘** (solange der Finger liegt) – getrennt von ‚gedrückt = blau getönt‘ (Schaltfläche eines offenen Menüs, 4).

## 1. Regelkatalog 17, Abschnitt 3 – neu nach R-3.5

**Neu:**

> | R-3.6 | **Rückmeldung beim Berühren:** solange der Finger liegt, wird eine Schaltfläche blass (Icon und Text 35 %), eine Listen-
> oder Tabellenzeile grau – Schaltflächen sofort, in Rollbereichen (Liste, Smiley-Leiste, Kapsel) nach 80 ms; mehr als 10 px
> Bewegung oder Rollen hebt es auf, ohne auszulösen; Loslassen blendet in 0,15 s aus; gesperrte Schaltflächen zeigen nichts |
> ablauf.mjs | Rollen ohne Aufblitzen | 4, 15.1, 15.4, 15.12 |

## 2. Regelkatalog 17 – R-3.5 ergänzt

**Alt:**

> | R-3.5 | **Langes Drücken** (0,6 s) gilt nur, solange der Finger still steht: wandert er mehr als 10 px oder rollt die Fläche um ihn
> herum (Leiste seitlich ziehen), ist es abgebrochen – Finger und Maus; kurz antippen bleibt Antippen | ablauf.mjs –
> `checkLangDruecken` | Smiley-Leiste ziehen | 8, 13, 15.12 |

**Neu:**

> | R-3.5 | **Langes Drücken** (0,6 s) gilt nur, solange der Finger still steht: wandert er mehr als 10 px oder rollt die Fläche um ihn
> herum (Leiste seitlich ziehen), ist es abgebrochen – Finger und Maus; kurz antippen bleibt Antippen; **Anheben:** ein Eintrag mit
> eigener Aktion für langes Drücken (z. B. Smiley) hebt sich ab 0,15 s an (wächst, Schatten; ‚Bewegung reduzieren‘: nur Schatten)
> und senkt sich bei Abbruch wieder | ablauf.mjs – `checkLangDruecken` | Smiley-Leiste ziehen, Anheben | 8, 13, 15.12 |

## 3. Designrichtlinie 4 Schaltflächen – neuer Punkt nach ‚Blau getönt = gedrückt‘

**Neu:**

> - **Berühren** (R-3.6, wie Apple): Solange der Finger auf einer Schaltfläche liegt, wird sie blass (Icon und Text 35 %); eine
>   Listen- oder Tabellenzeile wird grau. Schaltflächen zeigen das sofort, in Rollbereichen erst nach 80 ms, damit beim Rollen nichts
>   aufblitzt; wandert der Finger mehr als 10 px oder rollt die Fläche, verschwindet es ohne Auslösen. Loslassen blendet in 0,15 s
>   aus. Gesperrte Schaltflächen zeigen nichts. ‚Blau getönt = gedrückt‘ (offenes Menü) bleibt davon unberührt.

## 4. Designrichtlinie 15.12 Smiley-Leiste

**Alt:**

> - **Langes Drücken** (R-3.5) auf einem Smiley entfernt ihn (8) – Ziehen ist kein langes Drücken: wandert der Finger mehr als 10 px
>   oder rollt die Leiste, ist es abgebrochen (`onLongPress`).

**Neu:**

> - **Langes Drücken** (R-3.5) auf einem Smiley entfernt ihn (8); beim Halten hebt er sich an – Ziehen ist kein langes Drücken:
>   wandert der Finger mehr als 10 px oder rollt die Leiste, ist es abgebrochen und er senkt sich wieder (`onLongPress`).
