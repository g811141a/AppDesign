# APD-135/W-51 Rest – Wortlaut alt und neu (`PROMPT.md` des Reiselogbuchs)

**Stand 18.11.2026** · Sitzung 0133 · **Entwurf zur Bestätigung** (Zusammenarbeit 0 Nr. 29) · kommt mit in Reiselogbuch 3.57.5 (AppDesign 4.62.0 unverändert)

Grund: APD-135/W-51 (‚seit X.Y.Z‘ gehört nicht in den Regeltext, 0 Nr. 3 – Geschichte steht im CHANGELOG) und derselbe Grundsatz wie APD-135/D-46 Nr. 16
(‚rechtsbündig‘ sagt R-6.7 ‚Zahlenspalten rechtsbündig‘). Keine Prüfung liest diese Sätze (`grep` in `tests/`, `werkzeug/`: nur Kommentare).

## Y-1 · PROMPT Z. 107

**alt:**
```text
  - Wischen nach links auf ein Reiselogbuch (seit 3.57.0, AppDesign APD-30, R-7.8): daneben die Kapseln ‚Einstellen‘ (settings) und ‚Löschen‘
```
**neu:**
```text
  - Wischen nach links auf ein Reiselogbuch (R-7.8): daneben die Kapseln ‚Einstellen‘ (settings) und ‚Löschen‘
```

## Y-2 · PROMPT Z. 109

**alt:**
```text
‚Reiselogbuch löschen‘, über die Kapseln hinaus wird nichts ausgelöst (seit 3.57.2, wie Notizen).
```
**neu:**
```text
‚Reiselogbuch löschen‘, über die Kapseln hinaus wird nichts ausgelöst (wie Notizen).
```
(‚wie Notizen‘ bleibt – Vorbild, kein Datum.)

## Y-3 · PROMPT Z. 124

**alt:**
```text
Die Spalte ‚🚶🏽‍♂️km‘ zeigt nur die Zahl, rechtsbündig.
```
**neu:**
```text
Die Spalte ‚🚶🏽‍♂️km‘ zeigt nur die Zahl.
```
(wie D-46 Nr. 16 – ‚rechtsbündig‘ steht in R-6.7)

Wörter: 37 → 30. Dazu eine Zeile im CHANGELOG 3.57.5 (‚Regeln‘) und in der AppDesign-Backlog-Zeile von APD-135.
