# Bericht – AppDesign 4.60.2 / Reiselogbuch 3.57.2 (Sitzung 0129)

Stand 18.11.2026 · beide Versionen sind veröffentlicht. Alle 164 Läufe waren in Chromium und WebKit grün, die Laufzeit betrug 76:42.

| Teil | Commit auf `main` | Pages |
|---|---|---|
| AppDesign 4.60.2 | 7e559e1 | ‚success‘ (63 s) |
| Reiselogbuch 3.57.2 | 21f2c74 | ‚success‘ (47 s) |

Auf `main` stehen `APP_VERSION` 3.57.2, `AD_NEEDED` 4.60.2 und `AD_VERSION` 4.60.2.

## Kurz

Das Wischen in der Liste ‚Reiselogbücher‘ läuft jetzt so, wie ich es in Notizen gemessen habe. Jede Kapsel steht an ihrem Platz. Sie wächst aus ihrer Mitte, sobald die halbe Kapsel frei ist, und ist voll da, wenn auch der Abstand dahinter frei ist. Zurück läuft es genau umgekehrt. Über die Kapseln hinaus geht die Kachel nur noch mit Widerstand und federt beim Loslassen auf ‚offen‘ zurück. Durchwischen gibt es nicht mehr, gelöscht wird nur über die Kapsel ‚Löschen‘. Alle Abstände sind einheitlich 11 pt und wachsen mit der Textgröße.

## Alle Änderungen

- **`createSwipeactions` (AppDesign `v4/ui.js`):**
  - Neue Rechnung für das Wachsen und Einblenden (Schwelle bei der halben Kapsel, voll nach dem Abstand).
  - Gummiband über die Kapseln hinaus (höchstens 60 px); die Kapseln rücken dabei anteilig mit und werden höchstens 6 % größer.
  - Zurückfedern auf ‚offen‘; der Zweig ‚Durchwischen‘ und der Parameter `durchwischen` entfallen.
  - Abstand 11 pt, mit der Textgröße skaliert.
- **`design.css`:** Die Regeln für Bahn und Band sind entfernt.
- **Texte (Wortlaut P-108/V-1 bis P-108/V-6, wie bestätigt):** Designrichtlinie 15.4, R-7.8, 16 (‚Kein Durchwischen‘), Liste der AD-Beans, 15.21 und `PROMPT.md`.
- **Prüfungen:**
  - Neu: APD-30/W-91 (Schwelle und Mitte), APD-30/W-92 (Abstände), APD-30/W-93 (Überwischen, auch mit ‚Bewegung reduzieren‘), APD-30/W-94 (Zurückfedern) und APD-30/W-95 (Eigenschaften der AD-Bean = Parameter der Fabrik).
  - Angepasst: APD-30/W-1 (offen 165 px), APD-30/W-67 und APD-30/W-76.
  - Entfallen: APD-30/W-16 bis APD-30/W-19.
  - Gegenproben neu gefasst.
- **Warum die Prüfung es nicht fand:** `checkWischen` prüfte R-7.8 so, wie die Regel geschrieben war. Die Regel wich aber selbst von Notizen ab.

## Apple-Abgleich

- **Entspricht Notizen:** Kapseln wachsen ab der halben Breite aus ihrer Mitte, ein Abstand für alles, Widerstand und Zurückfedern, bei ‚Bewegung reduzieren‘ nur Einblenden.
- **Weicht ab:**
  - Wir haben kein Durchwischen, obwohl SwiftUI `allowsFullSwipe` standardmäßig `true` setzt. Notizen nutzt es ebenfalls nicht, und es ist abschaltbar. Das hast du so entschieden (P-108/Q-1).
  - Die Kapseln sind 66 × 44 statt 60 × 32 wie in Notizen. Grund ist die Mindestgröße von 44 pt nach HIG; das hast du bestätigt.

## Erinnerung

Bitte die App auf iPhone und iPad ganz schließen und mit Netz neu öffnen, damit 3.57.2 geladen wird.

## Usertest P-109 – Testfälle

Link: https://g811141a.github.io/ReiseLogBuch/

Bitte in der **App vom Home-Bildschirm** testen und die App vorher ganz schließen und neu öffnen. Es wird nichts gelöscht: tippe nie auf ‚Löschen‘. Zum Vergleich kannst du Notizen daneben öffnen.

**P-109/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.2 · erstellt am … · AppDesign 4.60.2‘.

**P-109/1 – Aufwischen wie Notizen: ab halber Kapsel, aus der Mitte**
1. iPad quer: in der Seitenleiste ‚Reiselogbücher‘ eine Kachel langsam nach links wischen und auf die Kapseln rechts daneben achten.
2. Erwartet: zuerst ist nichts zu sehen; sobald etwa die halbe Kapsel frei ist, wächst rot ‚Löschen‘ aus ihrer Mitte und ist ganz da, wenn auch der Abstand daneben frei ist; danach erscheint ‚Einstellen‘ auf dieselbe Weise.
3. Loslassen, wenn die Kachel offen bleibt. Erwartet: beide Kapseln in voller Größe; die Abstände Kachel–‚Einstellen‘, ‚Einstellen‘–‚Löschen‘ und ‚Löschen‘–rechter Rand sind gleich groß.
4. Dasselbe am iPhone hoch in der Startliste. Erwartet: wie in 2 und 3.

**P-109/2 – Zurückwischen und Tippen: genau umgekehrt**
1. iPad quer: eine Kachel öffnen (nach links wischen, bis sie offen bleibt).
2. Die offene Kachel langsam nach rechts zurückwischen.
3. Erwartet: zuerst schrumpft ‚Einstellen‘ zu ihrer Mitte, bis sie weg ist, danach ‚Löschen‘; keine Kapsel ragt über den Rand der Seitenleiste.
4. Eine Kachel öffnen und auf die Kachel tippen. Erwartet: sie gleitet zurück, die Kapseln vergehen in derselben Reihenfolge (erst ‚Einstellen‘, dann ‚Löschen‘).
5. Dasselbe am iPhone hoch. Erwartet: wie in 3 und 4, nichts ragt über den rechten Bildrand.

**P-109/3 – Über die Kapseln hinaus: kein Durchwischen, Zurückfedern**
1. iPad quer: eine Kachel langsam nach links wischen und weit über die Kapseln hinaus weiterziehen, ohne loszulassen.
2. Erwartet: die Kachel geht nur noch wenig und schwer mit; die Kapseln rücken etwas mit und werden minimal größer; keine Kapsel wird langgezogen, keine verschwindet.
3. Loslassen. Erwartet: die Kachel federt auf ‚offen‘ zurück, beide Kapseln stehen da, es erscheint keine Sprechblase, nichts wird gelöscht.
4. Dasselbe am iPhone hoch und zum Vergleich in Notizen. Erwartet: wie in 2 und 3, Ablauf wie in Notizen.

**P-109/4 – Bewegung reduzieren: Kapseln blenden nur ein**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel langsam nach links wischen. Erwartet: die Kachel folgt dem Finger; die Kapseln stehen an ihrem Platz in voller Größe und blenden ab etwa der halben Kapsel nur ein – sie wachsen nicht und rücken nicht.
3. Weit darüber hinaus ziehen und loslassen. Erwartet: die Kapseln bleiben stehen, die Kachel federt auf ‚offen‘ zurück, keine Sprechblase.
4. ‚Bewegung reduzieren‘ wieder aus.

**P-109/5 – Größte Textgröße: Kapseln und Abstände größer**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Anzeige & Textgröße › Größerer Text ein, Regler ganz nach rechts; App neu öffnen.
2. Eine Kachel nach links wischen, bis sie offen bleibt.
3. Erwartet: die Kapseln samt Symbol und die Abstände dazwischen sind sichtbar größer als bei normaler Textgröße, die Wörter ganz zu lesen, nichts abgeschnitten, keine Kapsel ragt aus Seitenleiste oder Bild.
4. Textgröße wieder zurückstellen.

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

## Backlog

- **Nächste Version:** 0 Punkte bereit.
- **Offen:** Usertest P-109.
- **Danach:** APD-135 Pakete 1 und 3 mit APD-135/W-57 (eigene Version, voll) · APD-136 · RLB-125 (Prio 2) · RLB-126 (Prio 3) · RLB-6.

## Übergabe

Der Kontext hat ‚⚠ Übergabe fällig‘ erreicht. Die Sitzung **Reiselogbuch 0130** fragt nach deiner Rückmeldung zu P-109.
