
## API-Route `/api/notdienst`

Diese API-Route stellt Notdienst-Daten als JSON bereit. Sie erwartet die Query-Parameter `begin` und `end` (Datum im Format YYYY-MM-DD).

Um die Daten abrufen zu können, benötigt man ein Konto bei lakt.de und einen gültigen API-Schlüssel. Der Code kann entsprechend angepasst und als Schnittstelle für eigene Anwendungen verwendet werden.

Beispiel-Aufruf:

```
GET /api/notdienst?begin=2025-08-26&end=2025-08-27
```

Die Antwort enthält die Notdienst-Daten im JSON-Format, abgerufen und konvertiert von einer externen XML-Quelle (lakt.de).


## Repository klonen und lokal nutzen

1. Repository klonen:
	```powershell
	git clone https://github.com/Arteque/thulaktgth.git
	cd thulaktgth
	```
2. Abhängigkeiten installieren:
	```powershell
	npm install
	```
3. Entwicklungsserver starten:
	```powershell
	npm run dev
	```
Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

