# APD-140 Bean-Katalog – Wortlaut zur Freigabe (0 Nr. 29)

**Stand 19.11.2026** · Sitzung 0142 · noch nichts geändert; nach deinem ‚Ja‘ kommt der Text mit dem Bau von AppDesign 4.65.0 in die Designrichtlinie
(die Richtlinie bekommt dabei ihre neue Version und eine Zeile in der Versionsgeschichte).

Grundlage: `arbeit/0141 APD-140 Muster.md` (entschieden: Variante A, geplante Beans grau, neues Symbol), `arbeit/APD-140 Testfall-Liste.md` (Z-1 bis Z-5),
`checkBeans` in `tests/doku.mjs` (Zeile 482).

## 1. R-1.13 (Regelkatalog 17) – Regeltext

**Alt** (Auszug, der Rest bleibt):

> … eigenem Zustand und eigenem CSS nur unter `.ad-<kennung>…`; die Liste der AD-Beans (15) nennt je Bean Kennung, Bereich, Fabrik, Schnittstelle, Regeln
> und Abschnitt. Die **Kennung** ist sprechend …

**Neu:**

> … eigenem Zustand und eigenem CSS nur unter `.ad-<kennung>…`; die Liste der AD-Beans (15) nennt je Bean Kennung, Bereich, Fabrik, Schnittstelle, Regeln
> und Abschnitt. **Jede Bean der Liste hat im Bean-Katalog (14) eine Datei `katalog/<kennung>.js` mit derselben Kennung, demselben Bereich, derselben
> Fabrik, Schnittstelle (Eigenschaften, Nur lesen, Methoden, Ereignisse) und denselben Regeln wie in der Liste; jede Katalogdatei gehört zu einer Bean
> der Liste. Wer eine Bean neu baut oder ändert, zieht ihre Katalogdatei in derselben AppDesign-Version nach.** Die **Kennung** ist sprechend …

## 2. R-1.13 – Spalte ‚Prüfung‘

**Alt:**

> doku.mjs – `checkBeans` (Liste ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter dem Präfix, Namen in der App)

**Neu:**

> doku.mjs – `checkBeans` (Liste ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter dem Präfix, Namen in der App, **Liste ↔ `katalog/`**) ·
> **`katalog.mjs` (Katalog lädt fehlerfrei, jede Bean geöffnet, Grundregeln, Versionszeile = `AD_VERSION`)**

Technisch (kein Regeltext): Der Katalog zeigt immer den Arbeitsstand. Darum vergleicht `checkBeans` die Liste der Designrichtlinie im Arbeitsstand mit
`katalog/` – unabhängig davon, welche Fassung die App lädt. Die Gegenprobe (Z-5) entfernt eine Katalogdatei bzw. ändert eine Fabrik und muss rot werden.

## 3. Designrichtlinie 14 – ‚Inhalt‘

**Alt** (Auszug):

> … `vorlage/index.html` (Startpunkt für neue Apps und Prüfseite der Bausteine), `werkzeug/` (Veröffentlichen, Kontextstand), `arbeit/` (Muster,
> Testfall-Listen, Auswertungen).

**Neu:**

> … `vorlage/index.html` (Startpunkt für neue Apps und Prüfseite der Bausteine), **`katalog/` (Bean-Katalog: `index.html` als Split View mit den Beans
> nach Bereichen in der Seitenleiste – geplante Beans grau, nicht antippbar –, je Bean der Liste (15) eine Datei `<kennung>.js` mit Beschreibung,
> Ausprobieren, Ereignissen, Regeln, Schnittstelle und Verlauf; lädt immer `v4/`, gehört nicht zur festen Fassung; R-1.13)**, `werkzeug/`
> (Veröffentlichen, Kontextstand), `arbeit/` (Muster, Testfall-Listen, Auswertungen).

## 4. Designrichtlinie 15 – Einleitung

**Alt:**

> … heißen **AD-Beans** (R-1.13); die folgende Liste ist ihre einzige Aufzählung, `checkBeans` liest sie.

**Neu:**

> … heißen **AD-Beans** (R-1.13); die folgende Liste ist ihre einzige Aufzählung, `checkBeans` liest sie; **der Bean-Katalog (14) zeigt jede Bean zum
> Ansehen und Ausprobieren, `checkBeans` hält ihn gleich mit der Liste.**

## 5. Offene Kleinigkeit: Symbol

- **Wischaktionen** (`swipeactions`): neues Lucide-Symbol **`hand`** in `ui.js` (Vorschlag aus 0141; im Muster steht vorläufig chevron-left).
- **Hinweisfenster** (`hinweis`): bleibt **`info`**.

## 6. Was danach kommt

1. ‚Als allgemeine Regel festhalten?‘ (0 Nr. 4) – Vorschlag: ja, als Erweiterung von R-1.13 (eine Regel, keine neue Nummer, 0 Nr. 3).
2. Bau-Frage **AppDesign 4.65.0** mit APD-140 (Stufe nach `veroeffentlichen.mjs stufe`). AD-Bean: keine, weil der Katalog die Beans nur zeigt; `ui.js`
   bekommt nur das Symbol `hand`.
