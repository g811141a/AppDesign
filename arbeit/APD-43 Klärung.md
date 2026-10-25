# APD-43 Barrierefreiheit – Klärung, Apple-Abgleich, Ist-Stand

**Stand 23.10.2026** · Sitzung Reiselogbuch 0034 · Grundlage `arbeit/APD-38 Framework-Vergleich.html` (APD-38/T-47 bis APD-38/T-60)

Ablauf nach Zusammenarbeit 0 Nr. 25: erst klären (diese Datei), dann Testfall-Liste bzw. Muster, dann ‚0. Nächste Version‘.

## 1. Die vier Teile aus dem Backlog

| Teil | Inhalt | Themen | Ist (AppDesign 4.31.0) | Aufwand |
|---|---|---|---|---|
| 1 | **VoiceOver-Grundlagen:** Rollen und Namen, Fokus ins Menü/in die Sprechblase und zurück, Hintergrund gesperrt, Ansagen, Fehlermeldung hörbar | APD-38/T-51 bis APD-38/T-55 | teilweise: Menüs und Menüpunkte haben Rollen, x und Häkchen Namen, Fenster (`<dialog>`) halten Fokus und sperren die Seite. Es fehlen: Fenstertitel mit dem Fenster verknüpft (`aria-labelledby`), Rolle der Sprechblase (`alertdialog`), ‚öffnet Menü‘ (`aria-haspopup`, `aria-expanded`), ‚ausgewählt‘ beim Häkchen im Menü, Fokus in Menü und Sprechblase, Sperre des Hintergrunds bei Menü und Sprechblase, Ansagen (‚3 von 57‘, ‚Automatisch gespeichert um …‘), Fehler unter dem Feld (`aria-invalid`, `aria-describedby`, Ansage) | mittel |
| 2 | **Hardware-Tastatur am iPad:** Esc und Pfeile in Menüs und Sprechblasen, Eingabe nie für die rote Aktion, Kurzbefehle | APD-38/T-56 | teilweise: Esc im Fenster wie x, Eingabe beendet ein Feld, Fokusrahmen nur bei Tastatur. Menüs und Sprechblasen kennen weder Esc noch Pfeile; keine Kurzbefehle | mittel |
| 3 | **‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘** als allgemeine Regeln mit Prüfung | APD-38/T-47, APD-38/T-49, APD-38/T-59, APD-38/T-60 | Kontrast: nein (kein `prefers-contrast`). Bewegung: teilweise (Seitenwechsel, Gleiten, Hervorheben ja; ‚Nach oben / Ans Ende‘, Schalter, kleiner Titel, Mikrofon nein); keine Regel | klein |
| 4 | **Schrift folgt der Textgröße** (Dynamic Type) | APD-38/T-48 | nein: feste px-Größen (17 px), Textvergrößerung abgeschaltet – die Einstellung des Geräts wirkt nicht | groß (alle Größen relativ, Leisten begrenzen, Prüfungen mit großer Schrift) |

## 2. So macht es Apple (iOS/iPadOS 26, HIG ‚Accessibility‘, ‚VoiceOver‘, ‚Keyboards‘, ‚Typography‘)

- **VoiceOver:** jedes Bedienelement hat Namen, Art und Zustand (‚Bearbeiten, Taste‘, ‚Japan 2026, ausgewählt‘); ein Blatt oder
  eine Abfrage wird mit Titel angesagt, der Fokus springt hinein, der Hintergrund ist unerreichbar (modal), nach dem Schließen
  steht der Fokus wieder auf dem auslösenden Knopf. Ergebnisse werden angesagt (Suche: Trefferzahl; ‚Gespeichert‘).
- **Hardware-Tastatur (iPad):** Pfeiltasten wandern durch Menüs, Esc bzw. ⌘. bricht ab, Eingabe löst die hervorgehobene,
  **nie die rote** Aktion aus; iPad-Apps haben Kurzbefehle (⌘N Neu, ⌘F Suchen, ⌘, Einstellungen bei manchen Apps), ⌘ halten
  bzw. die Menüleiste von iPadOS 26 zeigt sie. **Im Web nicht möglich:** Einträge in der Kurzbefehl-Übersicht bzw. Menüleiste des
  Systems – Abweichung (Kurzbefehle wirken, werden aber nur in der App-Richtlinie bzw. Hilfe genannt). Ob Safari als
  Home-Bildschirm-App ⌘N/⌘F an die Seite weitergibt, wird am Gerät gemessen.
- **Kontrast erhöhen:** alle Systemfarben schalten auf kräftigere Varianten (z. B. Blau hell #0040DD, dunkel #409CFF), Trennlinien
  werden dunkler, Glas wird undurchsichtiger. Im Web: `@media (prefers-contrast: more)` (Safari ab 14.1).
- **Bewegung reduzieren:** Schieben und Zoomen werden zu Überblenden, sanftes Rollen springt. Im Web:
  `prefers-reduced-motion: reduce`.
- **Dynamic Type:** jede Schrift folgt ‚Textgröße‘ (Einstellungen → Anzeige & Helligkeit bzw. Bedienungshilfen → Größerer Text);
  Leisten-Titel wachsen nur begrenzt, Listen werden höher, bei sehr großen Größen stehen Inhalte untereinander. Im Web: Safari
  setzt mit `font: -apple-system-body` die Grundgröße nach der Einstellung; alle Größen in `rem`/`em` wachsen mit.

## 3. Betroffene Regeln

- HIG-Checkliste (16): Kontrast, Antippflächen, Schriftgrößen; Katalog (17): R-1.4 (nur der Vordergrund reagiert – gilt dann auch
  für VoiceOver), R-3.x (Fokusrahmen nur bei Tastatur), R-4.1/R-4.3 (Menüs, Abfragen), R-5.3 (Fehlermeldung), 3 (feste 17 px).
- Neu vorgesehen: je Teil eine Regel mit automatischer Prüfung (APD-38/T-59: jede Schaltfläche hat einen Namen, Fenster Rolle und Titel;
  APD-38/T-60: Grundregeln auch mit hohem Kontrast und großer Schrift).

## 4. Vorschlag Claude

1. **Zwei Teile wie bei APD-61:** **Teil 1** = Teile 1 bis 3 (VoiceOver, Tastatur, Kontrast, Bewegung) – ändert das Aussehen kaum,
   daher **ohne Muster**, nur Testfall-Liste, Prüfungen und dein Ja; **Teil 2** = Dynamic Type mit **Muster** (ändert alle Größen).
2. **Dynamic Type nach der Einstellung des Geräts** wie Apple – keine eigene Textgröße in der App.
3. **Kontrast erhöhen** mit einer zweiten Farbtabelle (hell und dunkel) nach Apples kontrastreichen Systemfarben.
4. **Tastatur:** Grundlagen (Esc, ⌘., Pfeile, Eingabe nie rot, Tab) plus wenige Kurzbefehle (⌘F Suchen, ⌘N Neu) – vorher am
   Gerät messen, ob Safari sie weitergibt.
5. **Prüfung am Gerät:** VoiceOver und Tastatur lassen sich nur teilweise automatisch prüfen (Rollen, Namen, Fokus, Tasten); das
   Hören selbst kommt in die Testfälle (VoiceOver am iPad bzw. iPhone einschalten).
