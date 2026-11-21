# Lagebild – Reiselogbuch 0149

**Stand 21.11.2026**

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.11** veröffentlicht (`main` 23173e2) |
| AppDesign | **4.67.1** veröffentlicht (`main` 3d26841) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.18.0** |

## Offener Usertest

**P-118** (Reiselogbuch 3.57.11, AppDesign 4.67.1) – Rückmeldung 0147: /0, /2 bis /5 ok, **/1 nicht ok** → P-118/F-1 (gedrückte Schaltfläche
vergrößert sich nicht) und P-118/F-2 (‚Schaltfläche‘ statt ‚Knopf‘), beide **bereit, nicht gebaut** (Korrekturversion 4.67.2 / 3.57.12).

Testfälle P-118 (aus CHANGELOG 3.57.11):

- **P-118/0 – Version prüfen:** App auf iPhone und iPad ganz schließen, neu öffnen; ‚Reiselogbücher‘ → ‚…‘ (Mehr). Erwartet: ‚Reiselogbuch · Version 3.57.11 ·
  erstellt am … · AppDesign 4.67.1‘. – **ok**
- **P-118/1 – Katalog: Mehr-Schaltfläche rund:** iPad quer, Katalog → ‚Hervorgehobene Quelle‘ → ‚…‘ neben ‚Zweiter Knopf‘. Erwartet: ein Kreis. – **nicht ok**
  (P-118/F-1, F-2)
- **P-118/2 – Katalog: Schaltflächen lange drücken markiert keinen Text** – **ok**
- **P-118/3 – Katalog: Kachel der Wischaktionen lange drücken** – **ok**
- **P-118/4 – App: ‚Backup erstellen‘ lange drücken** – **ok**
- **P-118/5 – App: Schaltflächen der Sprechblase lange drücken** – **ok**

## Backlog-Spitze

- **AppDesign – 0. Nächste Version:** 2 Punkte bereit (P-118/F-1, P-118/F-2).
- **AppDesign – in Klärung:** APD-135 (Konsolidierung 3, darin B-3.3), APD-136 (AD-Beans), APD-139, APD-141, APD-142, APD-145 (Priorität 2), APD-70,
  APD-144 (Priorität 3).
- **Reiselogbuch – in Klärung:** RLB-125 (Reiselogbuch sperren, Muster 2 ‚nicht ok‘, Einzelheiten offen), RLB-126, RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`; get_session `session_context.model` und `last_served_model`); **kein** `model_fallback` in der Sitzungsdatei.
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (alle Modell-Aufrufe `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (Warnstufe), zurückgesetzt am **26.11.2026, 8:00**.

## Umgebung

- Repos AppDesign, ReiseLogBuch, ReiseLogBuch-Import geklont, Verweise kleingeschrieben, registriert.
- Tests eingerichtet: Playwright 1.56.1; Chromium 157 (`chromium-1243`, Verweise 1194 → 1243), WebKit 26.0 – beide starten. 4 Kerne.
- **Hooks:** `~/.claude/settings.json` leer (`{}`).

## Nächster Schritt (UEBERGABE 3)

1. **RLB-125 Muster 2:** was ist nicht ok? Dann J-5 (Schloss orange) und J-6 (‚Entsperren‘ hell, blaue Schrift) einbauen, Muster anpassen.
2. **APD-144:** Gerätetest (iPhone mit Hardware-Tastatur, Fokusrahmen nach ‚Zurück‘).
3. **APD-135/B-3.3:** Vorschlag mit Testfall-Liste.
4. **Bau-Frage 4.67.2 / 3.57.12** (P-118/F-1 und F-2, voll) erneut.
