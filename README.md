# BlapUll

Eine erste browserbasierte Simulation der Entstehung des Schwebeknechts: Der Wicht flitzt durch Raum und Zeit und sammelt Teilchen, die in einem schwarzen Loch verdichtet werden. Das letzte Teilchen bleibt außerhalb des schwarzen Lochs, unterliegt allein der gesamten Schwerkraft und wird zum Schwebeknecht gepresst. Die genaue Wechselwirkung zwischen Wicht und Schwebeknecht ist noch offen.

## Start

`index.html` direkt in einem aktuellen Browser öffnen. Es sind keine Installation und kein Server nötig. Pause, Neustart und Geschwindigkeit stehen unter der Simulation bereit.

## Vorlagen

- `source/wicht/wicht.py`: Ein kurzer Strich bewegt sich in zufälliger Richtung, schrumpft dabei und erscheint nach einer Pause erneut. Die Simulation greift dieses Bewegungsgefühl auf.
- `source/schwebeknecht/schwebeknecht.gif`: Die Animation mit feinen Fäden dient als visuelle Vorlage.
- `source/schwebeknecht/` enthält außerdem eine Minecraft-Welt und Datapacks. Aus Variante 1 des Datapacks wurden die Glasblock-Koordinaten für die Darstellung in `struktur.js` übernommen; die Minecraft-Welt selbst wird nicht ausgeführt.

Die Teilchenzahl, Zeiten und Darstellung sind eine erste gestalterische Interpretation, keine festgelegten physikalischen Regeln.

## Projektdateien

- `index.html`, `style.css` und `simulation.js` enthalten die Oberfläche und Simulation.
- `struktur.js` enthält die aus dem Datapack übernommenen Glasblock-Koordinaten.
- `source/` enthält die verwendeten Wicht- und Schwebeknecht-Vorlagen. Minecraft-Spielstände, Sitzungsdateien und Sicherungsarchive bleiben über `.gitignore` lokal und werden nicht ins Repository aufgenommen.

## GitHub

Das Projekt kann als statische Website mit GitHub Pages veröffentlicht werden: In den Repository-Einstellungen unter **Pages** als Quelle den gewünschten Branch und das Wurzelverzeichnis auswählen. Es wird kein Build-Schritt benötigt.



# BlapUll (English)

A first browser-based simulation of the emergence of the Schwebeknecht: The Wicht darts through space and time and collects particles, which are compressed in a black hole. The last particle remains outside the black hole, is subject to the entire gravitational force alone, and is pressed into the Schwebeknecht. The exact interaction between the Wicht and the Schwebeknecht is still open.

## Getting started

Open `index.html` directly in a current browser. No installation or server is required. Pause, restart, and speed controls are available below the simulation.

## References

- `source/wicht/wicht.py`: A short line moves in a random direction, shrinks as it does so, and reappears after a pause. The simulation draws on this feeling of movement.
- `source/schwebeknecht/schwebeknecht.gif`: The animation with fine threads serves as a visual reference.
- `source/schwebeknecht/` also contains a Minecraft world and datapacks. The glass block coordinates for the rendering in `struktur.js` were taken from variant 1 of the datapack; the Minecraft world itself is not run.

The particle count, timings, and visual presentation are an initial creative interpretation, not established physical rules.

## Project files

- `index.html`, `style.css`, and `simulation.js` contain the interface and simulation.
- `struktur.js` contains the glass block coordinates taken from the datapack.
- `source/` contains the Wicht and Schwebeknecht references used. Minecraft saves, session files, and backup archives remain local through `.gitignore` and are not included in the repository.

## GitHub

The project can be published as a static website with GitHub Pages: In the repository settings under **Pages**, select the desired branch and the root directory as the source. No build step is required.
