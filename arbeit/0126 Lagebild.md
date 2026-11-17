# Lagebild – Sitzung Reiselogbuch 0126

**17.11.2026** · Thema: Fehler aus Usertest P-107 (Wischaktionen)

## Versionen

| Teil | Stand |
|---|---|
| Reiselogbuch | **3.57.0** (Commit e0eaf16 = `main`) |
| AppDesign | **4.60.0** (`main` b9157cf, Übergabe 0125 → 0126) |
| Zusammenarbeit allgemein | **3.14.1** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import | Commit c747fee (‚1.3.0‘) |

## Modell, Aufwand, Nutzung

- **Modell:** Opus 5.5 (`claude-opus-5-5`) – eingestellt (`get_session`) und tatsächlich (Sitzungsdatei, 12 Aufrufe); **kein** `model_fallback`.
- **Aufwand: mittel** – eingestellt `effort_level: medium` (`get_session`), tatsächlich `"effort":"medium"` in allen 12 Aufrufen; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt (wie vorgesehen).
  **Abweichung zu 0125 (hoch):** eingestellt und tatsächlich stimmen überein, aber die Sitzung läuft mit ‚mittel‘ statt ‚hoch‘. Ändern kannst du es mit `/effort`.
- **Nutzungsgrenze:** 5-Stunden-Fenster ‚allowed‘, keine Überziehung; Rücksetzung 18.11.2026 05:10 (MEZ).
- **Sitzungskette:** `lineage depth 0, limit 8` – neue Kette, `create_session` sollte wieder gehen.

## Arbeitsumgebung

- Repos ReiseLogBuch und ReiseLogBuch-Import waren schon angehängt und auf dem Stand von `main`; Verweise `appdesign`, `reiselogbuch`, `reiselogbuch-import` angelegt.
- Tests eingerichtet: `playwright@1.56.1` in `ReiseLogBuch/tests` (package-Dateien gelöscht), Chromium-Verweise 1194 → 1243 angelegt; WebKit 2215 vorhanden; 4 Kerne.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks, auch keine Projekt-Einstellungen.
- **Auffällig:** `doku-regeln` ist auf `main` **rot** (4 Fehler): `UEBERGABE.md` Zeile 11 und 44 zitiert F-1, F-4 und W-42 ohne Elternnummer (APD-78/S-1). Behebe ich mit der nächsten Übergabe bzw. im Bau 4.60.1 (‚P-107/F-1‘, ‚APD-30/W-42‘).
- Versehen: ein Aufruf `node tests/alle.mjs --help` startete den vollen Lauf; nach 3 Läufen abgebrochen, keine Dateien verändert.

## Offene Usertests

- **P-107** (Reiselogbuch 3.57.0, AppDesign 4.60.0) – /0, /2, /3, /5, /6, /7, /10 ok; **Fehler:**
  - **P-107/F-1 (P-107/1):** Aufwischen nacheinander wie in Notizen – zuerst ‚Löschen‘ einblenden und wachsen, dann ‚Einstellen‘.
  - **P-107/F-2 (P-107/4):** Zurückwischen umgekehrt – erst ‚Einstellen‘ kleiner und blasser, bis die Kachel ‚Löschen‘ erreicht, dann ‚Löschen‘; ‚Löschen‘ ragt heute über die Seitenleiste hinaus.
  - **P-107/F-3 (P-107/8):** ‚Bewegung reduzieren‘ – Kachel und Kapseln gleiten und wachsen trotzdem.
  - **P-107/F-4 (P-107/9):** Kapseln wachsen nicht mit der Textgröße (nur das Wort) – widerspricht ‚Maße fest‘ in R-1.13 und 66 × 44 in 15.4; braucht Wortlaut alt und neu.

## Backlog-Spitze

- AppDesign ‚0. Nächste Version‘: 0 Punkte bereit · Reiselogbuch: 0 Punkte bereit.
- Offen: APD-135 (Prio 1, Konsolidierung 3 – Pakete 1 und 3 Wortlaut bestätigt) · APD-136 (Prio 1, AD-Beans) · APD-137 (Prio 2, Fehlalarm ‚⚠ Modell‘) · APD-62, APD-134, APD-44 bis APD-52 (Prio 3).

## Nächster Schritt (UEBERGABE 3)

1. Fehler P-107/F-1 bis F-4 beheben: Apple-Abgleich mit Quellen (Notizen als Vorgabe), Testfälle ab APD-30/W-81 mit Gegenproben, klären, warum `checkWischen` F-2 und F-3 nicht fand, Wortlaut alt und neu (R-7.8 / 15.4, R-1.13 / 15.4), Bau-Frage **AppDesign 4.60.1 mit Reiselogbuch 3.57.1** (voll), dann Usertest P-108.
2. Danach APD-135 Pakete 1 und 3 (eigene Version, voll).
