# APD-125 – Datei vor jeder Kachel (Wortlaut)

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0098‘ · Anlass: das Lagebild fehlte vor der Kachel. Du willst, dass alle relevanten Texte,
Informationen, der Testlink und die Tests vor der Kachelfrage in einer Datei stehen, und zwar verbindlich und allgemein (Nutzer 08.11.2026).

**Bisher:** Eine Datei kommt nur dann zusätzlich, wenn du etwas tun sollst (prüfen, testen, entscheiden). Das Lagebild stand nur im Chat
(0 Nr. 15), und ob etwas in die Datei gehört, habe ich bisher selbst entschieden.
**Neu:** vor **jedem** Fenster genau eine Datei mit allen wichtigen Informationen der Antwort, auch wenn die Frage im Fenster nicht danach
fragt (z. B. das Lagebild). Es gibt keine Ausnahme und nichts abzuwägen.

**Ergänzt (Nutzer 08.11.2026):** Wichtige Informationen wie das Lagebild gehören immer in die Datei, auch wenn die Kachelfrage nicht danach
fragt. Deshalb heißt es in V-1 und V-2 jetzt ‚alle wichtigen Informationen der Antwort‘ statt ‚alles, worauf sich die Frage bezieht‘.

Geändert werden drei Stellen der Zusammenarbeit allgemein (3.10.0 → 3.11.0).

---

## APD-125/V-1 – Kasten ‚Jede Antwort‘, Punkt 4

**Alt:**

> 4. **Alles zum Lesen vor der Kachel:** Link, nummerierte Schritte mit ‚Erwartet: …‘, Bericht, Wortlaut, Muster und alle offenen
>    Usertests stehen vor dem Fenster – im Chat und, wenn der Nutzer dabei etwas tun soll (prüfen, testen, entscheiden), zusätzlich als
>    Datei im Seitenbereich (`SendUserFile`, `display: 'render'`), die neben der offenen Kachel lesbar bleibt; das Fenster selbst nur mit der
>    kurzen Frage, ohne Link (Nr. 11, 2.1, 2.3).

**Neu:**

> 4. **Datei vor jeder Kachel:** vor jedem Fenster stehen alle wichtigen Informationen der Antwort in **einer Datei** im Seitenbereich
>    (`SendUserFile`, `display: 'render'`), die neben der offenen Kachel lesbar bleibt. Das gilt auch dann, wenn die Frage im Fenster nicht
>    danach fragt. Dazu gehören Lagebild, Bericht, Wortlaut alt und neu, Muster, der vollständige Testlink, nummerierte Schritte mit
>    ‚Erwartet: …‘ und alle offenen Usertests vollständig. Derselbe Inhalt steht auch im Chat. Das gilt ohne Ausnahme. Das Fenster selbst
>    enthält nur die kurze Frage, ohne Link (Nr. 11, 15, 2.1, 2.3).

## APD-125/V-2 – 2.1, Punkt ‚Der Text davor, das Fenster danach‘ (nur der erste Satz)

**Alt:**

> - **Der Text davor, das Fenster danach:** alles, was der Nutzer vor einer Entscheidung lesen muss – Link, Schritte, Bericht, Wortlaut
>   (0 Nr. 29), Muster, Erklärungen –, steht vor dem Fenster: im Chat und, wenn der Nutzer dabei etwas tun soll, zusätzlich als Datei im
>   Seitenbereich (`SendUserFile`, `display: 'render'`), die neben der offenen Kachel lesbar bleibt (Kasten Punkt 4); das Fenster nur mit
>   der kurzen Frage, ohne Link. Nie zwei Fenster …

**Neu:**

> - **Die Datei davor, das Fenster danach:** alle wichtigen Informationen der Antwort (Lagebild, Link, Schritte, Testfälle, Bericht,
>   Wortlaut nach 0 Nr. 29, Muster, Erklärungen) stehen vor jedem Fenster in einer Datei im Seitenbereich (`SendUserFile`,
>   `display: 'render'`) und ebenso im Chat (Kasten Punkt 4), auch wenn die Frage im Fenster nicht danach fragt. Das Fenster enthält nur die kurze Frage, ohne Link. Nie zwei Fenster …
>   *(Rest des Punkts unverändert)*

## APD-125/V-3 – 0 Nr. 15, Lagebild

**Alt:**

> … als **eigene Antwort** vor jeder Arbeit, auch wenn der Starttext einen Auftrag hat: das Lagebild im Chat, danach das Fenster (2.1); …

**Neu:**

> … als **eigene Antwort** vor jeder Arbeit, auch wenn der Starttext einen Auftrag hat: das Lagebild im Chat und als Datei, danach das
> Fenster (2.1); …

---

**Prüfung:** Die Regel bleibt eine Selbstkontrolle. Eine technische Prüfung baue ich nicht ein (Nutzer 08.11.2026).

**Ab wann:** Ich halte mich ab deinem ‚Ja‘ sofort daran. Der Text kommt mit der nächsten AppDesign-Version in die Zusammenarbeit 3.11.0
(Sammelversion, 0 Nr. 8), dazu APD-125 mit Priorität 1 in ‚0. Nächste Version‘ im AppDesign-Backlog.
