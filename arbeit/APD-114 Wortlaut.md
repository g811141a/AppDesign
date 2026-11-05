# APD-114 Kontext in der Bau-Frage, ein Fenster je Antwort (Wortlaut)

Stand 05.11.2026 · Sitzung Reiselogbuch 0080 · **Wortlaut bestätigt (Nutzer 05.11.2026, Sitzung 0080, 0 Nr. 29).**

Anlass: In 0080 stand der Satz ‚Kontext 161.093‘ vor der Bau-Frage, aber als dritter von vier Fenstern derselben Antwort – Text zwischen
zwei Fenstern kommt beim Nutzer nicht an (2.1). Der Regelwächter ließ das Fenster durch, weil der Satz in der Sitzungsdatei stand.

| Stelle | alt | neu |
|---|---|---|
| Zusammenarbeit 0 Nr. 21 | Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen? Ja/Nein‘ (Kontextstand davor: Nr. 28). | Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen? (Kontext N) Ja/Nein‘ – der Kontextstand aus `messung.mjs` steht **in der Frage selbst** und davor im Chat (Nr. 28). |
| Kasten ‚Jede Antwort‘ 9 | Vor **jedem Auswahlfenster**: der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs`, abgelesen (Nr. 28). **W** | Vor **jedem Auswahlfenster**: der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs`, abgelesen (Nr. 28); bei der Bau-Frage zusätzlich in der Frage selbst (Nr. 21). **W** |
| 2.8 ‚Vor jedem Auswahlfenster‘ | – | neu: lehnt eine Bau-Frage (‚Soll ich Version …‘) ohne ‚Kontext N‘ im Fragetext ab, ebenso ein zweites Fenster in derselben Antwort |

Testfall-Liste (automatisch, `tests/regelwaechter.mjs`) folgt vor dem Bau (0 Nr. 1).
