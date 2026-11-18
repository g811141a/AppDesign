# Usertest P-109 – Rückmeldung ‚nicht ok‘

Du hast ‚P-109: nicht ok‘ gemeldet. Damit ich den Fehler genau nachbauen kann (0 Nr. 1), brauche ich **welche Testfälle nicht ok
sind** und je ein Stichwort, was anders war (Gerät, quer/hoch, was du gesehen hast). Beispiel: ‚ok bis auf 3 – iPhone, Kapsel springt beim Loslassen‘.

| Testfall | Thema |
|---|---|
| P-109/0 | Version prüfen (3.57.2 · AppDesign 4.60.2) |
| P-109/1 | Aufwischen wie Notizen: ab halber Kapsel, aus der Mitte, gleiche Abstände |
| P-109/2 | Zurückwischen und Tippen: genau umgekehrt, nichts ragt über den Rand |
| P-109/3 | Über die Kapseln hinaus: kein Durchwischen, Zurückfedern |
| P-109/4 | Bewegung reduzieren: Kapseln blenden nur ein |
| P-109/5 | Größte Textgröße: Kapseln und Abstände größer |

Ein Video oder Screenshot hilft beim Nachbauen, wenn das Verhalten schwer zu beschreiben ist (`ffmpeg` ist vorhanden).

Danach: ich baue deinen Ablauf als feste Prüfung nach (rot gegen 4.60.2), behebe den Fehler und frage dann nach der Korrekturversion.
