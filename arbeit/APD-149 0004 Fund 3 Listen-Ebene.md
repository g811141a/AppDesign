# APD-149 – Fund 3: die Listen-Ebene (RLB-126) gehört zur Navigation (Sitzung AppDesign 0004)

**27.11.2026** · aus `arbeit/APD-149 0002 Bericht Muster.md`, ‚Funde und Entscheidungen‘ Nr. 3. Keine Änderung.

## Worum es geht

‚Zuletzt gelöscht‘ (RLB-126) ist eine eigene Ebene: Kopf mit ‹, Zurück-Geste und Fokus zurück auf die Kachel. Die Frage aus 0002: Kommt diese Ebene als Eintrag auf den Stapel der Steuer-Bean (`presentation`), oder bleibt sie bei der Navigation?

## Heute (gelesen in dieser Sitzung)

- Reiselogbuch öffnet die Liste über die Navigation von v4: `recentlyDeleted.on('open', () => navVor(openDeletedView))` (`index.html` Zeile 339), einen Eintrag darin über `navVor(…)` (Zeile 1101).
- Zurück geht über `navZurueck` (‹ in den Zeilen 1027, 1068, 1163). Die Funktionen stehen in `v4/ui.js`: `navVor` Zeile 2845, `navZurueck` Zeile 2856, `navZurueckFokus` Zeile 2869.
- Im Muster prüfen APD-149/L-1 bis L-4 nur Kontextmenü, Wischen, Abfrage an der Kachel und den Neuaufbau der Liste. Diese laufen über den Stapel (Menü, Sprechblase).

## So macht es Apple (HIG, gelesen über die JSON-Fassung der Seiten, Hilfsagent web-fetch in dieser Sitzung)

- **Modality** (letzte Änderung 5.12.2023): „Modality is a design technique that presents content in a separate, dedicated mode that prevents interaction with the parent view and requires an explicit action to dismiss.“
- **Modality:** „presenting a hierarchy of views within a modal task can make people forget how to retrace their steps.“
- **Toolbars** (letzte Änderung 16.12.2025, enthält seit 9.6.2025 die Navigationsleiste): „People know that the standard Back button lets them retrace their steps through a hierarchy of information, and the standard Close button closes a modal view.“
- **Tab bars** (letzte Änderung 8.6.2026): „a modal is temporary and self-contained.“

**Einordnung:** Eine Ebene mit ‹ ist ein Schritt in der Hierarchie (Navigation). Auf den Stapel gehört nur, was modal ist und mit x, Abbrechen oder daneben Tippen geht: Fenster, Blatt, Hinweisfenster, Menü, Sprechblase und laufende Aktion. Die Liste ‚Zuletzt gelöscht‘ sperrt nichts dahinter, und man verlässt sie mit ‹.

## Genauer: warum nicht in `presentation` (deine Rückfrage)

**Was der Stapel für jeden Eintrag tut** (Entwurf `katalog/entwurf/presentation-commands.js`):

| Der Stapel macht … | für ein Menü, Fenster, eine Sprechblase richtig | für die Liste ‚Zuletzt gelöscht‘ falsch, weil … |
|---|---|---|
| **Sperre:** alles daneben `inert` (`sperren()`, Zeile 70; R-1.4) | ja – nur der Vordergrund reagiert | am iPad steht die Liste in der Seitenleiste und rechts die Vorschau mit ‚Wiederherstellen‘; beide müssen gleichzeitig bedienbar sein |
| **Schließen von außen:** daneben tippen, Escape, x (`shouldDismiss`) | ja – so geht ein modales Element | Apple verlässt eine Ebene nur mit ‹ bzw. der Zurück-Geste; ein Tipp in die Vorschau darf die Liste nicht schließen |
| **Tönung und `aria-expanded` an der Quelle** | ja – die Schaltfläche zeigt ‚offen‘ | die Kachel ‚Zuletzt gelöscht‘ ist nach dem Öffnen gar nicht mehr zu sehen (iPhone) bzw. ist eine Auswahl, kein ‚offen‘ |
| **Quelle weg → Eintrag zu** (Zeile 55: verschwindet die Quelle, schließt der Eintrag) | ja – z. B. nach dem Drehen ohne Schaltfläche | beim Öffnen der Liste baut die App neu auf, die Kachel verschwindet – die Liste ginge sofort wieder zu |
| **Fokus zurück** beim Schließen | ja | gibt es schon in der Navigation (`navZurueckFokus`, v4 Zeile 2869) – zwei Stellen für dasselbe |

**Was die Navigation in v4 schon kann** und geprüft ist: ‹ und Zurück-Geste vom Rand (APD-61), die VoiceOver-Geste bzw. Escape geht zurück (APD-61/F-20, v4 Zeile 3341), Fokus zurück auf den Eintrag, Drehen mit offener Ebene.
Käme die Liste auf den Stapel, gäbe es für ‚zurück‘ zwei Wege mit eigenen Regeln. Anlass für APD-149 waren die Fehler P-122/F-1 und P-124/F-2. Sie kamen aus Freigaben, die an mehreren Stellen von Hand gebaut waren. Zwei Wege für ‚zurück‘ wären wieder so eine Stelle.

**Apple trennt beides** (HIG oben): modal heißt ‚prevents interaction with the parent view and requires an explicit action to dismiss‘; der Back-Button ‚lets them retrace their steps through a hierarchy‘, der Close-Button ‚closes a modal view‘.

**Die eine Verbindung:** Geht die Navigation eine Ebene vor oder zurück, muss alles auf dem Stapel zu sein. Heute verhindert das die Sperre: bei offenem Menü ist ‹ gesperrt. **Vermutung:** In `v5/` reicht ein Aufruf `presentation.dismiss` in `navVor` und `navZurueck`. Das prüfe ich beim Bau mit einem Testfall.

## Vorschlag

- **APD-149/J-7 (Vorschlag):** Die Listen-Ebene bleibt bei der Navigation (`navVor`, `navZurueck`) und kommt nicht auf den Stapel von `presentation`.
- Was auf der Ebene erscheint (Kontextmenü, Wischen, Abfrage an der Kachel), läuft wie überall über den Stapel. Das prüfen schon L-1 bis L-4.
- **Für `v5/`:** Die Navigation bleibt eigener Code und wird kein Teil von `presentation`. Ob sie eine eigene Bean wird, klärt APD-142 bzw. APD-145. Im Grobentwurf kommt ein Satz dazu: ‚Navigation (Ebenen mit ‹) ist kein Eintrag im Stapel.‘
- Keine Regel ändert sich.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0004, im Fenster)

- **APD-149/J-7:** Die Listen-Ebene bleibt bei der Navigation (`navVor`, `navZurueck`), kein Eintrag im Stapel von `presentation`. Wortlaut des Nutzers: „Ja wie empfohlen aber mit v5/ nochmals prüfen“.
  Beim Bau von `v5/` wird das erneut geprüft, mit einem Testfall ‚Navigation schließt alles auf dem Stapel‘.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
