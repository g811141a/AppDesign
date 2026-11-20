# Anderer Begriff für ‚Fabrik‘ – Vorschlag

Gemeint ist die Funktion `create<Kennung>(…)`, die eine AD-Bean anlegt (z. B. `createHinweis(fenster, …)`).

| | Begriff | Beispiel im Katalog | Bewertung |
|---|---|---|---|
| a | **Anlegen** | Schnittstelle: ‚Anlegen: `createHinweis(fenster, { breiteNachDateiname })`‘ | **Empfehlung** – sagt, was sie tut, passt zum Namen `create…`; steht im Katalog schon als ‚Anlegen (Fabrik)‘ |
| b | Erzeuger | ‚Erzeuger: `createHinweis(…)`‘ | deutsch, aber ungewohnt |
| c | Konstruktor | ‚Konstruktor: `createHinweis(…)`‘ | Fachwort wie bei Java-Beans, technisch genau genommen keine Klasse |

**Betroffen** (Änderung des Wortlauts nach 0 Nr. 29 – alter und neuer Text kommen zur Freigabe): R-1.13 im Regelkatalog, Spalte ‚Fabrik‘ in der Liste
der AD-Beans (Designrichtlinie 15), Katalog-Seite (‚Anlegen (Fabrik)‘, Feld `fabrik` in `katalog/*.js`), Meldungen von `checkBeans`.

**Entscheidung (Nutzer 20.11.2026):** a) Anlegen. Wortlaut alt/neu kommt in Sitzung 0144 zur Freigabe (0 Nr. 29).
