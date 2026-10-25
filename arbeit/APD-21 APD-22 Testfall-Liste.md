# APD-21 und APD-22 – Testfall-Liste

**Stand 18.10.2026** · Sitzung Reiselogbuch 0013 · geplant: **AppDesign 4.25.0** und **Reiselogbuch 3.23.0**
(Reiselogbuch wird auf Fassung 4.25.0 gehoben – nur mit deinem Ja; zwei Themen: Suche, Kapsel). Muster:
`arbeit/APD-21 APD-22 Muster.html`. Reiselogbuch: RLB-93.

## APD-21 – Suche mit mehreren Begriffen (UND, R-2.3 erweitert, allgemein)

**Heute (4.24.0):** der ganze Text der Suche ist **ein** Begriff – ‚sydney pizza‘ findet nur genau diese Folge.
**Apple (Mail, Notizen, Fotos):** Wörter mit Leerzeichen = **alle** müssen vorkommen, Reihenfolge egal; jedes Wort wird
markiert. Mail kennt zusätzlich „…“ für eine genaue Wortfolge.

**Vorschlag:**
- Leerzeichen trennt Wörter; ein Eintrag passt, wenn **jedes** Wort darin vorkommt (Groß/klein egal, wie heute).
- **Was ‚ein Eintrag‘ ist (Entscheidung):**
  - **Variante A (Vorschlag):** ein **Tag** – alle Wörter am selben Tag (in Verlauf, ‚Wie war was?‘, Essen, Quartier, gemischt).
    Die zentrale Liste zeigt ein Reiselogbuch, wenn mindestens ein Tag passt; ‚N Treffer‘ = genau die Markierungen, die das
    Reiselogbuch danach zeigt (wie heute 1:1).
  - **Variante B:** das ganze **Reiselogbuch** – Wörter dürfen an verschiedenen Tagen stehen. Nachteil: geöffnet wird nach
    Tagen gefiltert, dann zeigt jeder Tag nur einen Teil der Wörter – ‚N Treffer‘ in der Liste und ‚1 von N‘ im Eintrag
    müssten anders zählen.
- Markiert und gezählt werden **alle** Wörter (je Fundstelle); ‚1 von N‘ läuft in Lesereihenfolge durch alle.
- **Genaue Wortfolge mit „…“ (Entscheidung):** ‚„Opera House“ sydney‘ = Folge ‚Opera House‘ und dazu ‚sydney‘ (wie Mail) –
  ja oder nein.
- Gebaut als gemeinsamer Baustein in `ui.js` (Wörter zerlegen, ‚passt‘, Markierung), damit jede App gleich sucht; die App
  sagt nur, welche Felder ein Eintrag hat.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| S1 | ein Wort (‚sydney‘) | genau wie heute (Filter, ‚1 von N‘, Sprung, Liste) | vorhanden (`checkSearch`, `checkListSearch`) |
| S2 | ‚sydney opera‘, beide am selben Tag im Verlauf | Tag bleibt, beide Wörter gelb, N = Summe der Fundstellen | neu `checkSearchWords` |
| S3 | ‚opera sydney‘ (umgekehrt) | genau wie S2 | checkSearchWords |
| S4 | Wörter in verschiedenen Feldern desselben Tags (Verlauf + Essen) | Tag bleibt, beide markiert | checkSearchWords |
| S5 | nur ein Wort kommt am Tag vor | Tag fällt weg (Var. A) | checkSearchWords |
| S6 | Wörter an verschiedenen Tagen, keiner hat beide | Var. A: ‚0‘, ‚Keine Treffer‘ in der Liste | checkSearchWords |
| S7 | mehrere Leerzeichen, Leerzeichen am Anfang/Ende (‚ sydney  ‘) | wie ein Wort ‚sydney‘ | checkSearchWords |
| S8 | beim Tippen: ‚sydney ‘ → ‚sydney o‘ | nach dem Leerzeichen unverändert, dann sofort mit ‚o‘ gefiltert | checkSearchWords |
| S9 | dasselbe Wort doppelt (‚rom rom‘) | wie ‚rom‘, nicht doppelt gezählt | checkSearchWords |
| S10 | Wörter überlappen (‚oper opera‘) | eine Markierung über die längere Stelle, einmal gezählt | checkSearchWords |
| S11 | ‚1 von N‘, Pfeile, Eingabetaste | laufen durch alle Markierungen aller Wörter in Lesereihenfolge, ohne Umlauf | checkSearchWords |
| S12 | zentrale Liste mit zwei Wörtern | nur passende Reiselogbücher, ‚N Treffer‘ = ‚1 von N‘ nach dem Öffnen | `checkListSearch` erweitert |
| S13 | beide Suchfelder offen (iPad) | Eingabe mit Leerzeichen 1:1 im anderen Feld | checkListSearch |
| S14 | „Opera House“ sydney (falls ja) | Folge als ein Begriff, dazu ‚sydney‘ | checkSearchWords |
| S15 | nur ein Anführungszeichen (‚„opera‘) | wie ohne Anführungszeichen (‚opera‘), kein Fehler | checkSearchWords |
| S16 | Sonderzeichen (‚(‘, ‚.‘, ‚*‘) und Umlaute (‚Würzburg‘) | gefunden wie Text, kein Fehler | checkSearchWords |
| S17 | sehr lange Wörter mit unsichtbaren Umbruchstellen (R-6.3) | trotzdem markiert | vorhanden (highlight) |
| S18 | iPad quer/hoch, iPhone hoch/quer, hell/dunkel | gleich | voller Lauf |
| S19 | Gegenprobe | mit 4.24.0 sind S2–S6, S12 rot | `--gegenprobe` |

**Nur am Gerät (Testfälle):** Tippen mit der Bildschirmtastatur und Diktieren (‚sydney opera‘), Leerzeichen-Vorschläge der
Tastatur (iOS setzt nach einem Wort-Vorschlag ein Leerzeichen).

## APD-22 – Lupe am Ende der Kapsel

**Heute:** Eintrag (iPad und iPhone) [share | search | ellipsis] – Lupe schon vor dem Mehr-Menü; zentrale Liste
[search | plus | ellipsis] – Lupe vorne.
**Apple (iOS/iPadOS 26):** Suche steht am Ende der Leiste, dahinter höchstens das Mehr-Menü (…); in vielen Apps (Mail,
Dateien) ist die Lupe eine **eigene** runde Schaltfläche neben der Kapsel.

**Varianten (im Muster):**
- **V1 (Vorschlag):** Lupe in der Kapsel direkt vor ‚…‘ – überall gleich: Liste [plus | search | ellipsis], Eintrag bleibt
  [share | search | ellipsis]. Kleinste Änderung, eine Regel.
- **V2:** Lupe als eigene runde Schaltfläche **vor** der Kapsel: Liste (search) [plus | ellipsis], Eintrag (search)
  [share | ellipsis]. Näher an Mail, braucht etwas mehr Breite (iPhone hoch prüfen).

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| L1 | Kopf der zentralen Liste (iPad Seitenleiste, iPhone Startliste) | Reihenfolge nach Variante | neu `checkSearchPlace` (hig) |
| L2 | Kopf des Eintrags (iPad, iPhone) | Reihenfolge nach Variante | checkSearchPlace |
| L3 | Liste ohne Einträge | keine Lupe; Kapsel [plus | ellipsis] | checkSearchPlace |
| L4 | Lupe gedrückt (Suche offen) | blau markiert innerhalb der Kapsel (V1) bzw. runde Schaltfläche blau (V2) | checkSearchPlace |
| L5 | iPhone hoch, langer Titel | Titel kürzt mit …, nichts überlappt (V2 braucht 1 Schaltfläche mehr Platz) | hig (Überlauf) |
| L6 | Maße | Kapsel 44 px, Icons 48 px, Abstand 12 px (15.5) | hig |
| L7 | hell und dunkel, iPad quer/hoch, iPhone hoch/quer | gleich | voller Lauf |
| L8 | Neue App aus `vorlage/` | Vorlage folgt der Variante | checkSearchPlace in der Vorlage |
| L9 | Gegenprobe | mit 4.24.0 L1 rot | `--gegenprobe` |

**Regeltext neu:** 15.3/15.5 und R-3.x: ‚**Suche steht am Ende**, dahinter nur das Mehr-Menü (…)‘ (V1) bzw. ‚Suche als eigene
runde Schaltfläche vor der Kapsel‘ (V2).

**Nur am Gerät (Testfälle):** Gefühl, ob die Lupe dort gefunden wird; Daumen-Erreichbarkeit iPhone.

## Entschieden (18.10.2026)

- APD-21: **Variante B** – ein Eintrag ist das ganze **Reiselogbuch** (Wörter dürfen an verschiedenen Tagen stehen); gezeigt
  werden die Tage mit mindestens einem Wort, gezählt alle Markierungen. S5/S6 gelten damit je Reiselogbuch.
- „…“ = genaue Wortfolge: **ja, als allgemeine Regel** (R-2.3).
- APD-22: **V1** – Lupe in der Kapsel direkt vor ‚…‘.
- Bauen: **Ja** – AppDesign 4.25.0, Reiselogbuch 3.23.0 auf Fassung 4.25.0.
