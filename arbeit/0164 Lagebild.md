# Lagebild – Sitzung Reiselogbuch 0164

**26.11.2026, 17:13 MEZ** · Thema: Usertest P-125 (Reiselogbuch 3.58.5 / AppDesign 4.70.2)

## Versionen

| Teil | Version | Beleg |
|---|---|---|
| Reiselogbuch | **3.58.5** veröffentlicht | `index.html` `APP_VERSION = '3.58.5'`, `AD_NEEDED = '4.70.2'`; Pages success (a4c26f0) |
| AppDesign | **4.70.2** veröffentlicht | `v4/ui.js` `AD_VERSION = '4.70.2'`; Pages success (0790800) |
| ReiseLogBuch-Import (privat) | **1.4.0** (Versionsgeschichte, `PROMPT.md`) | Kopf der `README.md` nennt noch **1.3.0** – auffällig, nicht geändert |
| Zusammenarbeit allgemein | **3.19.0** | Kopf der Datei |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch **3.10.0** · Import **1.2.0** | Kopf der Dateien |

## Offene Usertests

- **P-125** (Reiselogbuch 3.58.5 / AppDesign 4.70.2) – **Rückmeldung steht aus**; P-125/0 bis P-125/4 (CHANGELOG 3.58.5).
  Ersetzt den offenen Punkt von P-124 (/1).
- P-124, P-123, P-122: ‚nicht ok‘ gemeldet, ihre offenen Punkte sind durch die jeweils nächste Version ersetzt; sie wandern bei
  ‚P-125 ok‘ nach ‚Erledigt‘.

## Backlog-Spitze

- **Reiselogbuch:** ‚0. Nächste Version‘: 0 Punkte bereit · offen: RLB-126 ‚Zuletzt gelöscht‘ (3), RLB-6 Ausschreibungstexte (3).
- **AppDesign:** ‚0. Nächste Version‘: 0 Punkte bereit · Prio 1: APD-135 Konsolidierung 3, APD-136 AD-Beans, **APD-149** Framework mit
  Steuer-Bean, APD-148 AD-Bean `backup` · Prio 2: APD-139, APD-141, APD-142, APD-145 · Prio 3: APD-70, APD-147.
- **Frage aus 0163 (offen):** `aria-expanded` fehlt nach Neuaufbau bei offenem Menü (R-1.8) – ins Backlog? (kommt nach dem Usertest).

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`) – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei);
  kein `model_fallback`.
- **Aufwand:** **hoch** – eingestellt (`effort_level: high`) und tatsächlich (`"effort":"high"` in allen Modell-Aufrufen der Sitzungsdatei);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed (zurückgesetzt 26.11.2026, 19:20 MEZ).
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Arbeitsumgebung

- Repos unter `/home/user`: AppDesign (0790800), ReiseLogBuch (a4c26f0), ReiseLogBuch-Import (2ec7d03); kleingeschriebene Verweise
  angelegt und registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht); 4 Kerne;
  Chromium 158 (Ordner 1243, Verweise 1194 → 1243), WebKit 26.0 (Ordner 2215) – beide starten.

## Nächster Schritt (UEBERGABE.md Abschnitt 3)

1. Usertest **P-125** vollständig in Datei und Chat, dann im Fenster ‚P-125: alles ok / nicht ok‘ (ohne Empfehlung).
2. Bei ‚nicht ok‘: Ablauf als feste Prüfung nachbauen (0 Nr. 1), rot gegen 3.58.5 in Chromium und WebKit; bei ‚ok‘: P-125 bis
   P-122 nach ‚Erledigt‘.
3. Frage `aria-expanded` nach Neuaufbau ins Backlog (mit Priorität und Empfehlung).
