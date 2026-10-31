# Übergabe an die nächste Sitzung

**Stand 31.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0061‘ (die drei roten Läufe aus 0060 behoben; `los` erneut rot in **WebKit** –
**noch nicht veröffentlicht**; Übergabe auf Wunsch des Nutzers bei Kontext etwa 250.000) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der
AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.42.1** veröffentlicht (Fassung 4.44.1) – **3.43.0 vorbereitet** auf Zweig `vorbereitung-3.43.0` | g811141a/ReiseLogBuch |
| AppDesign | **4.44.1** veröffentlicht – **4.45.0 vorbereitet** auf Zweig `vorbereitung-4.45.0` | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.3.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0062**; die danach 0063.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0061 alle Aufrufe so, kein `model_fallback`.
- **Sitzungsgröße 0061:** etwa 250.000 Token.
- **Regelwächter läuft** (`tests/regelwaechter.mjs` W-1 bis W-13 grün zu Beginn von 0061).
- **Usertests:** P-84 (3.43.0, P-84/0 bis P-84/7) im CHANGELOG des Vorbereitungs-Zweigs, **noch nicht prüfbar** (nicht veröffentlicht).
- **Backlog ‚0. Nächste Version‘:** AppDesign APD-97 – im Zweig `vorbereitung-4.45.0` schon als gebaut eingetragen.
- **Offen:** APD-99 Kontextstand vor jedem Auswahlfenster (Prio 1, Wortlaut bestätigt, Regelwächter-Prüfung offen); Prio 1 APD-38; Prio 2
  APD-94 (vermutlich hinfällig durch APD-97); Prio 3 APD-85 Teil 3, APD-57, APD-80, APD-88, APD-40, APD-62, APD-30, RLB-6 u. a.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** (kein dunkel) – gilt, bis der Nutzer sie
  aufhebt; in jede Übergabe übernehmen.
- **Neu (Nutzer 31.10.2026, APD-99, Wortlaut bestätigt, noch nicht in der Zusammenarbeit):** vor **jedem** Auswahlfenster der
  Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs` – bis zur Aufnahme Selbstkontrolle (`arbeit/APD-99 Wortlaut.md`).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0061

- **Die drei roten Läufe aus 0060 behoben** (je einzeln in Chromium grün, committet und gepusht auf beide Vorbereitungs-Zweige):
  1. `ablauf-navigation (Text 53)` Q-3/Q-5: `ui.js` – `keepPlace` hält den **ersten** Eintrag unter dem Kopf des Inhalts in px statt als
     Anteil seiner Höhe (Felder `ab`, `erstes`, `app` in `topAnchor`/`restoreTop`); liegt ein Eintrag darüber, bleibt es beim Anteil
     (sonst schaut in der Tabelle die Unterkante des vorigen Tags hervor – `ablauf-seitenleiste-hoch` L-3, D-4, L-6).
  2. `hig (Text 23)` R-6.3: `design.css` – `.side-row small` ohne `nowrap` (feste Seitenleiste hoch höchstens 420 px breit); die Regel
     `html.ts-um .side-row small` entfiel.
  3. `hig (Text 33)` R-3.3: Prüfung, nicht App – in der Mitte des Kastens lag hoch der Link ‚Fischmarkt‘; `hig` tippt den Tag jetzt oben
     links an (`click({ position: { x: 12, y: 12 } })`).
  - Dazu: `ablauf-seitenleiste-hoch` fehlte in `alle.mjs` (lief nie im vollen Lauf) – ergänzt, grün. CHANGELOGs 4.45.0 / 3.43.0 ergänzt
    (‚Korrekturen vor der Veröffentlichung‘), neu **P-84/7 ‚Große Schrift hoch‘**, Backlog P-84/0 bis P-84/7.
- **`los` nach 44:30 rot – nichts veröffentlicht.** Chromium ganz grün; rot nur **WebKit, iPad hoch**:
  1. `ablauf-navigation` und `ablauf-navigation (Bedienungshilfen)`: **APD-68/Q-8** ‚Wischen bei offenem Menü: Seitenleiste da‘ und
     **Q-9** ‚Hereinwischen mit Berührung: Safari rollt und bricht ab‘ – hell, dunkel, Bewegung reduzieren, Kontrast. **Allein ebenfalls rot**
     (`PRUEF_BROWSER=webkit node tests/ablauf-navigation.mjs`, 6 Fehler).
     Befund: nach den Zügen von Q-7 kommt `p.click('#mainMore')` in WebKit nicht an (kein pointerdown/click auf `#mainMore`, kein Menü,
     `.layer` fehlt) – der Zug von Q-8 holt deshalb die Seitenleiste herein; Q-9 ist die Folge (Seitenleiste schon da). Allein (ohne Q-1
     bis Q-7) öffnet das Menü und alles stimmt. Zuvor liefen die Q-Fälle hoch nie (vor APD-97 nur quer). **Vermutung:** hängt mit dem
     Neuaufbau Tabelle ↔ Kästen beim Einrasten/Ausblenden hoch zusammen (der Inhalt wechselt die 700-px-Grenze) – ein Ereigniszustand
     von WebKit bleibt hängen. Nächster Versuch: nach jedem Schritt Q-4 bis Q-7 prüfen, ob ein Klick auf `#mainMore` ankommt; Gegenstück
     quer läuft grün.
  2. `ablauf-blatt` (R-4.6 APD-72/D-11 ‚Escape: das Fenster verschwindet sofort‘, iPad hoch hell · Einstellungen): **allein grün** –
     Wackler unter Last.
- **Wortlaut-Rest (zu fragen, 0 Nr. 29):** Designrichtlinie 13 ‚Kein Scroll-Anker‘ nennt nur den ‚sichtbaren Anteil‘ – für den ersten
  Eintrag unter dem Kopf gilt jetzt der Abstand in px (bei Änderungen der App, `keepPlace`); alt/neu vorlegen. Dazu weiter offen aus 0060:
  15.4 ‚Drehen‘ nennt noch ‚Abdunkelung, Auswahl im Hochformat‘ als Auslöser.
- **Selbstkritik 0061:** eine Zwischenmeldung mit geschätzter Uhrzeit (02:44 statt 02:42); `pkill -f "node tests/"` beendete auch den
  eigenen Hintergrundlauf (Prozesse künftig über ein Skript starten und gezielt beenden).

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen und
   **beide Repos auf die Vorbereitungs-Zweige** setzen: `git fetch origin vorbereitung-4.45.0 && git checkout -b vorbereitung-4.45.0
   origin/vorbereitung-4.45.0` (AppDesign) bzw. `git fetch origin && git checkout -b vorbereitung-3.43.0 origin/vorbereitung-3.43.0`
   (ReiseLogBuch – ohne vorheriges `git fetch origin` fehlt der Zweig); Tests einrichten (CLAUDE.md).
2. APD-68/Q-8 in WebKit am iPad hoch nachstellen (2. oben), Ursache finden, beheben (App oder Safari-Modell bzw. Prüfung – Zusammenarbeit
   0 Nr. 20: eine Abweichung des Modells wird in `safari.mjs` korrigiert, nie nur in einer Prüfung); dann `ablauf-navigation` in WebKit
   und Chromium, `ablauf-seitenleiste-hoch` und `ablauf-navigation` mit Text 53 einzeln. Danach `node werkzeug/veroeffentlichen.mjs
   fassung` (4.45.0 ist **nicht** veröffentlicht, also erlaubt), CHANGELOG-Einträge 4.45.0 / 3.43.0 ergänzen, committen und `… los --app
   reiselogbuch` erneut (~45 min).
3. Nach ‚fertig‘: Bericht mit P-84/0 bis P-84/7 (CHANGELOG Reiselogbuch 3.43.0) und Rückmeldefenster; lokale Vorbereitungs-Zweige löschen.

## 4. Danach

APD-99 (Regelwächter) · Wortlaut-Reste (13 Scroll-Anker, 15.4 Drehen) · APD-38 · APD-94 prüfen (hinfällig?) · APD-80 · APD-88 ·
APD-62 Paket B · APD-30 · APD-32 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (Übergabe auf Branch `main`, Arbeit auf den Zweigen
`vorbereitung-4.45.0` bzw. `vorbereitung-3.43.0`).

```
Reiselogbuch 0062 – APD-97 fertig veröffentlichen (4.45.0 / 3.43.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, setze beide Repos auf die Vorbereitungs-Zweige (UEBERGABE.md 3) und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild und behebe dann den roten WebKit-Lauf APD-68/Q-8 aus UEBERGABE.md 2, bevor du erneut veröffentlichst.
```
