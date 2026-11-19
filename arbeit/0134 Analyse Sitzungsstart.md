# Analyse – warum die neue Sitzung nicht automatisch startet

**Stand 19.11.2026** · Sitzung 0134

## Befund (belegt in dieser Sitzung)

- `create_session` wurde **abgelehnt vom Prüfer des Modus ‚auto‘** mit dem Grund **‚Unsanctioned Communication‘** (nicht freigegebene Kommunikation). Die
  Meldung nennt die Abhilfe: eine Erlaubnis-Regel für `mcp__claude-code-remote__create_session` in den Einstellungen.
- Diese Sitzung läuft im Modus **‚auto‘** (`get_session`: `permission_mode: auto`). Den Modus legt die Oberfläche fest, die die Sitzung startet – im Chat
  lässt er sich nicht umstellen.
- Es gibt **keine Erlaubnis-Regel**: `~/.claude/settings.json` ist leer (`{}`), im Repo AppDesign gibt es keine `.claude/settings.json`.
- Die Sitzungskette ist nicht das Problem: `lineage depth 1, limit 8` (in 0126 war die Grenze von 8 einmal der Grund).

## Ursache (Vermutung)

Im Modus ‚auto‘ prüft ein Prüfer jede Handlung, die nach außen wirkt. Eine neue Sitzung zu starten und ihr eine Nachricht zu schicken, sieht er als
Kommunikation – ohne ausdrücklichen Auftrag von dir **in diesem Chat** lehnt er ab. Der Starttext dieser Sitzung kam als Systemmeldung, nicht als deine Nachricht,
und bei der Übergabe-Frage hattest du ‚Ich schreibe im Chat‘ gewählt – ein ausdrückliches ‚starte die neue Sitzung‘ fehlte also. Ob es früher ging, weil die
Sitzungen in einem anderen Modus liefen, kann ich nicht belegen.

## Was du tun kannst

1. **Dauerhaft (empfohlen):** eine Erlaubnis-Regel im Repo AppDesign – Datei `.claude/settings.json` mit
   `{ "permissions": { "allow": ["mcp__claude-code-remote__create_session"] } }`. Jede Sitzung klont AppDesign, die Regel gilt dann immer. Ich lege sie nach
   deinem Ja an (Commit auf `main`). `~/.claude/settings.json` hilft nicht dauerhaft – der Container wird nach jeder Sitzung neu gebaut.
2. **Im Einzelfall:** bei der Übergabe ausdrücklich antworten ‚Ja, übergeben und neue Sitzung starten‘ – das ist dann ein Auftrag von dir. Ob der Prüfer das
   sicher annimmt, weiß ich nicht.
3. **Rückfall wie heute:** neuen Chat in derselben Umgebung öffnen und den Starttext aus `UEBERGABE.md` einfügen.
