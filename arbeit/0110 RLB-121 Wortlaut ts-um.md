# RLB-121 Wortlaut – Umbau bei großer Schrift im schmalen Inhalt (R-1.10)

**13.11.2026** · Sitzung ‚Reiselogbuch 0110‘ · Variante A, allgemein (Nutzer 13.11.2026) · Befund `arbeit/0110 RLB-121 iPad hoch.md`

## RLB-121/W-3 – Designrichtlinie allgemein 3, Punkt ‚Umbau bei großer Schrift‘

**Alt:**

> **Umbau bei großer Schrift** (`html.ts-um`: ab AX1, auf dem iPhone hoch ab XXL): Nebeneinanderliegendes steht untereinander – …

**Neu:**

> **Umbau bei großer Schrift** (`html.ts-um`: ab AX1; ab XXL, wenn der Inhalt schmal ist – unter 600 px, z. B. iPhone hoch oder iPad hoch
> neben der Seitenleiste): Nebeneinanderliegendes steht untereinander – …

(der Rest des Punkts bleibt unverändert)

## RLB-121/W-4 – Regelkatalog 17, R-1.10

**Alt:**

> … ab AX1 (iPhone hoch ab XXL) steht Nebeneinanderliegendes untereinander, Tabellen im Inhalt als Kästen; …

**Neu:**

> … ab AX1 (bei schmalem Inhalt unter 600 px – iPhone hoch, iPad hoch neben der Seitenleiste – ab XXL) steht Nebeneinanderliegendes
> untereinander, Tabellen im Inhalt als Kästen; …

## Technisch

`textUm` (ui.js): `ts-um` ab 28 px oder ab 21 px, wenn `main` schmaler als 600 px ist (bisher: ab 21 px nur am iPhone hoch); neu
berechnet beim Drehen und wenn sich die Breite von `main` ändert (Seitenleiste ein/aus). Am iPhone hoch bleibt alles wie heute (Inhalt
390 px), am iPhone quer und iPad quer auch (Inhalt breiter als 600 px). Neu ist es nur am iPad hoch neben der Seitenleiste und bei
geteiltem Bildschirm. Prüfung: `checkText` und die betroffenen Prüfungen der Apps im vollen Lauf.
