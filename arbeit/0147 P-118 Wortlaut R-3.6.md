# P-118/F-1 – Wortlaut R-3.6 (0 Nr. 29)

**Stand 21.11.2026** · Sitzung 0147 · gewählt: **Variante B** (Muster `arbeit/0147 P-118 Muster.html`)

Geändert wird nur der erste Satzteil von R-3.6, alles danach bleibt.

**Alt:**
solange der Finger liegt, wird eine Schaltfläche blass (Icon und Text 35 %), ein Leisten-Knopf hebt sich als helle Fläche mit Schatten (1,3-fach) über die
Kapsel, eine Listen- oder Tabellenzeile grau – Schaltflächen sofort, …

**Neu:**
solange der Finger liegt, hebt sich **jede Schaltfläche** als helle Fläche mit Schatten und wird größer – **1,3-fach, höchstens aber 24 px breiter** (eine
Leisten-Schaltfläche über ihre Kapsel; ‚Bewegung reduzieren‘: nur Schatten) –, eine Listen- oder Tabellenzeile wird grau – Schaltflächen sofort, …

**Spalte ‚Prüfung‘:** bleibt `ablauf.mjs – checkBeruehren; hig.mjs – jede Schaltfläche in jeder Ansicht; katalog.mjs – APD-140/Z-6`. `checkBeruehren` prüft künftig
jede Schaltfläche (heben, Maß nach Variante B, ‚Bewegung reduzieren‘), mit Gegenprobe P-118/T-6 (rot gegen 4.67.1: `#bkMenu`, ‚Backup erstellen‘).

**AD-Bean:** keine, weil das Heben ein Grundstil von `design.css` und `ui.js` (`GROSS_SEL`) ist. `GROSS_SEL` wird auf alle Schaltflächen erweitert.
