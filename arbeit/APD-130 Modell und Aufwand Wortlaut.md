# APD-130 – Neue Sitzung mit dem Modell und Aufwand dieses Chats (Wortlaut, 0 Nr. 29)

**14.11.2026 · Sitzung 0113** · Wunsch des Nutzers: ‚Beim Starten eines neuen Chats startest du diesen immer mit dem Opus-5.5-Modell und Aufwand
hoch. Bitte ändere dies so, dass du immer mit dem Modell und Aufwand startest, der gegenwärtig im Chat eingestellt ist.‘

## Geht das?

Ja.
- **Modell:** `create_session` übernimmt ohne Angabe von selbst das Modell dieses Chats. Laut Werkzeugbeschreibung: ‚Defaults to the calling
  session's model‘. Maßgeblich ist `session_context.model` aus `get_session`, also das eingestellte Modell, auch nach `/model`. Ein
  vorübergehender Rückfall bei hoher Last (`last_served_model`, `model_fallback`) zählt nicht.
- **Aufwand:** `create_session` hat inzwischen ein Feld `effort` (low, medium, high, xhigh, max). Laut Werkzeugbeschreibung wird es ‚not
  inherited from this session‘, also muss Claude es ausdrücklich mitgeben. Der eingestellte Wert steht als `"effort"` beim letzten eigenen
  Modell-Aufruf in der Sitzungsdatei, auch nach `/effort`. Die Regel 2.5 ‚`create_session` kann ihn nicht setzen‘ ist damit überholt.
- **Grenze (aus der Werkzeugbeschreibung):** Eine Grenze der Organisation, das Modell oder die Umgebung können den Aufwand senken oder ersetzen.
  Darum nennt die neue Sitzung im Lagebild, was tatsächlich läuft (wie bisher).

## Wortlaut alt → neu (Zusammenarbeit allgemein, Version 3.13.0)

**APD-130/W-1 – 0 Nr. 13**

- Alt: ‚… und die neue Sitzung selbst starten – Opus 5.5, Aufwand hoch, Name `<App> <Chatnummer> – <Thema>` (2.5).‘
- Neu: ‚… und die neue Sitzung selbst starten – mit dem Modell und dem Aufwand, die in diesem Chat gerade eingestellt sind, Name
  `<App> <Chatnummer> – <Thema>` (2.5).‘

**APD-130/W-2 – 2.5 ‚Neue Sitzung starten‘, erster Satz**

- Alt: ‚`create_session` in derselben Umgebung mit `model: claude-opus-5-5`, Repo AppDesign angehängt; …‘
- Neu: ‚`create_session` in derselben Umgebung mit dem Modell und dem Aufwand, die in diesem Chat gerade eingestellt sind – `model` =
  `session_context.model` aus `get_session` (nicht ein vorübergehender Rückfall), `effort` = `"effort"` des letzten eigenen Modell-Aufrufs in der
  Sitzungsdatei –, Repo AppDesign angehängt; …‘

**APD-130/W-3 – 2.5 ‚Aufwand hoch‘ (ganzer Punkt)**

- Alt: ‚**Aufwand hoch:** `create_session` kann ihn nicht setzen; er kommt aus der Umgebungsvariablen `CLAUDE_CODE_EFFORT_LEVEL=high` (setzt der
  Nutzer: Umgebungsmenü in der Titelleiste → Bearbeiten → Umgebungsvariablen) und gilt dann auch für Chats, die der Nutzer selbst öffnet.‘
- Neu: ‚**Aufwand:** `create_session` übernimmt ihn nicht von selbst – Claude gibt ihn mit (`effort`). Für Chats, die der Nutzer selbst öffnet, gilt
  die Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL` (setzt der Nutzer: Umgebungsmenü in der Titelleiste → Bearbeiten → Umgebungsvariablen).‘

**APD-130/W-4 – 2.5 ‚Lagebild prüft Modell und Aufwand‘, zweiter bis vierter Satz**

- Alt: ‚Die Claude-App zeigt im Chat ggf. ‚mittel‘, obwohl die Aufrufe mit ‚hoch‘ laufen – dann stellt der Nutzer sie zur Sicherheit auf ‚hoch‘.
  Ist es nicht Opus 5.5 bzw. nicht ‚hoch‘, weist Claude darauf hin: für diese Sitzung `/model` bzw. `/effort high`, dauerhaft die
  Umgebungsvariable.‘
- Neu: ‚Die Claude-App zeigt im Chat ggf. einen anderen Aufwand, als die Aufrufe haben – maßgeblich sind die Aufrufe. Claude nennt Modell und
  Aufwand im Lagebild; ändern kann der Nutzer sie für diese Sitzung mit `/model` bzw. `/effort`, dauerhaft über die Umgebungsvariable.‘
- Der Rest des Punkts (Rückfall bei hoher Last, `model_fallback`) bleibt.

**APD-130/W-5 – 2.2 ‚Kontext‘, letzter Satz**

- Alt: ‚Läuft der letzte Aufruf nicht mit Opus 5.5, hängt es ‚⚠ Modell …‘ an (2.5).‘
- Neu: ‚Läuft der letzte Aufruf mit einem anderen Modell als die Sitzung eingestellt hat (Rückfall bei hoher Last, `model_fallback`), hängt es
  ‚⚠ Modell …‘ an (2.5).‘
- Dazu eine Änderung am Werkzeug: `werkzeug/messung.mjs` vergleicht heute fest mit `claude-opus-5-5` (`MODELL`, Zeile 107). Neu vergleicht es mit
  dem eingestellten Modell, dazu kommt eine Prüfung in `tests/messung.mjs`. Das ist Code und kommt deshalb in die nächste Version.

## Einordnung

- **Version:** Zusammenarbeit 3.13.0 (Neben) mit der nächsten AppDesign-Version. Mit APD-129 Teil 2 sind das zwei Themen in 4.59.2 (0 Nr. 8).
- **Nicht betroffen:** die AppDesign-`CLAUDE.md` (nennt kein Modell). Der Regelwächter (`werkzeug/regelwaechter.mjs`, `SOLL_MODELL`) ist
  abgeschaltet (APD-123) und bleibt unverändert.
- **Backlog:** APD-130, Prio 1. Status ‚bereit‘ nach deinem ‚Ja‘ zum Wortlaut.

## Stand nach der Bestätigung (14.11.2026, Sitzung 0113)

- **Ja, bitte sofort umsetzen** (Nutzer 14.11.2026).
- W-1 bis W-4 sind in Zusammenarbeit allgemein **3.13.0** auf `main` umgesetzt und gelten ab der nächsten Sitzung. In die feste Fassung
  kommen sie mit der nächsten AppDesign-Version.
- W-5 kommt mit der nächsten AppDesign-Version, weil dafür Code (`werkzeug/messung.mjs`) und eine Prüfung (`tests/messung.mjs`) nötig sind.
  Ohne diese Änderung stünde in der Regel etwas, das das Werkzeug noch nicht tut. Bis dahin hängt `messung.mjs` bei einem anderen Modell als
  Opus 5.5 weiter ‚⚠ Modell …‘ an. Das ist nur ein Hinweis, er stört nichts.
