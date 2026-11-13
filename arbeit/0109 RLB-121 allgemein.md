# RLB-121 – allgemein oder App? (0 Nr. 4)

**13.11.2026** · Sitzung ‚Reiselogbuch 0109‘ · Muster und Testfall-Liste bestätigt (RLB-121/D-5)

## Bestätigt

- Muster hell/iPad quer passt; Testfall-Liste RLB-121/M-1 bis M-17 ok.
- RLB-121/D-5: bei ungerader Zahl der mittlere oben, bei gleichem Preis je Nacht der frühere Aufenthalt zuerst.
- Eingetragen: ReiseLogBuch-Backlog (`b2dcbcb`), AppDesign `arbeit/RLB-121 Testfall-Liste.md` (`4da8001`).

## Frage: was wird allgemein?

- **App (Reiselogbuch):** die zwei Zeilen ‚Teuerste Quartiere‘ und ‚Günstigste Quartiere‘ mit ihrer Logik (D-1 bis D-5) – nur das
  Reiselogbuch hat Quartiere und Preise.
- **Vorschlag allgemein (AppDesign):** die **Aufzählung mit langen Einträgen** als Ergänzung zu R-10.5. Heute bleibt jeder Eintrag einer
  Aufzählung ohne Umbruch am Stück – bei kurzen Einträgen wie ‚8×☀️‘ richtig, ein langer Name ragt am iPhone hoch aber rechts hinaus (R-6.3,
  Gegenprobe `nowrap` im Muster rot). Neu: ein Eintrag bleibt am Stück, wenn er in die Zeile passt; sonst bricht er im Text um. Ein Zusatz in
  Klammern (z. B. der Preis) und der ‚·‘ bleiben beim letzten Wort. Technisch `aufzaehlung` in ui.js für alle Apps – also eine neue
  AppDesign-Version zusammen mit dem Reiselogbuch.
- **Empfehlung: Ja, allgemein** – gleiche Aufzählung in allen Apps, schützt R-6.3, Wetter und Smileys verhalten sich wie heute.
- **Bei Ja:** als Nächstes der Wortlaut alt und neu für R-10.5 und Designrichtlinie 3 zur Bestätigung (0 Nr. 29), danach die Bau-Frage mit
  Prüfstufe aus `stufe` (voll – neue Logik).

## Hinweis

Kontext etwa 266.000 – die Übergabe (ab 300.000) steht nach dem nächsten Schritt an; der Wortlaut kann in der nächsten Sitzung kommen.

## Backlog-Erinnerung

Nächste Version Reiselogbuch 3.56.0: 0 Punkte bereit (RLB-121 nach Wortlaut bereit) · Offen im Backlog: RLB-121 (allgemein/App, Wortlaut),
RLB-6 · AppDesign: APD-85 Teil 6, APD-80, APD-30, APD-62 (T-1), APD-70.

## Offene Usertests

keine.
