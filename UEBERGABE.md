# Übergabe an die nächste Sitzung

**Stand 06.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0082‘ (P-95 ok, RLB-118 nachgestellt, gebaut und veröffentlicht als Reiselogbuch
3.50.1, P-96 ok; APD-62/T-16 Muster, Variante und Wortlaut R-4.13 geklärt; automatische Übergabe bei Kontext über 300.000, 0 Nr. 13) – Aufbau
nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die
Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.50.1** veröffentlicht (Fassung 4.52.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.52.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.7.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos); keine lokalen Vorbereitungs-Zweige (auf GitHub bleiben u. a. `vorbereitung-3.50.1` und `rlb-118-pruefung`).
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0083**; die danach 0084.
- **Modell und Aufwand:** in 0082 Opus 5.5 (`get_session`), Aufrufe `"effort":"high"`, kein `model_fallback`; der Arbeitsprozess wurde dreimal neu gestartet.
- **Regelwächter läuft** (Hooks in `~/.claude/settings.json`).
- **Offene Usertests:** keine (P-95 und P-96 alles ok).
- **Nächste Version:** 0 Punkte bereit.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0082

- **P-95 alles ok** (06.11.2026) – in beiden Backlogs unter ‚Erledigt‘; Trennzeile unter ‚Erledigt‘ in AppDesign `BACKLOG.md` ergänzt (dein Ja).
- **RLB-118 (Prio 1, dein Ja):** nach automatischem Sichern und ‚Änderungen verwerfen‘ stempelte `restore` die Felder neu – beim Abgleich überschrieb
  der alte Text eine echte Änderung am anderen Gerät (auf beiden Geräten). Nachgestellt mit `tests/ablauf-verwerfen-abgleich.mjs` (RLB-118/V-1 bis
  V-5, rot gegen 3.50.0 in Chromium und WebKit); übersehen, weil `ablauf-texte-ablaeufe` die Zeitstempel absichtlich ausklammerte (`ohne:
  ABGLEICH_ZEIT`, entfernt). **Reiselogbuch 3.50.1** (dein Ja 06.11.2026): `restoreStamps` in `index.html`; `los --nur-app`: 144 Läufe grün in
  58:49, davon 1 wackelt (`ablauf-gesamt · webkit`, APD-85 Teil 6), Pages ‚success‘ (3b4e15b). **P-96 alles ok.**
- **APD-62 Teil APD-38/T-16** (deine Wahl): Muster `arbeit/APD-62 Bewegung Muster.html` (iPad quer/hoch, iPhone; nur hell), **Variante A Apple-nah**,
  allgemeine Regel ja, **Wortlaut R-4.13 bestätigt** (steht in `arbeit/APD-62 Bewegung Testfall-Liste.md`, noch nicht im Katalog – kommt mit dem
  Bau). **Befund:** Fenster und Blatt gleiten schon seit 4.38.0 (APD-72, `BLATT_KURVE`), die Seitenleiste gleitet (15.4) – neu sind nur Menüs,
  Untermenüs, Kontextmenüs und Sprechblasen. Meine Vorlage stützte sich zuerst auf die ältere Vergleichsseite (21.10.) – im Chat korrigiert.
- **Regelwächter (für APD-113):** W-15/W-14 lehnten das Usertest-Fenster dreimal fälschlich ab (Text davor nach Denkschritt bzw. nach Neustart
  des Arbeitsprozesses nicht in der Sitzungsdatei); nach einem Hintergrundlauf verlangte der Stop-Hook ein Fenster, das W-17 als zweites Fenster
  ablehnte (APD-113 (4)); dadurch mehrere Fragen erst nach ‚w‘.
- **Selbstkritik 0082:** zwei Ausgaben ohne Uhrzeitzeile bzw. mit alter Zeitzeile (vom Stop-Hook gemeldet, nachgeholt); Wortlaut-Vorlage APD-62 zuerst
  ohne Prüfung des heutigen Stands.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`).
2. APD-62/T-16: Testfall-Liste APD-62/M-1 bis M-10 in `arbeit/APD-62 Bewegung Testfall-Liste.md` im Chat zeigen und im Fenster bestätigen lassen
   (0 Nr. 1), dann in AppDesign ‚0. Nächste Version‘ eintragen (Status bereit) und nach 0 Nr. 8 fragen, ob gebaut wird (Kontext in der Frage, 0 Nr. 21).

## 4. Danach

APD-62 übrige Teile (APD-38/T-1 Titel rastet ein, APD-38/T-37 Glas-Optik) · APD-113 (Regelwächter, neue Belege aus 0082) · APD-85 Teil 6 · APD-80 ·
APD-30 übrige Teile (Kurzmeldung, Wischaktionen) · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0083 – APD-62 Bewegung (Testfall-Liste T-16)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild. Dann zeige die Testfall-Liste APD-62/M-1 bis M-10 (arbeit/APD-62 Bewegung Testfall-Liste.md) und frage im Auswahlfenster nach der Bestätigung (UEBERGABE.md 3.).
```
