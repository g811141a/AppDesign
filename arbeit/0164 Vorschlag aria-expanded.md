# P-125 erledigt · Vorschlag neues Thema `aria-expanded`

## Eingetragen

- **P-125: alles ok** (Nutzer 26.11.2026, Sitzung 0164). P-125, P-124, P-123 und P-122 stehen in beiden Backlogs unter ‚Erledigt‘.
  - Reiselogbuch: Commit 571f2e8
  - AppDesign: Commit 9ea6435
- `doku-regeln` (Chromium) meldet: alles in Ordnung.
- **Auf iPad und iPhone prüfen:** Es ist kein Usertest mehr offen.

## Vorschlag: neues Thema APD-150 (allgemein)

**Befund aus 0163 (Beleg: UEBERGABE.md, Abschnitt 2):** Baut die Seite bei offenem Menü neu auf (z. B. die Kopfzeile), entsteht eine
neue Schaltfläche. Sie trägt bis zum Schließen des Menüs kein `aria-expanded`. VoiceOver kündigt sie dann nicht als ‚aufgeklappt‘ an.
Das verletzt R-1.8 („jedes Bedienelement mit Namen, Rolle und Zustand“). Die Grundregeln haben es mitten im künstlichen Neuaufbau
gemeldet. Die Prüfung prüft die Grundregeln aber erst nach dem Schließen.

**Vorschlag:** Das Menü (`openMenu`) überträgt beim Neuaufbau den Zustand auf die neue Schaltfläche, so wie es `sourcehighlight`
seit 4.70.2 mit der Tönung macht (Tausch alt → neu). Die Prüfseite bekommt einen Teil ‚Neuaufbau bei offenem Menü‘, der die Grundregeln
**während** das Menü offen ist prüft. Dazu eine Gegenprobe, die rot werden muss.

- **Gilt:** allgemein (AppDesign).
- **AD-Bean:** bestehende Menü-Bean, neue Eigenschaft (Tausch der Quelle); wird in der Klärung festgelegt (R-1.13).
- **So macht es Apple:** In dieser Sitzung nicht recherchiert. *Vermutung:* Systemmenüs (UIMenu) verwaltet iOS selbst, deshalb kann der
  Zustand dort nicht verloren gehen. Die Recherche mit Quelle folgt in der Klärung (0 Nr. 23).
- **Wann es am Gerät vorkommt:** Ein Neuaufbau bei offenem Menü ist selten. Ob ein Abgleich oder ein Tageswechsel ihn auslösen,
  ist eine Vermutung aus 0163.

**Empfehlung: Ja, Priorität 2 (mittel).**
- Es ist ein Regelbruch (R-1.8), deshalb gehört es ins Backlog.
- Es betrifft nur VoiceOver und nur einen seltenen Fall, deshalb nicht Priorität 1.
- Es passt zu APD-149 (Steuer-Bean für alles, was erscheint) und kann dort mit geklärt werden.

## Backlog-Erinnerung

- **Nächste Version:** Reiselogbuch 0 Punkte bereit · AppDesign 0 Punkte bereit.
- **Offen im Backlog:**
  - Prio 1: APD-149 Framework mit Steuer-Bean, APD-135, APD-136, APD-148
  - Prio 2: APD-139, APD-141, APD-142, APD-145
  - Prio 3: RLB-126, RLB-6, APD-70, APD-147 (zuletzt)
