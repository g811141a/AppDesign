# Brainstorming: Prüfumfang nach Art der Änderung

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0107‘ · nur Meinung, nichts gebaut, keine Regel geändert

## Was gerade passiert

- Zusammenarbeit 0 Nr. 2 schreibt vor: **genau einmal je Version der volle Prüflauf** im Veröffentlichungs-Skript. Das sind Chromium und WebKit, alle Ansichten
  und alle 59 Prüfdateien der App, beim letzten Mal 152 Läufe in 71:55 min. Das gilt unabhängig davon, wie groß die Änderung ist.
- Für 3.55.1 heißt das: Eine Zeile Text im Teilen-Menü löst denselben Lauf von etwa 60 min aus wie eine Sammelversion mit 10 Punkten.

## Meine Meinung

**Du hast recht: Für eine reine Textänderung ist der volle Lauf unverhältnismäßig.** Ganz ohne Prüfung geht es aber nicht. Auch an dieser kleinen Änderung
musste ich eine Prüfung anpassen (`ablauf-gesamt` erwartet die Menüpunkte wörtlich). Ein langer Titel kann außerdem auf dem iPhone oder bei großer Schrift
umbrechen oder abgeschnitten werden. Betroffen ist also nicht nur die eine Zeile, sondern **alles, was diesen Text oder diese Stelle (Teilen-Menü) berührt**.

## Vorschlag: drei Stufen

| Stufe | Wann | Was läuft | Dauer (Schätzung) |
|---|---|---|---|
| 1 Text | nur Texte der App (Menü, Fenster, Hinweise, Doku), keine Logik, kein CSS, AppDesign unverändert | Prüfungen, die den geänderten Text oder die Stelle enthalten (automatisch aus dem Unterschied gesucht), dazu Doku-, Versions- und Grundregeln für diese Stelle in allen Ansichten, Chromium und WebKit | wenige Minuten |
| 2 App | Logik oder Aussehen nur in der App | Stufe 1 und alle Prüfungen des betroffenen Bereichs (z. B. Tag erfassen, Ausgabe, Seitenleiste) | 10–20 min |
| 3 AppDesign | `ui.js`, `design.css`, neue Fassung, Regeln | **voller Lauf** wie heute, weil es überall wirkt | ~60 min |

- **Wer entscheidet die Stufe:** Das Skript schlägt sie aus dem Unterschied vor (welche Dateien, welche Zeilen), ich nenne sie in der Bau-Frage, du bestätigst.
  Im Zweifel gilt die höhere Stufe.
- **Sicherheitsnetz:** Die nächste Version mit Stufe 3 (oder spätestens die nächste Sammelversion) prüft wieder alles. Was eine Stufe 1 übersieht, fällt also
  spätestens dort auf.
- **Auch der Rest wird schlanker:** Bei Stufe 1 genügen eine kurze Testfall-Liste und ein kleiner Usertest (/0 und ein bis zwei Fälle). Für 3.55.1 wären
  P-102/0 und /1 genug gewesen.

## Risiko

Stufe 1 nimmt bewusst ein kleines Risiko in Kauf: Eine Nebenwirkung an einer Stelle, die den Text nicht enthält, würde erst beim nächsten vollen Lauf
oder am Gerät auffallen. Bei reinen Texten halte ich das für vertretbar.

## Was es bräuchte (später, nur nach deinem ‚Ja‘)

- neues Thema im AppDesign-Backlog (z. B. **APD-128 ‚Prüfumfang nach Art der Änderung‘**)
- Wortlaut für Zusammenarbeit 0 Nr. 2 (Bestätigung nach 0 Nr. 29)
- Auswahl der Prüfungen im Veröffentlichungs-Skript (`los --stufe 1`) mit Selbsttest

## Der laufende Lauf (3.55.1)

Er läuft seit wenigen Minuten. Das Skript kennt heute nur den vollen Lauf. Ein Abbruch und eine Veröffentlichung von Hand würden 0 Nr. 9 umgehen.
**Empfehlung:** ihn diesmal zu Ende laufen lassen.

## Übergabe

Der Kontext liegt bei etwa 290.000 Token. Nach der Veröffentlichung von 3.55.1 und dem Bericht übergebe ich an **Reiselogbuch 0108** (0 Nr. 13).
