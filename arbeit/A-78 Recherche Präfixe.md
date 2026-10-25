# A-78 – Nummernschema der Präfixe: Recherche

**Stand 25.10.2026** · Sitzung Reiselogbuch 0045 · Grundlage für den Austausch im Chat – **noch kein Umbau** (A-78, Nutzer 25.10.2026)

Frage des Nutzers: Wofür stehen die Buchstaben vor den Nummern, und wie machen es bewährte Modelle? Ziel: ein Schema, das über alle
Repos (AppDesign, Reiselogbuch, ReiseLogBuch-Import, spätere Apps) eindeutig und dauerhaft stabil ist.

---

## 1. Bestand heute (gezählt am 25.10.2026, ohne `fassung/`)

| Präfix | Bedeutung | Zähler | Wo | Treffer AD / RL / RI |
|---|---|---|---|---|
| **A-** | Backlog-Thema AppDesign | AppDesign, fortlaufend (A-01 … A-81) | AppDesign `BACKLOG.md` | 1297 / 256 / 1 |
| **T-** | Backlog-Thema Reiselogbuch | Reiselogbuch (T-01 … T-105) | Reiselogbuch `BACKLOG.md` | 359 / 367 / 3 |
| **T-** (2.) | Framework-Themen 1–66 aus A-38 | eigene Liste | `arbeit/A-38 Framework-Vergleich.html`, Backlog A-43 … A-62 | (in den 359 enthalten) |
| **P-** | Prüfpunkt je gebauter Version | **gemeinsam** (P-73), Unterpunkte P-73/0 … | beide Backlogs, CHANGELOG | 322 / 502 / – |
| **E-** | Erledigt | **je Repo** (AD E-91, RL E-135) | beide Backlogs | 178 / 137 / 28 |
| **E-** (2.) | Entscheidungen E-1 … E-11 | eigene Liste | `arbeit/T-05 Anforderungen.md` | |
| **R-** | Regel im Katalog, nach Abschnitt (R-5.6 = Abschnitt 5, Regel 6) | je Abschnitt | Designrichtlinie 17 | 2094 / 574 / 1 |
| **G-** | Regel ohne automatische Prüfung (Gerät/Sicht) | fortlaufend (G-1 … G-19) | Designrichtlinie 17 | 97 / – / – |
| **S-** | früher Backlog AppDesign (S-01, S-02); heute auch Safari-Befund S-1 … S-3 in Designrichtlinie 13 | doppelt | Designrichtlinie 13, VERLAUF | 171 / 2 / – |
| **W-** | Entscheidungen der Sitzung A-02 (W-1 … W-6) | eigene Liste | VERLAUF, A-02 | 70 / 1 / – |
| **F-** | Fall in einer Fall-Liste – aber auch Folgepunkt (A-39 F-1 …) und Import-Fälle F-1 … F-22 | **je Datei neu** | `arbeit/… Fall-Liste.md`, Import-PROMPT | 550 / 144 / 100 |
| **B-, C-, D-, K-, M-, Q-, U-, V-, X-, Z-, I-** | Fälle bzw. Punkte einzelner Fall-Listen (X- = ⓧ in A-63, Q- = Navigation, Z- = A-13 …) | **je Datei neu** | `arbeit/` | je 7–129 |
| **N-, K-** (Import) | Regeln N-1 … N-15, Erkenntnisse K-1 … K-12 | Import-Repo | `PROMPT.md`, `ERKENNTNISSE.md` | – / – / 76, 23 |

**Befunde**

1. **Doppelt belegt:** T- (Reiselogbuch-Themen und Framework-Themen aus A-38), E- (Erledigt und Entscheidungen T-05), S- (alter
   Backlog und Safari-Befunde), F- (Fall, Folgepunkt, Import-Fall), K- (Fall-Liste A-33 und Import-Erkenntnisse), B-1 gibt es in
   mehreren Fall-Listen mit anderer Bedeutung. Ein nacktes ‚B-1‘ oder ‚E-90‘ ist ohne Zusammenhang nicht eindeutig.
2. **Zustand im Präfix:** ein Thema bekommt beim Erledigen eine **zweite** Nummer (A-74 → E-89). Es gibt also zwei Kennungen für
   dieselbe Sache; Verweise müssen beide kennen.
3. **Zähler uneinheitlich:** P- gemeinsam über die Repos, E- je Repo, Fall-Nummern je Datei; führende Nullen mal ja, mal nein
   (E-04 neben E-89, K-07 neben K-12, A-01 neben A-81).
4. **Hierarchische Regelnummern:** R-5.6 hängt an der Abschnittsnummer 5. Wird ein Abschnitt verschoben, müsste die Nummer
   wandern – das verhindert heute nur die Vereinbarung ‚Nummern bleiben fest‘.
5. **Gut gelöst:** P- mit Unterpunkten (P-73/1) zeigt schon den Elternbezug; A-/T- sind je Repo eindeutig und werden nie neu
   vergeben; 0 Nr. 3 legt ‚Nummern bleiben fest‘ für Abschnitt 0 bereits fest.

---

## 2. Wie es bewährte Modelle machen

### 2.1 Jira – Schlüssel = Projekt + laufende Nummer

- Schlüssel **`PROJ-123`**: Projektschlüssel (Großbuchstaben, Standard `[A-Z][A-Z]+`) plus Zähler **je Projekt**. Das Muster des
  Schlüssels ist fest; die **Art** (Fehler, Aufgabe, Geschichte) steht nicht im Schlüssel, sondern ist ein Feld.
- Status (offen, erledigt) ist ebenfalls ein Feld – ein erledigtes Ticket behält seinen Schlüssel.
- Wird ein Ticket in ein anderes Projekt verschoben oder der Projektschlüssel geändert, bekommt es einen neuen Schlüssel; der alte
  leitet weiter und wird **nicht neu vergeben**. Atlassian rät davon ab, das Schlüsselformat bei bestehenden Tickets zu ändern.
- **Lehre:** Präfix = **Ort** (welches Projekt), nicht Art oder Zustand; Nummern nie wiederverwenden; alte Kennungen bleiben als
  Verweis gültig.

### 2.2 GitHub – ein Zähler je Repo, Verweis über Repo-Grenzen

- Issues und Pull Requests teilen sich **einen** Zähler je Repo (#1, #2 …); über Repos hinweg verweist man mit `owner/repo#123`.
- **Lehre:** innerhalb eines Repos genügt die Nummer; der Repo-Name macht sie global eindeutig. (GitLab zählt Issues und Merge
  Requests getrennt – beide Wege sind üblich.)

### 2.3 RFC (IETF) und ADR – fortlaufend, nie wiederverwendet, ersetzen statt ändern

- Jede RFC hat eine eigene Nummer, die **nie wieder vergeben** wird; eine Neufassung ist eine **neue** RFC, die die alte ‚obsoletes‘.
- ADR (Architekturentscheidungen nach Nygard, Werkzeug adr-tools): `0001-titel.md`, vierstellig, fortlaufend; eine geänderte
  Entscheidung ist ein **neues** ADR, das alte bekommt den Status ‚ersetzt durch …‘ und bleibt stehen (Fowler: angenommene ADRs nicht
  wieder öffnen, sondern ersetzen).
- **Lehre:** für Entscheidungen und Regeln: Nummer fest, Inhalt versioniert; Ersatz mit Vorwärts- und Rückverweis.

### 2.4 Anforderungen – ISO/IEC/IEEE 29148 und Praxis

- 29148 verlangt, dass Anforderungen **rückverfolgbar** sind und Attribute (Kennung, Priorität, Quelle, Status …) bei der
  Anforderung gespeichert werden; Vorlagen auf Grundlage der Norm führen eine **Id, eindeutig im Dokument**. (Den genauen Normtext
  zur Kennung habe ich nicht eingesehen – nur Sekundärquellen.)
- Drei übliche Formen der Kennung:
  - **fortlaufend** (R1 … Rn): einfach, aber ohne Zusammenhang, große Zahlen;
  - **Thema + Zähler** (z. B. FOKUS-3): kleine Zähler, Zusammenhang sichtbar, aber jedes Stück braucht genau ein Hauptthema;
  - **hierarchisch nach Gliederung** (4.1.2): lesbar, aber die Nummer **ändert sich beim Umsortieren** – Werkzeuge wie Enterprise
    Architect vergeben sie dann neu; für feste Kennungen ungeeignet.

### 2.5 Testfälle

- Testfall-Kennung mit Präfix, dazu **ein Feld mit der Anforderungs-Kennung** (Rückverfolgbarkeits-Matrix); Testverfahren, die zu
  einer Beschreibung gehören, teilen deren Präfix (Elternbezug).
- In manchen Werkzeugen (z. B. BrowserStack) ist das Präfix eines Projekts nach dem Anlegen **nicht mehr änderbar** – ein Präfix
  wählt man also einmal.

---

## 3. Abgeleitete Grundsätze (Vorschlag)

| Nr. | Grundsatz | Vorbild | heute |
|---|---|---|---|
| G1 | **Eindeutig über alle Repos:** Präfix + Nummer bedeutet überall genau eine Sache | Jira, GitHub `owner/repo#` | nein (Befund 1) |
| G2 | **Nie wiederverwenden, nie umnummerieren;** Ersatz = neue Nummer mit ‚ersetzt …‘ / ‚ersetzt durch …‘ | RFC, ADR, Jira | ja, nur ungeschrieben (außer 0 Nr. 3) |
| G3 | **Präfix sagt Ort bzw. Art, nie Zustand;** Status, Priorität, Version sind Spalten | Jira, 29148-Attribute | nein (E-, Befund 2) |
| G4 | **Unterpunkte mit Elternnummer:** `P-73/1`, `A-63/X-2` statt nacktem `X-2` | Testfälle mit Bezug, P-73/1 | teils |
| G5 | **Feste Kennung unabhängig von der Gliederung** (keine Abschnittsnummer in der Kennung) – oder die Gliederung wird nie umgebaut | Enterprise Architect, Cameo | R-5.6 hängt an Abschnitt 5 |
| G6 | **Ein Format:** Großbuchstaben, Bindestrich, Nummer ohne führende Nullen | Jira | gemischt (Befund 3) |
| G7 | **Wenige Präfixe, an einer Stelle erklärt** (Tabelle in Zusammenarbeit 2.4) mit Prüfung (`checkCollab`: unbekanntes Präfix = rot) | Jira-Projektliste | keine Regel |

---

## 4. Varianten für den Austausch

**a) Festschreiben und Doppelungen auflösen (klein)**
Die heutigen Präfixe bleiben; neu ist eine Tabelle in 2.4 mit G2, G4, G6. Doppelungen werden nur **künftig** vermieden: Fälle nur
noch mit Elternnummer zitiert (`A-63/X-2`), die Framework-Themen als `A-38/T-1`. E- bleibt. Kein Umbenennen alter Texte.

**b) Ein Präfix je Repo, Art und Zustand als Spalte (Jira-Art, groß)**
`AD-…`, `RL-…`, `RI-…` für alle Themen eines Repos; P- (Prüfpunkt) und E- (Erledigt) entfallen als eigene Nummern – Prüfung und
Erledigt werden Status des Themas, die Prüfliste hängt an der Version. Alte Nummern bleiben als Verweis gültig (Tabelle
alt → neu). Sehr sauber, aber großer Umbau und neue Gewohnheit.

**c) Mittelweg (Empfehlung zur Diskussion)**
- **Themen:** A- (AppDesign), T- (Reiselogbuch), ein neuer Buchstabe für ReiseLogBuch-Import (I- ist in T-05 schon belegt, also z. B. K- oder ein anderer freier), je weitere App ein eigener Buchstabe – wie heute.
- **E- entfällt künftig:** ein erledigtes Thema behält seine Nummer und wandert mit Status ‚erledigt‘ in den Abschnitt Erledigt
  (G3); alte E-Nummern bleiben stehen.
- **P- bleibt gemeinsam** (eine Version = ein Prüfpunkt über beide Repos), Unterpunkte `P-73/1`.
- **Regeln:** R- und G- bleiben, Nummern fest (G2, G5 als Vereinbarung); keine neuen Präfixe für Befunde (S-1 → Liste in der
  Regel selbst).
- **Fälle:** in der Fall-Liste frei, außerhalb der Datei immer mit Elternnummer (`A-63/X-2`, `T-05/F-18`).
- **Prüfung:** `checkCollab` kennt die Präfix-Tabelle und meldet unbekannte Präfixe und nackte Fall-Nummern in Backlog, CHANGELOG
  und Richtlinien.

---

## 5. Fragen für den Austausch

1. Soll ein **Zustand** (erledigt) eine eigene Nummer bekommen (heute E-), oder behält ein Thema seine Nummer bis zum Schluss?
2. Reicht **ein Buchstabe je Repo** (A-, T-, einer für Import), oder lieber sprechende Kürzel (AD-, RL-, RI-)? Was passiert mit der nächsten App?
3. **Prüfpunkte:** gemeinsamer Zähler über alle Repos wie heute, oder an der Version (z. B. `P-3.33.0`)?
4. **Fall-Nummern:** frei je Liste mit Elternnummer, oder ein einheitliches Präfix (z. B. immer F-) mit Elternnummer?
5. **Regeln:** R-5.6 an die Abschnittsnummer gebunden lassen oder fortlaufend (R-1 … R-n) mit Abschnitt als Spalte?
6. **Altbestand:** nur künftig nach neuem Schema (Tabelle alt → neu für Verweise), oder auch alte Texte umschreiben?
7. **Prüfung:** soll `checkCollab` das Schema prüfen (unbekanntes Präfix, nackte Fall-Nummer, führende Nullen)?

---

## Quellen

- Atlassian: [Changing the project key format](https://confluence.atlassian.com/adminjiraserver/changing-the-project-key-format-938847081.html),
  [Moved issues no longer redirect from previous issue key](https://support.atlassian.com/jira/kb/moved-issues-no-longer-redirect-from-previous-issue-key-or-url-in-jira/),
  [Reset the project counter and reuse issue keys](https://support.atlassian.com/jira/kb/reset-the-project-counter-and-reuse-jira-issue-keys-after-moving-issues/),
  [Store the old issue key when moving](https://support.atlassian.com/automation/kb/how-to-store-the-old-issue-key-when-an-issue-is-moved-from-one-project-to/),
  [Community: changing the project key](https://community.atlassian.com/forums/Jira-questions/If-I-change-the-project-key-in-Jira-does-it-link-the-original/qaq-p/79322)
- GitHub-Zähler: [daniel.haxx.se – 20,000 issues on GitHub](https://daniel.haxx.se/blog/?p=28719),
  [O'Reilly – GitHub Essentials](https://www.oreilly.com/library/view/github-essentials/9781789138337/6f5c8acb-826a-424c-8dcb-615b8a89d2cf.xhtml)
- RFC: [draft-eastlake-test-rfc-numbers](https://datatracker.ietf.org/doc/html/draft-eastlake-test-rfc-numbers)
- ADR: [Martin Fowler – Architecture Decision Record](https://www.martinfowler.com/bliki/ArchitectureDecisionRecord.html),
  [hascode – ADR-Tools](https://www.hascode.com/managing-architecture-decision-records-with-adr-tools/),
  [Real Python – ADR](https://realpython.com/ref/software-engineering-glossary/architecture-decision-record/)
- ISO/IEC/IEEE 29148 (Sekundärquellen): [ReqView – 29148 Templates](https://www.reqview.com/doc/iso-iec-ieee-29148-templates/),
  [CWNP – IEEE 29148-2018](https://www.cwnp.com/req-eng/)
- Kennungsformen: [W3C-Liste – Kennungen für Anforderungen](https://lists.w3.org/Archives/Public/public-dxwg-wg/2017Sep/0060.html),
  [Enterprise Architect – Requirements naming and numbering](https://sparxsystems.com/enterprise_architect_user_guide/15.2/model_domains/requirements_naming_and_numbering.html),
  [Cameo Requirements Modeler](https://docs.nomagic.com/x/fsvuB)
- Testfälle: [BrowserStack – Test case ID prefix](https://www.browserstack.com/docs/test-management/test-cases/test-case-id-prefix),
  [Texas DIR – Test Scenario Instructions](https://dir.texas.gov/sites/default/files/2025-07/Test%20Scenario%20Instructions_July2025_0.docx),
  [Stravica – ID conventions](https://raw.githubusercontent.com/Stravica/rcf-schemas/HEAD/docs/id-conventions.md)
