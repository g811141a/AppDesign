# Lagebild – Reiselogbuch 0134

**Stand 19.11.2026** · Thema: Usertest P-112, Gegenproben APD-30, APD-135 Paket 5

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.5** veröffentlicht (`main` 897aeb1, `APP_VERSION` 3.57.5, `AD_NEEDED` 4.62.0, Pages ‚success‘) |
| AppDesign | **4.62.0** (`main` 4cc4704 = Übergabe 0133, `AD_VERSION` 4.62.0, Pages ‚success‘) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.15.0** (ganz gelesen) |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 |

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei: alle Aufrufe
  `claude-opus-5-5`); **kein `model_fallback`**.
- **Aufwand: hoch** – eingestellt (`effort_level: high`) und tatsächlich (`"effort":"high"` in allen Aufrufen der Sitzungsdatei);
  `CLAUDE_CODE_EFFORT_LEVEL` ist leer. Keine Abweichung.
- **Nutzungsgrenze:** Fünf-Stunden-Grenze, Status **erlaubt**, keine Überziehung; neu ab 19.11.2026 03:30 (MEZ).

## Umgebung

- Alle drei Repos sind angehängt und auf `main`-Stand; Verweise (klein geschrieben) angelegt und angemeldet.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`).
- **Tests eingerichtet:** Playwright 1.56.1, Chromium-Verweise auf 1243, WebKit 2215 vorhanden. Probelauf `start-regeln` (Chromium): **alles in Ordnung**.

## Offener Usertest

**P-112** (Reiselogbuch 3.57.5, AppDesign 4.62.0) – App unverändert, Regeltexte ohne Doppeltext (APD-135 Paket 4).
Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-112/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.5 · erstellt am … · AppDesign 4.62.0‘.

## Backlog-Spitze

- AppDesign: 0 Punkte bereit · in Klärung **APD-135** (Prio 1, Konsolidierung 3 – als Nächstes Paket 5), **APD-136** (Prio 1, AD-Beans),
  APD-70 (Prio 3).
- Reiselogbuch: 0 Punkte bereit · prüfen **P-112** · in Klärung **RLB-125** (Prio 2, Sperren), RLB-126 (Prio 3), RLB-6 (Prio 3).

## Nächster Schritt (UEBERGABE 3)

1. Rückmeldung zu P-112 (erst prüfen, dann Neues – 0 Nr. 22).
2. Gegenproben APD-30/W-89, APD-30/W-96, APD-30/W-103, APD-30/W-104 einzeln (je ein eigener Hintergrundauftrag, je ~13 min); jede muss rot sein.
3. APD-135 Paket 5 (mit APD-135/J-20: G-8/G-16 als R-Regeln): Wortlaut vorlegen.
