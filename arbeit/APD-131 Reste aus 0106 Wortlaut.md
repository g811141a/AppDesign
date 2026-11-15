# APD-131 Reste aus 0106 – Wortlaut alt und neu

**Wortlaut bestätigt: Ja zu APD-131/V-1 bis V-4 (Nutzer 15.11.2026, Sitzung 0118).** Eingetragen wird er mit dem Bau.

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · Quelle: `arbeit/0106 Bericht 4.57.0.md` (‚Ohne bestätigten Wortlaut, daher unverändert‘)

Vier Texte, die seit AppDesign 4.57.0 nicht mehr zum gebauten Stand passen. Am Verhalten der App ändert sich nichts.

## V-1 – Reiselogbuch `PROMPT.md`, ‚Tage als Kästen‘ (Zeilen 148–149)

Die Bezeichnung im Kasten ist seit 4.57.0 halbfett, die Emojis sind so groß wie im Wert (R-6.5). `PROMPT.md` beschreibt noch den Stand davor.

**Alt:**
> … – nur sichtbare Spalten und nur mit Inhalt; seit 3.42.1 (AppDesign R-6.5)
> Text der Bezeichnungen normal in Textgröße und Textfarbe, Emojis klein, mittig zur ersten Zeile des Werts;

**Neu:**
> … – nur sichtbare Spalten und nur mit Inhalt; Text der Bezeichnungen halbfett in Textgröße und Textfarbe,
> Emojis so groß wie im Wert und in einer Zeile, mittig zur ersten Zeile des Werts (AppDesign R-6.5);

## V-2 – Designrichtlinie 15.11, VoiceOver-Namen von ⓧ und Rückgängig

Der Code nennt die Namen schon (`ui.js`: ‚Eingabe löschen‘, ‚Löschen widerrufen‘), die Richtlinie nicht.

**Alt:**
> … Mit der ersten Eingabe verfällt es (dann das ⓧ, ohne Text kein Knopf); verliert das Feld den Fokus, verschwindet es, der Text bleibt in der
> Zwischenablage. Nicht in Datums- und Suchfeldern.

**Neu** (ein Satz eingefügt):
> … Mit der ersten Eingabe verfällt es (dann das ⓧ, ohne Text kein Knopf); verliert das Feld den Fokus, verschwindet es, der Text bleibt in der
> Zwischenablage. VoiceOver nennt das ⓧ ‚Eingabe löschen‘ und das Rückgängig ‚Löschen widerrufen‘. Nicht in Datums- und Suchfeldern.

## V-3 – Designrichtlinie 16, ‚Bewusste Abweichungen‘: neue Zeile ‚Cursor am Ende‘

Die Abweichung ist entschieden (APD-126/W-2, 08.11.2026) und gebaut (R-5.11), steht aber nicht in der Tabelle.

**Alt:** keine Zeile.

**Neu** (nach der Zeile ‚Rückgängig im Feld nach dem Leeren‘):

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Cursor am Ende beim Aktivieren eines Felds (Apple: der Cursor steht an der angetippten Stelle) | – | Wunsch des Nutzers (APD-126/W-2): man schreibt am Ende weiter; im aktiven Feld setzt Antippen ihn an die Stelle wie bei Apple (R-5.11) | 08.11.2026 |

## V-4 – `tests/README.md` nachführen (beide Repos)

Keine Regel, nur die Beschreibung der Prüfungen. Es fehlen:

- **AppDesign `tests/README.md`:** `checkGleiten` (R-7.5, APD-127), `checkAufzaehlung`, `checkDateiname`, `textGroesseSetzen` (`ablauf.mjs`) und `kopfVerlauf` (`hig.mjs`).
- **Reiselogbuch `tests/README.md`:** die Zeilen für `ablauf-einstellen` (RLB-113), `ablauf-jahre` (RLB-114, R-7.6), `ablauf-leer` (R-7.7), `ablauf-glas` (APD-120) und `ablauf-schicht-oben` (APD-118).

Den Text je Zeile nehme ich aus dem Kopfkommentar der jeweiligen Prüfdatei, im Format der bestehenden Zeilen.

## Version

Zusammen mit APD-85 Teil 6 als Korrekturversion **AppDesign 4.59.3 mit Reiselogbuch 3.56.3**, Prüflauf voll.
