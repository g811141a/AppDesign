# APD-5 Fund – Git-Markierung (Tag) aus der Cloud nicht möglich

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0004 – APD-5 Version B‘ · Testfall-Liste D-6

## Was passiert ist

- AppDesign 4.14.0 und Reiselogbuch 3.13.0 sind **online** (beide Pages-Läufe ‚success‘, alle 40 Prüfläufe grün).
- Die Markierung `v4.14.0` konnte **nicht** auf GitHub angelegt werden: Der Git-Zugang der Cloud-Umgebung lehnt das
  Hochladen von Markierungen ab (HTTP 403), die GitHub-Schnittstelle ebenso („Write access … not permitted through this
  proxy“). `main` hochladen geht wie bisher.
- Folge: In der README des Reiselogbuchs zeigen die Links auf Designrichtlinie, Zusammenarbeit und Bausteine auf
  `…/blob/v4.14.0/…` – diese Seiten gibt es auf GitHub noch nicht (Fehlerseite). **Die App selbst ist nicht betroffen**: sie
  lädt ihre Fassung `fassung/4.14.0/`, die auf `main` liegt.
- Warum übersehen: Der Selbsttest lädt in ein lokales Schein-Repo hoch, das Markierungen annimmt; die Sperre gibt es nur
  beim echten GitHub aus der Cloud.

## Möglichkeiten

| | Weg | Aufwand je Version | Bewertung |
|---|---|---|---|
| **a** | **Richtlinien-Text mit in die Fassung:** `fassung/X.Y.Z/` enthält zusätzlich `README - Designrichtlinie allgemein.md` und `README - Zusammenarbeit allgemein.md` (mit Prüfsummen, unveränderlich). Die README der App verlinkt `…/blob/main/fassung/X.Y.Z/…`. Keine Markierung mehr. | keiner – das Skript macht alles | **Empfehlung:** alles an einem Ort, geht aus der Cloud, `doku.mjs` liest die Richtlinien-Version direkt aus der Fassung (auch in einer flachen Kopie) |
| b | Markierung bleibt; **du legst sie je Version selbst an** (GitHub in Safari → AppDesign → Releases → ‚Draft a new release‘ → Tag `v4.14.0` → ‚Publish release‘) | ein Handgriff je AppDesign-Version | geht, aber ein Schritt mehr für dich, den man vergessen kann |
| c | Links auf den Commit statt auf eine Markierung (`…/blob/122c0f3/…`) | keiner | funktioniert, aber unleserliche Links; die Version steht nicht im Link |

## Umsetzung bei a (Korrekturversion AppDesign 4.14.1 · Reiselogbuch 3.13.1)

1. Skript: Fassung enthält die zwei Richtlinien-Dateien; `los` legt keine Markierung mehr an (‚veröffentlicht‘ = auf `origin/main`).
2. `doku.mjs`: Richtlinien-Versionen aus `fassung/X.Y.Z/`; Links müssen auf `blob/main/fassung/X.Y.Z/` zeigen.
3. README des Reiselogbuchs auf die neuen Links; Selbsttest angepasst (auch: Markierung wird nicht gebraucht).
4. Texte: Designrichtlinie 14, README, CLAUDE.md, Testfall-Liste D-6, CHANGELOG, Testfälle P-37 (nur /0 und ein Link).
5. Die lokale Markierung `v4.14.0` wird nicht gebraucht und gelöscht; `fassung/4.14.0/` bleibt unverändert.
