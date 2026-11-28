# RLB-130 – Rückmeldung P-128 und Messung am iPad (Sitzung AppDesign 0009)

**28.11.2026** · Usertest P-128 (Reiselogbuch 3.59.2 / AppDesign 4.71.0, RLB-129) **fehlgeschlagen**. Nichts gebaut.

## 1. Rückmeldung (Nutzer 28.11.2026, im Chat, wörtlich)

- **P-128/1 Schritt 4:** „nach dem drehen zurück ins querformat steht das 1. reiselogbuch ganz oben und nicht das 3. mit welchem ich ins hochformat gedreht habe. Im hochformat haben alle reiselogbücher in die seitenleiste gepasst.“
- **P-128/2 Schritt 4:** wie P-128/1 Schritt 4.
- **P-128/2 Schritt 6:** wie P-128/1 Schritt 4, „und das menü hängt bei einem anderen reiselogbuch“.
- Zu P-128/0 und den übrigen Schritten kam keine Meldung.

## 2. Befund im Safari-Modell

- Nachgestellt: iPad quer (1180 × 820), 9 Reiselogbücher, die Liste mit dem Rad um 150 px gerollt (oben `t1`), hoch (alle passen, Rollweg 0), zurück quer.
- **7 Arten zu drehen**, Chromium 158 und WebKit 26.0: in einem Schritt, über eine Zwischengröße 1000 × 1000, `resize` 250 ms zurückgehalten, erst die Breite, erst die Höhe, ein später `scroll` nach dem Drehen, in 5 Schritten zu je 80 ms.
- **Ergebnis:** In allen 14 Läufen steht zurück quer oben wieder `t1` (`scrollTop` 150). `sideKept` und `sideTop` bleiben, wie RLB-129 es vorsieht. Der Fehler vom Gerät lässt sich so **nicht** nachstellen.
- **Vermutung:** Am iPad läuft das Drehen anders als im Modell. Das Drehen am iPad wurde nie gemessen; gemessen wurde nur am iPhone (326 ms, Übergabe 0171). Darum hat die Prüfung `ablauf-seitenleiste-drehen` (RLB-129/T-2, T-4, T-5) den Fehler nicht gesehen.

## 3. Nächster Schritt: Messung am iPad (0 Nr. 20)

Bei Fehlern in Bewegungen am Gerät wird zuerst gemessen, dann nachgebildet. Die feste Prüfung muss genau das gemessene Muster rot zeigen (0 Nr. 1).

**Schritte am iPad** (App vom Home-Bildschirm, hell):
1. Die App ganz schließen und neu öffnen. Das iPad **quer** halten, die Seitenleiste ‚Reiselogbücher‘ ist eingeblendet.
2. Oben in der Seitenleiste auf ‚…‘ (Mehr) tippen. Die graue Versionszeile unten im Menü **lange drücken**.
   Erwartet: Im Menü erscheint ‚Messung starten‘ (grau ‚Für Claude: Bewegungen aufzeichnen‘).
3. ‚Messung starten‘ antippen. Erwartet: Das Menü schließt; auf dem Bildschirm ist nichts zu sehen.
4. Die Liste so rollen, dass das **3. Reiselogbuch ganz oben** steht (wie bei dir). Kurz warten.
5. Das iPad **hochkant** drehen und etwa 2 Sekunden warten. Dann wieder **quer** drehen und etwa 2 Sekunden warten.
   Erwartet laut Usertest: oben steht wieder das 3. Reiselogbuch. Bei dir steht das 1. oben, das ist der Fehler, den die Messung zeigen soll.
6. Unten in der Seitenleiste ‚Zuletzt gelöscht‘ antippen, die Liste so rollen, dass ein anderer als der 1. Eintrag oben steht.
   Die unterste ganz sichtbare Kachel **lange drücken**, bis das Menü offen ist.
7. Hochkant drehen, etwa 2 Sekunden warten, wieder quer drehen, etwa 2 Sekunden warten. Neben das Menü tippen.
8. Oben auf ‚…‘ (Mehr) tippen → ‚Messung beenden und teilen‘. Erwartet: das Teilen-Menü mit `messung-2026-11-28-hhmm.txt`.
   Die Datei hier im Chat anhängen.
9. Schreib mir dazu, **wie viele Reiselogbücher** und wie viele Einträge in ‚Zuletzt gelöscht‘ stehen und welches **iPad-Modell** du hast.

- Die Messung enthält keine Texte, nur Zahlen, Längen und ids. Sie endet von selbst nach 5 Minuten.

## 4. Danach

- Aus der Messung: Safari-Modell für das Drehen am iPad (`tests/safari.mjs`), feste Prüfung mit genau deinem Ablauf, rot gegen 3.59.2 (0 Nr. 1, 0 Nr. 20).
- Korrektur RLB-130 als eigene Korrekturversion **vor** `v5/` (0 Nr. 8), Bau erst nach deinem Ja (0 Nr. 21).
- Danach `v5/` (AppDesign 5.0.0) mit Reiselogbuch 3.60.0, dann auf der Korrektur aufgesetzt.
