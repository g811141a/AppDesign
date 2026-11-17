# Allgemeine Elemente gekapselt bauen – Klärung (Sitzung 0123)

**Stand 17.11.2026** · Wunsch des Nutzers (17.11.2026): ‚alle allgemeinen Elemente im AppDesign sollen soweit möglich als Kapsel gebaut werden,
analog einer Java Bean – wichtig für jetzt und die Zukunft.‘

Noch nichts eingetragen oder geändert. Eine neue Regel kommt erst mit Wortlaut und deinem ‚Ja‘ (0 Nr. 29); ein neues Thema braucht ‚Ins Backlog
übernehmen?‘ und eine Priorität (0 Nr. 24).

## So verstehe ich es (Vermutung, bitte bestätigen)

Eine Java Bean ist ein in sich geschlossener Baustein: Er hat **Eigenschaften mit Standardwerten**, die man nur über die Schnittstelle liest und setzt,
**Methoden** und **Ereignisse**, auf die man hören kann, und **keinen geteilten Zustand** mit anderen. Für AppDesign hieße das je Element
(Menü, Sprechblase, Fenster, Suche, Wischaktionen …):

- ein Baustein mit einer Schnittstelle: erzeugen mit Einstellungen (z. B. `createMenu({ eintraege, onWahl })`), Eigenschaften lesen und setzen,
  Methoden (`open`, `close`), Ereignisse (`on('wahl', …)`);
- eigener Zustand und eigenes CSS, keine Variablen, die andere Bausteine oder die App von außen beschreiben;
- die App kennt nur die Schnittstelle; jeder Baustein lässt sich allein auf einer Prüfseite testen.

**Begriff:** ‚Kapsel‘ ist in AppDesign schon vergeben – die schwebende Gruppe von Schaltflächen (Designrichtlinie 15.5, `.grp`, R-3.2). Zwei Bedeutungen
für ein Wort widersprächen dem Nummern- und Begriffsschema (2.4). Mein Vorschlag: **‚gekapselter Baustein‘**.

## Heutiger Stand (Befund APD-135/U, Plan Abschnitt 3)

- `ui.js` hat 46 Bausteine: **18 in sich geschlossen**, **28 greifen in die Seite ein**.
- Kopplung: 39 von 160 Variablen sind geteilt, 11 werden von außen geschrieben (`dlg`, `dlgDirty`, `dlgOpener`, `keepTop` …); 21 Bausteine bilden einen
  Kreis. Die App nutzt 69 Namen an 291 Stellen.
- Randbedingungen: eine Datei, klassisches Skript (Module laden nicht von `file://`), globale Namen der App und der Prüfungen bleiben.
- Der Weg dahin ist schon geplant: **APD-135 Paket 6** (B-4: öffentliche Namen als Liste und Prüfung; B-3: Prüfseite, Bausteine einzeln prüfen) und
  **Paket 7 / B-5** (Umbau `ui.js` in eigenständige Bausteine, 8 Schritte). Bei **APD-135/J-27** hast du heute ‚B-5 nach Paket 6 neu entscheiden,
  nur bei Anlass‘ gewählt – dein Wunsch macht B-5 zum festen Ziel.

## Technik – zwei Wege

- **(a) Baustein als Fabrik-Funktion in `ui.js` (Empfohlen):** `createX({…})` gibt ein Objekt mit Eigenschaften (get/set), Methoden und `on(…)` zurück –
  so arbeiten heute schon `createSync` und `createCheck`. Das passt zu den Randbedingungen (eine Datei, `file://`, offline) und lässt sich Schritt
  für Schritt umbauen.
- **(b) Web Components** (Custom Elements mit Shadow DOM): Der Browser kapselt CSS und Aufbau selbst. Dafür wäre der Umbau groß, Fokus, Tastatur und Prüfungen
  müssten durch das Shadow DOM, und Safari kann nur einen Teil davon (die Erweiterung eingebauter Elemente mit `is=` fehlt – Vermutung, prüfe ich vor einem Muster).

Den Apple-Abgleich (SwiftUI-Views und UIKit-Steuerelemente mit Eigenschaften und Aktionen) recherchiere ich in der Klärung, bevor der Wortlaut kommt (0 Nr. 23).

## Fragen

1. **Begriff:** (a) ‚gekapselter Baustein‘ (Empfohlen – ‚Kapsel‘ ist vergeben) · (b) trotzdem ‚Kapsel‘
2. **Technik:** (a) Fabrik-Funktion in `ui.js` (Empfohlen) · (b) Web Components · (c) erst Recherche und Muster
3. **Einordnung:** (a) neues Thema APD-136, Priorität 1, als allgemeine Regel (Wortlaut später); APD-135 Paket 6 und 7 setzen es um, B-5 wird festes Ziel (J-27 neu) (Empfohlen) · (b) eigenes Thema neben APD-135 · (c) nur für neue Elemente, Bestehendes beim nächsten Anfassen
4. **APD-30 Wischaktionen (bereit für 4.60.0):** (a) schon als gekapselter Baustein bauen – die Schnittstelle kommt vor dem Bau als Ergänzung zur Testfall-Liste (Empfohlen, D-1 sieht ohnehin einen gemeinsamen Baustein vor) · (b) wie geplant bauen, später umbauen

## Antworten (17.11.2026)

- Frage 2 Technik: **(a) Fabrik-Funktion in `ui.js`**
- Frage 3 Einordnung: **(a) neues Thema APD-136, Priorität 1, mit APD-135** (Paket 6 und 7 setzen es um, B-5 festes Ziel, APD-135/J-27 neu)
- Frage 4 APD-30: **(a) als erster gekapselter Baustein** (Schnittstelle vor dem Bau als Ergänzung zur Testfall-Liste)
- Frage 1 Begriff: offen – du schreibst im Chat.

Eingetragen werden APD-136 und die Änderung an APD-135/J-27, sobald der Begriff feststeht.

## Begriff – Vorschlag des Nutzers ‚APD-Bean‘ (17.11.2026)

‚Bean‘ trifft genau, was gemeint ist (Java Bean). Das Präfix ‚APD-‘ ist aber vergeben: Nach dem Nummernschema (Zusammenarbeit 2.4) steht ‚APD-n‘
für ein **Thema im Backlog von AppDesign** (APD-30, APD-135 …), und eine Nummer bzw. ein Präfix bezeichnet überall genau eine Sache. ‚APD-Bean‘
läse sich wie ein Backlog-Thema, z. B. ‚APD-Bean Menü‘ neben ‚APD-30‘.

Möglichkeiten:
- **(a) ‚AD-Bean‘ (Empfohlen)** – ‚AD‘ steht im Code schon für AppDesign (`AD_VERSION`, `AD_NEEDED`), kein Konflikt mit dem Schema; z. B. ‚AD-Bean Menü‘,
  im Code `createMenu(…)`
- (b) ‚Bean‘ allein – kurz; in AppDesign gibt es nur eine Art Bean
- (c) ‚APD-Bean‘ trotzdem – dann braucht 2.4 eine Ausnahme

**Entschieden (17.11.2026): (a) ‚AD-Bean‘.** Eingetragen: APD-136 im Backlog (Priorität 1, in Klärung), APD-135/J-27 neu in Abschnitt 7 der Plan-Datei, Hinweis in der Zeile von APD-30.

## Eindeutige Kennung je AD-Bean (Frage des Nutzers, 17.11.2026)

Gute Idee – das ist die Grundlage für APD-135/B-4.1 (Liste der öffentlichen Namen mit Prüfung auf Namensgleichheit). Heute hat ein Element bis zu
vier verschiedene Namen: Abschnitt der Designrichtlinie (15.6 Menü), Funktion (`openMenu`), CSS-Klasse (`.menu`), Prüfung (`checkMenue` o. ä.).

**Vorschlag: eine Kennung je AD-Bean, überall dieselbe**
- Kennung: kurzes Wort in Kleinbuchstaben, z. B. `menu`, `pop` (Sprechblase), `swipe` (Wischaktionen) – fest, nie umbenannt, nie wiederverwendet
  (wie die Nummern, 2.4).
- Daraus abgeleitet, ohne zweite Liste: Fabrik `createMenu(…)`, CSS nur unter `.ad-menu…`, im Aufbau `data-ad-bean="menu"`, Messmodus ‚menu …‘,
  Prüfung `checkBean('menu')`.
- **Eine Liste** in AppDesign (Designrichtlinie 15 und als Datei für die Prüfung): Kennung · Fabrik · Eigenschaften mit Standardwerten · Methoden ·
  Ereignisse · Regeln (R-n) · Prüfung.
- Eine Prüfung meldet: Kennung doppelt, Fabrik oder CSS ohne Eintrag in der Liste, CSS einer Bean außerhalb ihres Präfixes, App benutzt einen Namen
  außerhalb der Schnittstelle.

Möglichkeiten:
- **(a) Sprechende Kennung, überall gleich (Empfohlen)** – ein Name für Code, CSS, Aufbau, Prüfung und Doku; nichts muss synchron gehalten werden
- (b) Nummer mit neuem Präfix (z. B. ADB-7 Menü) – passt zum Nummernschema, aber zusätzlich zum Namen im Code, zwei Kennungen je Bean
- (c) beides: Nummer für Doku, Name für Code

## Beispiel: die erste AD-Bean – Wischaktionen (APD-30)

Entwurf zur Anschauung, noch nicht gebaut. Die Werte stammen aus der bestätigten Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md`
(APD-30/D-1 bis D-11).

**Eintrag in der Liste der AD-Beans**

| Feld | Inhalt |
|---|---|
| Kennung | `swipe` |
| Name | Wischaktionen |
| Fabrik | `createSwipe(liste, einstellungen)` |
| Eigenschaften (Standardwert) | `aktionen` (– Pflicht, dieselbe Liste wie das Kontextmenü) · `offenBreite` (162) · `einrasten` (0,5 = 81 px) · `durchwischen` (0,6 der Kachelbreite) · `kapsel` (66 × 44) · `entscheid` (10 px) · `waagrecht` (1,2) |
| Nur lesen | `offen` – die gerade offene Kachel oder `null` |
| Methoden | `schliessen()` · `aktualisieren()` (nach Neuaufbau der Liste) · `entfernen()` |
| Ereignisse | `on('aktion', (kachel, aktion) => …)` · `on('offen', kachel => …)` · `on('zu', kachel => …)` |
| CSS | nur unter `.ad-swipe…` (z. B. `.ad-swipe-huelle`, `.ad-swipe-kapsel`, `.ad-swipe-kapsel.rot`) |
| Aufbau | Hülle der Liste trägt `data-ad-bean="swipe"` |
| Messmodus | ‚swipe kandidat‘, ‚swipe verworfen‘, ‚swipe offen‘, ‚swipe durch‘, ‚swipe zurück gefedert‘, ‚swipe abgebrochen‘ |
| Regeln | R-7.8 (neu), R-4.12, R-4.13, R-1.8 |
| Prüfung | `checkBean('swipe')` (Schnittstelle, CSS, Namen) und `checkWischen` (Verhalten, Testfälle APD-30/W-1 bis W-71) |
| Abschnitt | Designrichtlinie 15.4 ‚Wischaktionen‘ |

**So nutzt die App sie** (Reiselogbuch, Skizze)

```js
const wischen = createSwipe(document.querySelector('#side'), {
  aktionen: kachel => kontextAktionen(kachel)     // dieselbe Liste wie das Kontextmenü
});
wischen.on('aktion', (kachel, aktion) => aktion.ausfuehren());
// nach jedem Neuaufbau der Liste:
wischen.aktualisieren();
```

Die App liest oder schreibt nichts Inneres (keine `dlg…`- oder `keep…`-Variablen); alles Weitere – Gesten, Schließen bei Rollen, Drehen, Esc,
Sprechblase bei ‚Löschen‘, ‚Bewegung reduzieren‘, VoiceOver-Namen – steckt in der Bean.

**Zum Vergleich mit Nummer (Variante b/c):** ‚ADB-1 Wischaktionen‘ in der Doku, im Code trotzdem `createSwipe`, `.ad-swipe…`, `data-ad-bean="swipe"` –
die Nummer käme als zweite Kennung dazu.

## Präfix nach Bereich? (Frage des Nutzers, 17.11.2026)

**Einschätzung:** Eine Einteilung nach Bereichen hilft beim Überblick. Die genannten Bereiche mischen aber zwei Achsen:
- **nach Aufgabe:** Oberflächenaktionen, Eingabeelemente, Kalkulationen;
- **nach Technik:** JavaScript, CSS – jede AD-Bean besteht aus beidem (Fabrik in `ui.js` und CSS unter `.ad-…`), daher taugt die Technik nicht zur Einteilung.
  Farben, Schrift und Abstände (`:root`-Variablen in `design.css`) sind keine Bean, sondern die **Grundlagen**, auf denen alle Beans aufbauen.

**So macht es Apple:** Die HIG ordnet ihre Bausteine nach Aufgabe; belegt ist die Gruppe ‚Menus and actions‘ (Pfad
`developer.apple.com/design/human-interface-guidelines/components/menus-and-actions/…`, z. B. Edit menus, Context menus). Weitere Gruppen wie ‚Selection and
input‘ und ‚Navigation and search‘ habe ich in der Suche nicht belegt gefunden (Vermutung).

**Vorschlag Bereiche (nach Aufgabe, je Bean genau einer):**

| Bereich | Kürzel | Beispiele heute |
|---|---|---|
| Aktionen und Menüs | `aktion` | Kapsel, Menü, Kontextmenü, Wischaktionen, schwebende Schaltfläche |
| Navigation und Suche | `nav` | Seitenleiste, Kopfzeile, Suche, Navigation und Blatt |
| Fenster und Meldungen | `fenster` | Fenster, Sprechblase, Meldung, leerer Zustand |
| Eingabe | `eingabe` | Eingabefeld mit Fehlermeldung, Smiley-Leiste, Schalter, Options-Kapsel, Format beim Tippen (Beträge, APD-56) |
| Inhalt | `inhalt` | Tabelle, Kasten |
| Dienste (ohne eigene Oberfläche) | `dienst` | Backup, Abgleich, Offline, Version, Messmodus, Berechnungen |

**Wo der Bereich steht – zwei Wege:**
- **(a) Als Gruppe in der Liste der AD-Beans, die Kennung bleibt kurz (Empfohlen):** z. B. Bereich ‚Aktionen‘ → `swipe`, `menu`. Ändert sich die
  Zuordnung später, wird nur die Liste umgestellt – die Kennung bleibt (sie darf nie umbenannt werden). Die Prüfung verlangt je Bean genau einen Bereich.
- **(b) Als Präfix in der Kennung:** z. B. `aktion-swipe` → `createAktionSwipe`, `.ad-aktion-swipe`, `data-ad-bean="aktion-swipe"`. Sofort sichtbar, aber
  länger, und eine falsche Zuordnung bliebe für immer im Namen.

## Beispiel: Eingabefeld nur für eine gültige E-Mail-Adresse (Frage des Nutzers, 17.11.2026)

Entwurf zur Anschauung, noch nicht gebaut.

**Name:** Kennung **`email`**, Bereich ‚Eingabe‘. Sie baut auf der Grund-Bean **`field`** auf (Eingabefeld mit Fehlermeldung, heute 15.11 mit
`feldFehler`, R-5.3) – wie in Java `EmailField extends TextField`: `field` bringt Aussehen, ⓧ zum Leeren, Fehlermeldung und Fokus mit, `email` nur
das, was eine E-Mail-Adresse ausmacht. Weitere Felder nach demselben Muster: `amount` (Betrag), `date`, `phone`, `iban`.

| Feld | Inhalt |
|---|---|
| Kennung | `email` (baut auf `field` auf) |
| Fabrik | `createEmail(feld, einstellungen)` |
| Eigenschaften (Standardwert) | `pflicht` (false) · `mehrere` (false – eine Adresse) · `wert` (get/set, immer bereinigt) · `gueltig` (nur lesen) |
| Aufbereitung beim Verlassen | Leerzeichen am Rand entfernen, Teil nach dem @ klein schreiben |
| Prüfungen (in der Bean) | leer und Pflicht → ‚Bitte eine E-Mail-Adresse eingeben.‘ · Format falsch → ‚Bitte eine gültige E-Mail-Adresse eingeben (z. B. name@beispiel.at).‘ · Leerzeichen in der Mitte, zwei @, Punkt am Ende → wie Format falsch |
| Wann geprüft | beim Verlassen des Felds und beim Häkchen (wie R-5.3), nicht bei jedem Tastendruck |
| Tastatur und Gerät | `type="email"`, `inputmode="email"`, `autocomplete="email"`, keine Großschreibung, keine Autokorrektur, keine Rechtschreibprüfung – am iPhone kommt die Tastatur mit @ und Punkt |
| Methoden | `pruefen()` (gibt `true`/`false`, setzt die Meldung) · `leeren()` |
| Ereignisse | `on('gueltig', wert => …)` · `on('fehler', text => …)` |
| CSS / Aufbau | nur `.ad-email…` (sonst das CSS von `field`) · `data-ad-bean="email"` |
| Prüfbeispiele (in der Bean) | gültig: `name@beispiel.at`, `vor.nach@sub.beispiel.com`, `a+b@x.de` · ungültig: `name`, `name@`, `@beispiel.at`, `na me@x.de`, `a@@x.de`, `name@x.` |
| Prüfung | `checkBean('email')` – spielt die Prüfbeispiele in Chromium und WebKit durch und prüft Meldungstexte, Tastatur-Attribute und die Grundregeln |

**‚Alle Prüfungen in der Bean‘ heißt zweierlei:** (1) die **Gültigkeitsregeln** für die Eingabe (was gilt als E-Mail, welche Meldung) und (2) die
**Prüfbeispiele** für den automatischen Test. Beides steht nur in der Bean; die allgemeine Prüfung `checkBean` liest die Beispiele aus und braucht
kein eigenes Wissen über E-Mail-Adressen. Eine App, die `email` nutzt, schreibt keine eigene Prüfung dafür.

**So nutzt die App sie:**
```js
const mail = createEmail(document.querySelector('#kontaktMail'), { pflicht: true });
// beim Häkchen:
if (!mail.pruefen()) return;   // Meldung steht schon unter dem Feld
speichern(mail.wert);
```

**Varianten für den Namen:**
- **(a) `email` auf der Grund-Bean `field` (Empfohlen)** – jede Feldart ist eine eigene Bean mit ihren Prüfungen, die Grund-Bean einmal
- (b) eine Bean `field` mit Eigenschaft `typ: 'email'` – weniger Beans, aber `field` wächst mit jeder Feldart und kennt alle Regeln
- (c) `field-email` als Name – zeigt die Verwandtschaft im Namen, ist aber länger

**Entschieden (17.11.2026): (a) Feldarten als eigene AD-Bean auf der Grund-Bean `field`** (z. B. `email`, später `amount`, `date`, `phone`, `iban`); Gültigkeitsregeln,
Meldungen und Prüfbeispiele stehen in der Bean, `checkBean` spielt sie durch.

**Noch offen:** Kennung sprechend oder mit Nummer (Abschnitt ‚Eindeutige Kennung‘) · Bereiche als Gruppe in der Liste oder als Präfix (Abschnitt ‚Präfix nach Bereich?‘).

**Entschieden (17.11.2026): Bereiche als Gruppe in der Liste der AD-Beans** (Aktionen und Menüs · Navigation und Suche · Fenster und Meldungen · Eingabe ·
Inhalt · Dienste), die Kennung bleibt ohne Bereich.

## Eine zweite ‚swipe‘-Definition? (Frage des Nutzers, 17.11.2026)

Die Frage zeigt eine Schwäche des Namens `swipe`: Er nennt die **Geste**, nicht die **Aufgabe**. Es gibt heute schon ein zweites Wischen – die
Seitenleiste hereinwischen bzw. im Inhalt zurückwischen (R-7.5) –, später käme Fotos wischen (APD-60). Alle drei wären ‚swipe‘.

**Vorschlag: Kennung nach der Aufgabe benennen, nie nach Geste oder Technik**
- erste Bean: **`swipeactions`** (Apples Begriff ‚Swipe Actions‘ für die Aktionen einer Zeile) statt `swipe`;
- **dieselbe Aufgabe, andere Ausprägung** (z. B. auch nach rechts wischen für ‚Erledigt‘ wie in Mail) → **keine neue Bean**, sondern eine Eigenschaft:
  `createSwipeactions(liste, { links: […], rechts: […] })`;
- **andere Aufgabe mit derselben Geste** → eigene Bean, benannt nach ihrer Aufgabe: Seitenleiste hereinwischen gehört zur Bean `sidebar`, Fotos
  wischen wird `gallery`, Seiten blättern `pager`;
- **nie** `swipe2` oder `swipe-neu`; ändert sich eine Bean grundlegend, behält sie ihre Kennung – jede App hängt an ihrer festen AppDesign-Fassung (R-10.3)
  und wird nur nach Rückfrage gehoben. Eine Bean, die eine andere ablöst, bekommt einen neuen Namen und den Vermerk ‚ersetzt …‘ in der Liste (wie bei
  den Nummern, 2.4).

**Entschieden (17.11.2026): Kennung sprechend nach der Aufgabe** (nie nach Geste oder Technik, keine Nummer): erste Bean **`swipeactions`**; daraus
`createSwipeactions`, `.ad-swipeactions…`, `data-ad-bean="swipeactions"`; gleiche Aufgabe in anderer Ausprägung = Eigenschaft, andere Aufgabe = eigener Name;
nie umbenennen, Ablösung mit ‚ersetzt …‘.

**Stand APD-136:** entschieden Begriff AD-Bean, Fabrik-Funktion in `ui.js`, Priorität 1 mit APD-135 (B-5 festes Ziel), APD-30 als erste AD-Bean,
Feldarten auf der Grund-Bean `field`, Bereiche als Gruppe, Kennung nach Aufgabe. **Offen:** Apple-Abgleich (mit Quellen), Wortlaut der allgemeinen
Regel (Zusammenarbeit/Designrichtlinie, 0 Nr. 29), Schnittstelle `swipeactions` als Ergänzung zur Testfall-Liste APD-30.
