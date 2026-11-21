# Lagebild – Reiselogbuch 0150

**Stand 21.11.2026**

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.11** veröffentlicht (`main` 8997d0b) |
| AppDesign | **4.67.1** veröffentlicht (`main` 2dc80b8, Pages-Lauf erfolgreich) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.18.0** |

## Offener Usertest

**P-118** (Reiselogbuch 3.57.11, AppDesign 4.67.1) – /0, /2 bis /5 ok, **/1 nicht ok** → P-118/F-1 (jede gedrückte Schaltfläche vergrößert sich)
und P-118/F-2 (‚Schaltfläche‘ statt ‚Knopf‘), beide **bereit, nicht gebaut** (Korrekturversion 4.67.2 / 3.57.12, Prüfungen auf Zweig `p118-pruefung`).

- **P-118/0 – Version prüfen:** ‚Reiselogbuch · Version 3.57.11 · … · AppDesign 4.67.1‘ – **ok**
- **P-118/1 – Katalog: Mehr-Schaltfläche rund** – **nicht ok** (F-1, F-2)
- **P-118/2 – Katalog: Schaltflächen lange drücken markiert keinen Text** – **ok**
- **P-118/3 – Katalog: Kachel der Wischaktionen lange drücken** – **ok**
- **P-118/4 – App: ‚Backup erstellen‘ lange drücken** – **ok**
- **P-118/5 – App: Schaltflächen der Sprechblase lange drücken** – **ok**

## Backlog-Spitze

- **AppDesign – 0. Nächste Version 4.67.2:** 2 Punkte bereit (P-118/F-1, P-118/F-2).
- **AppDesign – in Klärung:** APD-135 (darin B-3.3 Schritt 2 als Vorschlag bestätigt), APD-136 (Priorität 1); APD-139, APD-141, APD-142, APD-145
  (Priorität 2); APD-70 (Priorität 3).
- **Reiselogbuch – in Klärung:** RLB-125 (Muster 6 ok, Wortlaute R-4.14 und L-4/L-5 freigegeben; offen: Abgleich, Fazit, iPhone hoch, Bau-Frage),
  RLB-126, RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`; get_session `session_context.model` und `last_served_model`); **kein** `model_fallback` in der Sitzungsdatei.
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (alle 17 Modell-Aufrufe `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (Warnstufe), zurückgesetzt am **26.11.2026, 8:00**.

## Umgebung

- Repos AppDesign, ReiseLogBuch, ReiseLogBuch-Import geklont, Verweise kleingeschrieben, registriert.
- Tests eingerichtet: Playwright 1.56.1; Chromium 157 (`chromium-1243`, Verweise 1194 → 1243), WebKit 26.0 – beide starten. 4 Kerne.
- **Hooks:** `~/.claude/settings.json` leer (`{}`).

## Nächster Schritt (UEBERGABE 3)

1. **Weitere Themen vor dem vollen Lauf** – zur Auswahl: APD-142 (Allgemeines aus der App nach AppDesign), APD-145 (Namensraum `AD`), APD-139 (Wizard),
   APD-141 (Bearbeiten-Menü), RLB-126 (‚Zuletzt gelöscht‘), RLB-125 Rest (Abgleich, Fazit, iPhone hoch).
2. Dann die **Bau-Frage 4.67.2 / 3.57.12** (P-118/F-1 und F-2, voll), dazu je nach Wunsch B-3.3 Schritt 2 und RLB-125 – höchstens 2 Themen je Version.
