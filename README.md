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
