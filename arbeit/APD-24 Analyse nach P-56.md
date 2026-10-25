# APD-24 – Analyse nach P-56 und Plan

**Stand 19.10.2026** · Sitzung Reiselogbuch 0014 · Rückmeldung P-56: /0, /3, /4 ok (**APD-25 abgeschlossen**); /1 und /2 nicht ok.

## 1. Was am iPhone wirklich passiert (Ursache)

- **Am iPhone verkleinert die Tastatur nur den sichtbaren Bereich, nicht die Seite.** Die Leisten sind `position: fixed` und hängen am
  ganzen Fenster. Solange die Seite unter der Tastatur noch genug Inhalt hat, rollt Safari die Seite selbst, und die Leisten stehen still.
- **Wird die Seite zu kurz**, weil die Suche auf wenige Tage filtert oder ⓧ die Seite nach oben setzt, kann Safari nicht mehr rollen.
  Dann schiebt es den **sichtbaren Bereich** innerhalb des Fensters (`visualViewport.offsetTop`), und die festen Leisten rutschen mit.
  Unser Ausgleich (`--vv-top` aus dem Ereignis `visualViewport scroll`) kommt erst **nach** dem Bild. Die Leisten springen also
  erst weg und dann zurück. Das ist das Zittern.
- Deshalb passt alles zu deinen Beobachtungen:
  - Am Anfang ist die Seite lang, und es zittert nicht.
  - Nach ein paar Buchstaben ist sie kurz, und es zittert ein bisschen.
  - Nach ⓧ steht die Seite oben, beim Tippen wird sie sehr kurz, und es zittert massiv.
  - Mit ⌃ ⌄ ist die Tastatur zu, und es zittert nicht.
  - Am iPad schiebt Safari den sichtbaren Bereich nicht, also zittert es dort nie.
- **Warum 4.25.1 es nicht behoben hat:** Das ersetzte Suchfeld war ein Auslöser, aber nicht der wichtigste. Meine Nachbildung schob den
  sichtbaren Bereich um eine **feste** Strecke, statt sie aus der Seitenlänge zu berechnen wie Safari. Den Fall „Seite wird zu kurz,
  Safari schiebt den sichtbaren Bereich“ gab es in der Prüfung gar nicht. Deshalb war sie grün, während das Gerät zitterte.
- **Bekannt bei Apple:** Apple-Forum und WebKit-Bugzilla beschreiben genau das. Feste Kopfzeilen verschieben sich bei offener Tastatur,
  und unter iOS 26 setzt sich `visualViewport.offsetTop` nach dem Schließen der Tastatur zum Teil nicht auf 0 zurück
  (developer.apple.com/forums/thread/824765, bugs.webkit.org/show_bug.cgi?id=300523). Auch Apple bietet keinen fertigen
  Mechanismus an. Die feste Leiste mit JavaScript nachzuführen bleibt ruckelig. **Stabil ist nur, Safari gar nicht schieben zu lassen.**

## 2. Korrektur (Vorschlag, AppDesign 4.25.2 / Reiselogbuch 3.23.2)

**Thema 1 – Suche am iPhone ohne Zittern (R-2.3, allgemein):**
1. **Platz unter dem Inhalt, solange die Suche offen ist:** unter der Seite eine Bildschirmhöhe Leerraum. So wird die Seite nie zu kurz,
   Safari rollt immer selbst und schiebt den sichtbaren Bereich nie, und die Leisten stehen. Wird die Suche geschlossen, verschwindet
   der Leerraum. So verhält sich auch Notizen: unter wenigen Treffern ist leere Fläche.
2. **Suche öffnen und ⓧ rollen die Seite ganz nach oben**, in der Seitenleiste bzw. Startliste und im Reiselogbuch (deine
   Rückmeldung 1, **allgemeine Regel**). Das passiert sofort beim Antippen und vor dem Öffnen der Tastatur, damit Safari danach
   nichts mehr schieben muss.
3. Der Ausgleich `--vv-top` bleibt als Sicherheitsnetz, wird aber nicht mehr gebraucht.

**Thema 2 – Safari genau nachbilden und am Gerät messen (gegen Wiederholungen, siehe 3):**
4. **Ein gemeinsames Safari-Modell** `AppDesign/tests/safari.mjs` für alle Prüfungen mit Tastatur: Der sichtbare Bereich wird aus
   Seitenlänge, Scrollstand und Tastaturhöhe **berechnet** wie in Safari, nicht mehr mit einer festen Strecke verschoben. Die Meldung
   kommt erst ein Bild später. Dazu kommen Fokusverlust und der neu aufgebaute Inhalt. Die heute verstreuten Nachbildungen
   (tastatur, checkListStill, Grundregeln, ablauf-suche-iphone) nutzen dann alle dasselbe Modell. Zuerst muss die Prüfung mit deinem
   Ablauf (öffnen, tippen, ⓧ, weitertippen, quer, Startliste) **gegen 4.25.1 rot** sein, erst dann wird korrigiert.
5. **Messmodus in der App (AppDesign-Baustein):** In den Einstellungen gibt es ‚Messen‘ für eine Sitzung. Die App zeichnet dann in jedem
   Bild Scrollstand, sichtbaren Bereich (`visualViewport`), Lage der Leisten und Tastatur auf. Mit ‚Messung teilen‘ schickst du den
   Text in den Chat. So sehe ich, was dein iPhone tut, statt zu raten, und das Safari-Modell wird mit echten Werten abgeglichen.

## 3. Was sich ändert, damit wir nicht immer über dieselben Fehler reden (deine Frage 2)

- **Woran es lag:** Ich kann hier kein echtes iPhone-Safari laufen lassen. Die Nachbildung war jedes Mal ein anderes, zu einfaches Modell.
  Grüne Prüfungen habe ich als „behoben“ gemeldet, obwohl das Modell nicht am Gerät bestätigt war.
- **Neu (Zusammenarbeit, Vorschlag 0 Nr. 20):**
  - (a) Bei Bewegungsfehlern am Gerät (Zittern, Springen, Rollen) gibt es zuerst eine **Messung am Gerät** (Messmodus). Die Prüfung
    muss genau dieses gemessene Muster rot zeigen.
  - (b) Für Safari gibt es **ein** Modell (`safari.mjs`), und jede Abweichung vom Gerät wird dort korrigiert, nie nur in einer Prüfung.
  - (c) Im Bericht steht ehrlich ‚in der Nachbildung behoben, am Gerät zu bestätigen‘, bis du ok meldest.
  - (d) Jede Safari-Eigenheit, die wir finden, kommt mit Quelle in Abschnitt 13 (iPad-Erfahrungen) und wird damit Regel für alle Apps.
- **Ein anderes KI-Modell** löst das Grundproblem nicht: Ohne echtes Gerät und ohne Messdaten muss jedes Modell Safari erraten.
  Der Messmodus schließt genau diese Lücke.

## 4. Safari und Neuaufbau (deine Frage 3)

Das gehört ab jetzt in die Designrichtlinie, Abschnitt 13, als feste Grundsätze:
- Die Seite nie so kurz werden lassen, dass Safari den sichtbaren Bereich schieben muss (Leerraum bei offener Tastatur).
- Felder mit Fokus nie ersetzen (`setHtml`, seit 4.25.1).
- Rollen nur vor dem Öffnen oder nach dem Schließen der Tastatur.
- Feste Leisten nicht laufend mit JavaScript nachführen, nur als Netz.
- Nach dem Schließen der Tastatur `offsetTop` nicht vertrauen (iOS-26-Fehler, siehe Quellen).

## 5. Meine Vorschläge für das allgemeine AppDesign (deine Frage 4)

Ab jetzt endet jede Testfall-Liste mit einem Abschnitt ‚Vorschläge für AppDesign‘. Für jetzt:

| Nr. | Vorschlag | Nutzen für jede App |
|---|---|---|
| V1 | **Messmodus** (oben, 5) | Fehler am Gerät messbar statt erraten |
| V2 | **Suche-Komponente vollständig allgemein**: öffnen/ⓧ → nach oben, Leerraum bei Tastatur, Feld bleibt, Treffer unter der Suchzeile | jede App sucht gleich, ohne Zittern |
| V3 | **Rückgängig** nach Löschen (Hinweis unten ‚Gelöscht · Widerrufen‘ für ein paar Sekunden, wie Mail) | kein Datenverlust durch Vertippen |
| V4 | **Leere Zustände** einheitlich (Symbol, ein Satz, eine Schaltfläche, z. B. ‚Keine Treffer – Suche löschen‘) | gleiche Sprache in allen Apps |
| V5 | **Datumsfeld** wie iOS (APD-26: Tag antippen übernimmt und schließt) | schon im Backlog |
| V6 | **Ziehen zum Aktualisieren** bewusst **aus** (Safari lädt sonst die Seite neu, beim Tippen ärgerlich) bzw. nur, wo es Sinn hat | kein ungewolltes Neuladen |

Quellen: [Apple Developer Forums – iOS Safari keyboard shifts entire viewport and moves fixed header](https://developer.apple.com/forums/thread/824765) ·
[WebKit Bugzilla 300523](https://bugs.webkit.org/show_bug.cgi?id=300523)
