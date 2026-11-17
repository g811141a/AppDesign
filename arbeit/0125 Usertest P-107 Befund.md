# Usertest P-107 – Befund (AppDesign 4.60.0 / Reiselogbuch 3.57.0, Sitzung 0125)

**Stand 17.11.2026** · Rückmeldung des Nutzers 17.11.2026, wörtlich unten; P-107/0, /2, /3, /5, /6, /7, /10 ok; Rückfragen beantwortet

## Rückmeldung (wörtlich)

> Add 1) Beim nach links wischen soll zuerst die Löschen Kapsel herausfaden und wenn die Kapsel die volle Größe erreichthat beim weiteren nach links
> wischen soll die nächste kapsel herausfaden und sich zur vollen größe vergrößern, gleich wie in der apple notes app.
> Add 5) zurückwischen funktioniert nicht so wie in apple notes. Beim zurückwischen soll die erste kapsel ausfaden und sich verkleinern bis die kachel
> die nächste kapsel (Lösche) erreicht. Die Löschen Kapsel soll sich dann beim weiterwischen verkleinern und ausfaden und dabei nicht über die
> seitenleiste hinausschieben.
> Add 8) funktioniert nicht
> Add 9) bei vergrößerter Schrift ist die kapselbeschreibung größer aber die kapsel selbst wird nicht größer obwohl die sonstigen schaltflächen bei
> vergrößerter schrift mitwachsen.
> Alle anderen punkte ok

## Fehler (Nummern F-1 bis F-4)

- **F-1 (P-107/1) Aufwischen nacheinander:** Heute wachsen beide Kapseln gleichzeitig. Gewünscht wie in Notizen:
  - zuerst erscheint ‚Löschen‘ (ganz außen) mit Einblenden und wächst bis zur vollen Größe;
  - erst beim Weiterwischen erscheint die nächste Kapsel ‚Einstellen‘ und wächst.
- **F-2 (P-107/4 Zurückwischen – in der Rückmeldung ‚5‘, gemeint ist P-107/4, bestätigt; P-107/5 ok):** genau umgekehrt nacheinander:
  - zuerst wird ‚Einstellen‘ blasser und kleiner, bis die Kachel ‚Löschen‘ erreicht;
  - dann wird ‚Löschen‘ kleiner und blasser.
  - Dabei darf ‚Löschen‘ nicht über den Rand der Seitenleiste hinausgeschoben werden. Das ist ein Fehler heute: die Kapsel ragt beim Zurückwischen
    über die Seitenleiste hinaus.
- **F-3 (P-107/8 Bewegung reduzieren):** ‚funktioniert nicht‘ – auf Rückfrage: **gleitet trotzdem** – Kachel bzw. Kapseln gleiten und wachsen wie ohne ‚Bewegung reduzieren‘ (Schritt 2 und 3 wie normal). Vermutung: `prefers-reduced-motion` greift im Code der Bean nicht (Übergänge in JS gesetzt) – im Bau prüfen, warum `checkWischen` das nicht fand.
- **F-4 (P-107/9 größte Textgröße):** Das Wort unter der Kapsel wächst, die Kapsel selbst nicht (fest 66 × 44). Andere Schaltflächen wachsen mit der Textgröße.
  - Widerspricht dem bestätigten Wortlaut ‚Maße und Schwellen der Bedienung sind fest in der Bean‘ (R-1.13) und den festen Maßen 66 × 44 in 15.4.
  - Braucht eine Wortlaut-Änderung (0 Nr. 29): Maße der Kapseln wachsen mit der Textgröße wie die anderen Schaltflächen.

## Nächste Schritte (Sitzung 0126)

1. Apple-Abgleich mit Quellen: Aufwischen und Zurückwischen der Aktionen in Notizen/Mail (iOS 26/27), Größe der Aktionen bei großer Textgröße.
   Die Beobachtung des Nutzers in Notizen ist die Vorgabe; Apple-Quellen ergänzen nur.
2. Testfall-Liste APD-30 ergänzen (ab W-81) für F-1 bis F-4, mit Gegenproben.
3. Wortlaut alt und neu für R-7.8 / 15.4 (Ablauf nacheinander, nicht über die Liste hinaus) und R-1.13 / 15.4 (Maße mit der Textgröße).
4. Bau-Frage für AppDesign 4.60.1 mit Reiselogbuch 3.57.1 (Fehlerbehebung, voll), dann Usertest P-108.
