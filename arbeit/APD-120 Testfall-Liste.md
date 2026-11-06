# APD-120 Testfall-Liste – Glas abschalten

Stand 06.11.2026 · Sitzung Reiselogbuch 0085 · Muster `arbeit/APD-120 Muster.html` (A: Schalter im Untermenü ‚Darstellung‘, B: im Mehr-Menü) – **entschieden: A** (Nutzer 06.11.2026, Sitzung 0086).
Nummern gelten nur in dieser Datei (außerhalb: APD-120/G-n).

| Nr. | Gerät × Lage × Darstellung | Handlung | Erwartet (feste Prüfung) |
|---|---|---|---|
| G-1 | iPad quer, hell | Mehr → Darstellung (A) bzw. Mehr (B): Schalter ‚Glas‘ aus | Menü, Untermenü, Kontextmenü und Kapsel Nach oben / Ans Ende sofort deckend (keine Unschärfe, Hintergrund `--card` bzw. `--btn`) – wie ‚Transparenz reduzieren‘ (R-3.9, `masseStile`) |
| G-2 | iPad quer, hell | Schalter wieder ein | Glas wie in 4.53.0 (75 %, Unschärfe 20 px, Sättigung 180 %) |
| G-3 | alle Ansichten | App neu laden | Wahl bleibt (in `settings` gespeichert, alte Daten ohne Wert: Glas ein, `normalize`) |
| G-4 | iPhone hoch und quer, iPad hoch | wie G-1 | ebenso deckend; Suchfeld und runde Knöpfe der unteren Leiste (iPhone, R-3.9) ebenso |
| G-5 | dunkel | wie G-1 und G-2 | deckend dunkel (`#2c2c2e` bzw. `--btn`), ein: dunkles Glas |
| G-6 | Bedienungshilfen | Schalter mit VoiceOver bzw. Tastatur (Leertaste) | Rolle ‚Schalter‘ mit Name ‚Glas‘ und Zustand; Menü bleibt offen, Esc schließt (R-4.7, R-1.8) |
| G-7 | Text 53 | Menü mit Schalter | passt auf den Bildschirm, Schalter vollständig (R-4.5) |
| G-8 | Abgleich iPad ↔ iPhone | Schalter auf einem Gerät aus, dann abgleichen | gilt nur auf diesem Gerät, das andere behält seine Einstellung (Nutzer 06.11.2026) |
| G-9 | Backup | Glas aus, Backup erstellen, App neu installieren (leerer Speicher), Backup laden | Glas wieder aus (Nutzer 06.11.2026); ohne Wert im Backup (alte Backups): ein. Backup eines anderen Geräts: Einstellung bleibt wie auf diesem Gerät (Nutzer 06.11.2026, Sitzung 0086) |
| G-12 | neu, leer | App zum ersten Mal | Glas ein (Standard) |
| G-13 | Backup anderes Gerät | Glas hier ein, Backup eines Geräts mit Glas aus laden | Glas bleibt ein (Wert aus dem Backup nur, wenn das Gerät noch keine Wahl gespeichert hat) |
| G-10 | alle | Grundregeln nach jedem Schritt | `pruefe.mjs` |
| G-11 | Gegenprobe | Schalter aus, Glas bleibt (absichtlich) | `masseStile` rot |

Nur am Gerät (Usertest): Gefühl beim Umschalten, Lesbarkeit über Bildern und der blauen Kachel.
