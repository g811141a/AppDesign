# Übergabe an die nächste Sitzung

**Stand 31.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0060‘ (APD-97 geklärt und gebaut, **noch nicht veröffentlicht** – voller
Prüflauf rot; Übergabe nach 0 Nr. 13, Kontext etwa 355.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu
Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.42.1** veröffentlicht (Fassung 4.44.1) – **3.43.0 vorbereitet** auf Zweig `vorbereitung-3.43.0` | g811141a/ReiseLogBuch |
| AppDesign | **4.44.1** veröffentlicht – **4.45.0 vorbereitet** auf Zweig `vorbereitung-4.45.0` | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.3.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0061**; die danach 0062.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0060 alle Aufrufe so, kein `model_fallback`.
- **Sitzungsgröße 0060:** etwa 355.000 Token – Übergabe nach 0 Nr. 13 (der Nutzer hat den Bau trotz Empfehlung hier gewünscht).
- **Regelwächter läuft** (`tests/regelwaechter.mjs` grün zu Beginn von 0060).
- **Usertests:** P-84 (3.43.0) ist im CHANGELOG des Vorbereitungs-Zweigs geschrieben, aber **noch nicht prüfbar** (nicht veröffentlicht).
- **Backlog ‚0. Nächste Version‘:** AppDesign APD-97 – im Zweig `vorbereitung-4.45.0` schon als gebaut eingetragen.
- **Offen:** APD-99 Kontextstand vor jedem Auswahlfenster (Prio 1, Wortlaut bestätigt, Regelwächter-Prüfung offen); Prio 1 APD-38; Prio 2
  APD-94 (vermutlich hinfällig durch APD-97); Prio 3 APD-85 Teil 3, APD-57, APD-80, APD-88, APD-40, APD-62, APD-30, RLB-6 u. a.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** (kein dunkel) – gilt, bis der Nutzer sie
  aufhebt; in jede Übergabe übernehmen.
- **Neu (Nutzer 31.10.2026, APD-99, Wortlaut bestätigt, noch nicht in der Zusammenarbeit):** vor **jedem** Auswahlfenster der
  Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs` – bis zur Aufnahme Selbstkontrolle (`arbeit/APD-99 Wortlaut.md`).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0060

- **APD-97 geklärt** (alles bestätigt, `arbeit/APD-97 Klärung.md`): am iPad steht die Seitenleiste hoch wie quer fest neben dem Inhalt
  (Apple `tile`; Vorbild Einstellungen und Notizen, `apple-referenz/ipad/`, verpixelt), keine Abdunkelung, Gesten hoch wie quer; Inhalt
  unter 700 px → Tabellen als Kästen (R-6.6 neu). Muster `arbeit/bilder/APD-97 …`, Testfall-Liste `arbeit/APD-97 Testfall-Liste.md`
  (APD-97/L-1 bis L-10, D-1 bis D-11).
- **Gebaut** (Ja des Nutzers 31.10.2026) auf den Zweigen `vorbereitung-4.45.0` (AppDesign) und `vorbereitung-3.43.0` (Reiselogbuch):
  `ui.js` `SCHMAL`/`inhaltSchmal`; `hig.mjs` R-6.6; `ablauf.mjs` `checkNavigation` iPad hoch wie quer; Reiselogbuch `isWide = !isPhone()`,
  Kästen bei `inhaltSchmal(app)`, Neuaufbau beim Wechsel (`wasSchmal`); neue Prüfung `ablauf-seitenleiste-hoch` (rot gegen 3.42.1);
  12 Prüfungen angepasst; Designrichtlinie 15.4, 15.6, 15.13, R-6.6, R-7.5; CHANGELOGs mit P-84; Backlogs.
- **`los` rot nach 23:06 – nichts veröffentlicht** (3 rote Läufe, alle Chromium, nur bei großer Schrift am iPad hoch):
  1. `ablauf-navigation (Text 53)`: APD-68/Q-3 und Q-5 – beim Aus- und Einblenden der Seitenleiste springt der Inhalt um 30 px
     (oberster Kasten 0/286 → 0/256 px und zurück) – hell, dunkel, Bewegung reduzieren.
  2. `hig (Text 23)`: R-6.3 – Text ragt über `button.side-row` hinaus (‚Australien 24.08.2026 - 05.09.2026 · läuf…‘), dunkel hoch.
  3. `hig (Text 33)`: R-3.3 – `#app [data-day="2026-08-24"]` (Kasten) bleibt nicht blau, solange sein Fenster offen ist; danach bricht
     der Ablauf ab (`page.click` Timeout), hell hoch.
- **APD-99 neu** (Prio 1): Kontextstand vor jedem Auswahlfenster – Wortlaut bestätigt, Regelwächter-Prüfung zu bauen.
- **Wortlaut-Rest (zu fragen, 0 Nr. 29):** Designrichtlinie 15.4 ‚Drehen‘ nennt noch ‚Abdunkelung, Auswahl im Hochformat‘ als Auslöser –
  nicht geändert, weil nicht im bestätigten Wortlaut; dem Nutzer alt/neu vorlegen.
- **Selbstkritik 0060:** eine Zeitzeile vor dem Fenster (W-Regel 6 des Regelwächters); eine Antwort ohne Zeitzeile und mit geschätzter Uhrzeit
  (01:59 statt 01:58); Bau trotz Kontext über 240.000 begonnen – lief über die Übergabegrenze; vor `los` nicht alle Prüfungen bei großer
  Schrift (`PRUEF_TEXT`) laufen lassen – genau dort wurde es rot.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen und
   **beide Repos auf die Vorbereitungs-Zweige** setzen: `git fetch origin vorbereitung-4.45.0 && git checkout -b vorbereitung-4.45.0
   origin/vorbereitung-4.45.0` (AppDesign) bzw. `vorbereitung-3.43.0` (ReiseLogBuch); Tests einrichten (CLAUDE.md).
2. Die drei roten Läufe (2. oben) nachstellen – einzeln mit großer Schrift (`PRUEF_TEXT`, siehe `tests/README.md` bzw. `lauf.mjs`),
   Ursache finden, beheben; dann `node werkzeug/veroeffentlichen.mjs fassung` (4.45.0 ist **nicht** veröffentlicht, also erlaubt),
   committen und `… los --app reiselogbuch` erneut. Die Korrektur gehört in die CHANGELOG-Einträge 4.45.0 / 3.43.0.
3. Nach ‚fertig‘: Bericht mit P-84/0 bis P-84/6 (CHANGELOG Reiselogbuch 3.43.0) und Rückmeldefenster; lokale Vorbereitungs-Zweige löschen.

## 4. Danach

APD-99 (Regelwächter) · Wortlaut-Rest 15.4 Drehen · APD-38 · APD-94 prüfen (hinfällig?) · APD-80 · APD-88 · APD-62 Paket B · APD-30 ·
APD-32 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (Übergabe auf Branch `main`, Arbeit auf den Zweigen
`vorbereitung-4.45.0` bzw. `vorbereitung-3.43.0`).

```
Reiselogbuch 0061 – APD-97 fertig veröffentlichen (4.45.0 / 3.43.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, setze beide Repos auf die Vorbereitungs-Zweige (UEBERGABE.md 3) und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild und behebe dann die drei roten Läufe aus UEBERGABE.md 2, bevor du erneut veröffentlichst.
```
