# Vorschlag – Geführte Eingabe (AD-Bean)

**Stand 19.11.2026** · Sitzung 0134 · Wunsch des Nutzers: in einem Eingabeformular (z. B. Tageserfassung) per Icon in eine ‚Roadmap‘ wechseln, die Feld für
Feld durch das Formular führt – vor allem für das iPhone. **Noch kein Backlog-Eintrag** (erst nach deinem Ok).

## So macht es Apple (HIG, gelesen in dieser Sitzung)

Quelle: developer.apple.com, HIG ‚Sheets‘, ‚Entering data‘, ‚Progress indicators‘, ‚Onboarding‘ (JSON-Fassung, alle vier geladen).
- **Mehrstufig im Blatt:** im ersten Schritt links ‚Abbrechen‘, rechts ‚Fertig‘ (noch inaktiv); ab dem zweiten Schritt **ersetzt ‚Zurück‘ das ‚Abbrechen‘**;
  im letzten Schritt wird ‚Fertig‘ aktiv. „Avoid showing all three buttons — Cancel, Done, and Back — together.“ (Sheets)
- Für lange Abläufe eher Vollbild: „For complex or prolonged user flows, consider alternatives to sheets.“ (Sheets) – am iPad Blatt im Stil ‚page‘ oder ‚form‘.
- **Weniger tippen:** „prefill fields with reasonable default values“, „offer choices instead of requiring text entry“, „Dynamically validate field values.“ (Entering data)
- **Fortschritt:** „use a determinate progress indicator“, „in a consistent location“ (Progress indicators – gemeint für Wartezeiten, übertragbar).
- Eine eigene HIG-Seite zu ‚Schritt-für-Schritt-Formularen‘ gibt es nicht. **Vermutung (nicht geprüft):** Apple Health führt beim Hinzufügen eines Medikaments
  so Schritt für Schritt – das prüfe ich im Apple-Abgleich vor dem Muster, ggf. mit deinen Screenshots.

## Vorschlag

**1. Einstieg:** ein Icon in der Fenster-Kopfzeile des Erfassungsfensters (Lucide `list-ordered`, Name ‚Geführt erfassen‘), links neben dem Häkchen. Antippen
schaltet **dasselbe Blatt** in die geführte Ansicht – kein zweites Fenster, dieselben Felder, dasselbe automatische Speichern (R-5.10).

**2. Eine Seite je Feld:**
- oben ein **Fortschrittsbalken** in Segmenten mit ‚3 von 7‘ (immer an derselben Stelle, unter der Kopfzeile);
- darunter groß die **Überschrift des Felds** (‚Verlauf‘), ein grauer Satz als Hilfe (‚Was habt ihr heute gemacht?‘), dann **das Feld selbst** mit allem, was es
  heute kann (Vorschläge-Chips, Smiley-Leiste, ⓧ, Fehlermeldung unter dem Feld);
- Felder, die nur zusammen Sinn ergeben, auf einer Seite (Quartier: Name und Ort; die Options-Kapseln ‚Quartier wie Vortag‘ und ‚keinen Google-Maps Link‘ auf der
  ersten Quartier-Seite); Preis eine eigene Seite. Ausgeblendete Spalten fehlen auch hier (wie die Schritte heute).

**3. Bedienung:**
- unten (iPhone: direkt über der Tastatur, R-4.5) eine Leiste mit **‹ Zurück** und **Weiter ›** (blau gefüllt); bei leerem Feld heißt ‚Weiter‘ **‚Überspringen‘**;
- **Eingabetaste** in einzeiligen Feldern = ‚Weiter‘ (Tastatur zeigt ‚Weiter‘, `enterkeyhint="next"`); in mehrzeiligen Feldern Zeilenumbruch wie heute;
- **Kopfzeile nach Apple:** Seite 1 links x, ab Seite 2 links ‹ (ersetzt x), nie alle drei; rechts das Häkchen – aktiv, weil automatisch gespeichert wird und
  kein Feld Pflicht ist (Abweichung von ‚Fertig erst am Ende aktiv‘, Grund R-5.10);
- **Roadmap = Übersicht:** Antippen von ‚3 von 7‘ öffnet die Liste aller Felder mit kurzer Vorschau des Werts und ✓ (ausgefüllt) bzw. ○ (leer); Antippen springt
  dorthin. Nach dem letzten Feld kommt dieselbe Übersicht mit ‚Fertig‘;
- **kein Wischen** zwischen den Seiten (das Zurückwischen R-7.5 und das Rollen hätten sonst Vorrangprobleme); Seitenwechsel gleitet, ‚Bewegung reduzieren‘
  überblendet (R-1.12); VoiceOver sagt ‚Schritt 3 von 7, Verlauf‘ an (R-1.8);
- zurück zur normalen Ansicht mit demselben Icon (gedrückt dargestellt `.on`, solange geführt).

**4. AD-Bean `guidedform` (allgemein, R-1.13):**
- Fabrik `createGuidedForm(form, { felder, hilfe, onEnde })` – `felder` in der Reihenfolge der Kästen (die App kann auslassen oder zusammenfassen), `hilfe` je Feld;
- Eigenschaften `aktiv`, `index`, `anzahl`; Methoden `start(i)`, `weiter()`, `zurueck()`, `springe(id)`, `uebersicht()`, `beenden()`; Ereignisse `schritt`, `ende`;
- **zeigt die vorhandenen Felder** (blendet die übrigen aus), statt sie zu kopieren – Speichern, Prüfung, Vorschläge und Smiley-Leiste bleiben eine Stelle.

**5. Betroffene Regeln (Prüfung mit dem Muster):** R-4.5 (Tastatur), R-4.6 (Blatt), R-5.3 (Fehler beim ‚Weiter‘), R-5.5 (Eingabetaste – Ausnahme ‚Weiter‘ in der
geführten Ansicht), R-5.10, R-1.8, R-1.12, R-1.13; neue Regel im Katalog mit Prüfung `checkGefuehrt` (ablauf.mjs).

## Offene Punkte (für die Klärung)

1. Icon: `list-ordered` (Vorschlag) oder `route` (‚Roadmap‘, aber nah an den Maps-Links).
2. Soll das Gerät sich merken, dass zuletzt geführt erfasst wurde (nächstes Öffnen wieder geführt)? Vorschlag: zuerst nicht, später als Einstellung.
3. Gilt es für alle Erfassungsfenster (auch Neues Reiselogbuch, Fazit) oder zuerst nur für die Tageserfassung? Vorschlag: Bean allgemein, im Reiselogbuch zuerst
   die Tageserfassung.

## Nächste Schritte nach deinem Ok

Backlog-Eintrag **APD-139** (allgemein, AD-Bean, Priorität nach deiner Wahl; Reiselogbuch nutzt es für die Tageserfassung) → Apple-Abgleich mit Quelle →
Muster (iPhone hoch hell zuerst, 0 Nr. 6) mit Testfall-Liste → Bau-Frage.
