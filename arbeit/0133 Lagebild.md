# Lagebild – Reiselogbuch 0133

**Stand 18.11.2026** · Thema: APD-135 Paket 4 bauen

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.4** veröffentlicht (`main` 20c48fb, `APP_VERSION` 3.57.4, `AD_NEEDED` 4.61.0) |
| AppDesign | **4.61.0** (`main` 2f02364, `AD_VERSION` 4.61.0) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.15.0** (ganz gelesen) |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 |

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei); **kein `model_fallback`**.
- **Aufwand: mittel** – eingestellt (`effort_level: medium`) und tatsächlich (`"effort":"medium"` in allen Aufrufen der Sitzungsdatei);
  `CLAUDE_CODE_EFFORT_LEVEL` ist leer. **Abweichung zu 0132 (hoch):** die Sitzung wurde am iPhone mit ‚mittel‘ gestartet. Für den Bau
  von Paket 4 (46 Stellen, Regeltexte) empfehle ich **hoch** – ändern mit `/effort`.
- **Nutzungsgrenze:** `rate_limit_info` ist diesmal da: Fünf-Stunden-Grenze, Status **erlaubt**, keine Überziehung; neu ab 19.11.2026 03:30 (MEZ).

## Umgebung

- Alle drei Repos sind an die Sitzung angehängt und auf `main`-Stand; Verweise (klein geschrieben) angelegt und angemeldet.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`).
- **Tests eingerichtet:** Playwright 1.56.1, Chromium-Verweise auf 1243; `start-regeln` in Chromium grün; in WebKit erst 1 Fehler (R-7.2 ‚Rückkehr aus dem Hintergrund‘, iPhone hoch hell: Seitenleiste danach weg), allein nachgeprüft **grün** – also **wackelt** (0 Nr. 2), die Einrichtung steht.
- `doku-regeln` ist schon jetzt **rot** (5 Fehler, alle in `UEBERGABE.md`): Verweis auf die noch fehlende
  `arbeit/APD-135 Paket 4 Testfall-Liste.md` und W-Nummern ohne Elternnummer (APD-135/W-19, W-49 …). Beides behebe ich mit dem Bau
  (Testfall-Liste anlegen; Übergabe wird ohnehin neu geschrieben).

## Offene Usertests

Keine (P-111 ok am 18.11.2026).

## Backlog-Spitze

- AppDesign: 0 Punkte bereit · in Klärung **APD-135** (Prio 1, Konsolidierung 3 – jetzt Paket 4), **APD-136** (Prio 1, AD-Beans), APD-70 (Prio 3).
- Reiselogbuch: 0 Punkte bereit · in Klärung **RLB-125** (Prio 2, Sperren), RLB-126 (Prio 3), RLB-6 (Prio 3).
- Offen aus 0130: Gegenproben APD-30/W-87, W-88, W-89, W-96, W-103, W-104 einzeln.

## Nächster Schritt (UEBERGABE 3)

APD-135 Paket 4: Testfall-Liste anlegen → Prüfung rot zeigen → `vorbereiten` (vorläufig AppDesign 4.62.0 / Reiselogbuch 3.57.5) →
Wortlaut einsetzen → `stufe` → Bau-Frage (laut Plan Stufe voll).
