# Bericht Reiselogbuch 3.55.1

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0107‘

## Bericht

Reiselogbuch **3.55.1** ist veröffentlicht (Commit 307d86d, Pages ‚success‘ nach 47 s), AppDesign bleibt **4.57.0**. Im Teilen-Menü heißt der Punkt jetzt
**‚PDF (mit iOS 27 zurzeit nicht möglich)‘** (RLB-124/W-1), und zwar immer. Die PDF-Funktion selbst ist unverändert. Anlass: P-101/16 Schritt 3. Die Proben und der Versuch
`arbeit/RLB-124/` zeigen, dass iPadOS 27.2 `print()` in der App vom Home-Bildschirm in jeder Form übergeht, in Safari geht es. Voller Prüflauf: **152 Läufe grün in
70:19**, davon 2 ‚wackelt‘ (WebKit `ablauf-suche-menue` und `ablauf-preis-km`, rot unter Last, allein grün – APD-85). **Bitte die App neu starten.**

## Alle Änderungen

- Teilen-Menü: Titel ‚PDF (mit iOS 27 zurzeit nicht möglich)‘; die graue Zeile ‚Im Drucken-Menü Teilen, dann ‚In Dateien sichern‘‘ ist unverändert.
- `PROMPT.md`: Beschreibung des Teilen-Menüs mit dem neuen Titel.
- Prüfung `ablauf-gesamt`: erwartet den neuen Titel (R-6.4).
- Backlog: P-101 erledigt (ok bis auf /16 Schritt 3 → RLB-124), RLB-124 erledigt, Usertest P-102 angelegt. In AppDesign neu: **APD-128** ‚Prüfumfang nach Art der
  Änderung‘ (Priorität 1).

## Apple-Review

- Titel mit Hinweis in Klammern: **weicht ab**. Apple würde einen Menüpunkt, der nicht geht, ausgegraut zeigen oder ausblenden. Der Punkt bleibt hier
  bewusst wählbar, weil er in Safari druckt (deine Entscheidung ‚immer‘, 13.11.2026).
- HIG- und Regel-Prüfskript (`hig` in allen Darstellungen und Textgrößen, Grundregeln, `ablauf-texte-ablaeufe`): grün im vollen Lauf.
- Warum die Prüfung den Fehler übersah: Die Prüfungen laufen in Chromium und WebKit als Browser. Den Home-Bildschirm-Modus von iOS und sein Drucken-Menü bilden sie
  nicht nach (Gerät).

## Offener Usertest

Testfälle P-102 (Schritt für Schritt, Zusammenarbeit allgemein 3.11.0). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-102/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.55.1 · erstellt am … · AppDesign 4.57.0‘.

**P-102/1 – Hinweis im Teilen-Menü (iPad)**
1. iPad quer, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen.
2. Oben das Teilen-Icon (share) antippen.
3. Erwartet: die Punkte ‚Vorschau‘, ‚HTML‘ und ‚PDF (mit iOS 27 zurzeit nicht möglich)‘, darunter grau ‚Im Drucken-Menü Teilen, dann ‚In Dateien
   sichern‘‘. Menü mit Antippen daneben schließen.

**P-102/2 – Hinweis ganz lesbar (iPhone)**
1. iPhone hoch, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen.
2. Oben das Teilen-Icon (share) antippen.
3. Erwartet: ‚PDF (mit iOS 27 zurzeit nicht möglich)‘ ist ganz zu lesen (bei Bedarf in zwei Zeilen), nichts abgeschnitten, das Menü liegt ganz im
   Bildschirm.

**P-102/3 – Safari druckt weiter**
1. iPad quer, hell: in **Safari** https://g811141a.github.io/ReiseLogBuch/ öffnen und ein Reiselogbuch öffnen.
2. Teilen-Icon (share) antippen, dann ‚PDF (mit iOS 27 zurzeit nicht möglich)‘.
3. Erwartet: derselbe Hinweis im Menü; danach das Fenster ‚Ausgabe V…‘ mit ‚Drucken-Menü geöffnet für‘ und das Drucken-Menü öffnet sich. Drucken-Menü
   schließen, Fenster mit x schließen.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.
