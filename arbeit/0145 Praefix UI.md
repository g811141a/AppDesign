# Präfix wie Apples ‚UI‘ für Funktionen der Oberfläche? (APD-136)

Sitzung 0145, 20.11.2026, Frage des Nutzers: „Macht es Sinn, User-Interface-Funktionen etc. mit einem Präfix UI wie bei Apple zu versehen?“

## Warum Apple ‚UI‘ davorschreibt (gelesen in dieser Sitzung)

Apple, ‚Programming with Objective-C – Conventions‘:
- „Objective-C classes must be named uniquely not only within the code that you're writing in a project, but also across any frameworks or bundles you
  might be including.“ – „In order to keep class names unique, the convention is to use prefixes on all classes.“
- „Two-letter prefixes like these are reserved by Apple for use in framework classes.“ (`NS` Foundation, `UI` UIKit, `CA`, `CI` …) – eigene Klassen:
  „should use three letter prefixes“.
- „Method names do not have a prefix, and should start with a lowercase letter“.

Also: Das Präfix hat einen technischen Grund (Objective-C kennt keinen Namensraum), es gilt nur für **Klassen**, nicht für Methoden, und `UI` ist für Apple
reserviert. In SwiftUI stehen die Namen ohne Präfix (`alert(…)`, `confirmationDialog(…)` – in dieser Sitzung gelesen).

Im Web (in den Browsern der Prüfumgebung geprüft) gibt es kein Präfix je Funktion, sondern ein **Namensraum-Objekt**: `CSS.escape()`,
`Intl.DateTimeFormat`, `Math.max()`.

## Was wir heute haben

- Unser ‚UI‘ ist schon da: **`ad`** (AppDesign) – CSS nur unter `.ad-<kennung>…`, `data-ad-bean`, die Bean-Exemplare `adAlert`, `adSourcehighlight`.
- `ui.js` stellt der App **72 Namen** bereit (`v4/schnittstelle.json`, Teil `app`; dazu 23 für die Prüfungen) – als einzelne globale Namen
  (`openMenu`, `inform`, `confirmPop` …). Zusammenstöße mit Namen der App verhindert R-1.14 (`checkSchnittstelle`: keine Deklaration der App trägt den
  Namen eines Bausteins von `ui.js`).

## Meine Meinung

**Kein Präfix ‚UI‘ vor jeder Funktion:**
- `UI` ist Apples Präfix (reserviert) und gilt bei Apple nur für Klassen, nie für Methoden;
- wir haben mit `ad` schon ein eigenes Kürzel;
- 72 Namen umzubenennen bringt keinen Nutzen, den R-1.14 nicht schon sichert.

**Wenn, dann wie im Web – ein Namensraum `AD`:** alles aus `ui.js` hinge an einem Objekt (`AD.openMenu(…)`, `AD.inform(…)`, `AD.alert`), wie `CSS` und
`Intl`. Vorteile: nur noch ein globaler Name, man sieht im Code sofort, was aus AppDesign kommt, R-1.14 würde einfacher. Nachteil: alle 72 Aufrufstellen
der App ändern sich und die Prüfungen mit – nach F-3 nicht jetzt, sondern als eigenes Thema (passt zu APD-142 ‚Allgemeines aus der App nach AppDesign‘).

**Vorschlag:** neues Backlog-Thema „Namensraum `AD` für ui.js“ (allgemein), Priorität 3 niedrig – kein Fehler, nur Ordnung; jetzt nichts ändern.
