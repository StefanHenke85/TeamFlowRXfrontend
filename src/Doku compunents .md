

Dokumentation der Components :

Mit der CircleLayout-Komponente werden die Schaltflächen in einem kreisförmigen Layout anordnet und ein ansprechendes Design für die Anwendung erstellt. 


 Die CircleLayout.jsx-Komponente verwendet SVG (Scalable Vector Graphics), um Schaltflächen in einem kreisförmigen Layout anzuordnen. Jede Schaltfläche ist entlang eines kreisförmigen Pfads positioniert, und der Text wird entlang dieser Pfade ausgerichtet. Dies ermöglicht eine visuell ansprechende und symmetrische Anordnung der Schaltflächen.
Erklärung des Codes
    1. SVG-Element:
        ◦ Das svg-Element definiert eine Zeichenfläche mit einer Breite und Höhe von 800 Pixeln.
        ◦ Die Klasse circle-layout wird für das Styling verwendet.
    2. Schaltflächen:
        ◦ Jede Schaltfläche ist ein a-Element mit der Klasse circle-button.
        ◦ Innerhalb jedes a-Elements gibt es ein path-Element, das den kreisförmigen Pfad definiert.
        ◦ Das text-Element enthält ein textPath, das den Text entlang des definierten Pfads ausrichtet.
    3. Pfaddefinitionen:
        ◦ Die d-Attribute der path-Elemente definieren die Kreise mit unterschiedlichen Radien und Positionen.
      4.Textausrichtung:
    • Das textPath-Element verwendet das href-Attribut, um den Pfad zu referenzieren, entlang dessen der Text ausgerichtet wird.
    • Das startOffset-Attribut bestimmt die Startposition des Textes entlang des Pfads.

Die LanguageSwitcher.jsx-Komponente ermöglicht es den Benutzern, die Sprache der Anwendung zu wechseln. Sie verwendet die react-i18next-Bibliothek, um die Internationalisierung zu handhaben. 


Importe:
        ◦ React und useTranslation von react-i18next werden importiert.
        ◦ Flaggenbilder für verschiedene Sprachen werden aus dem assets/flags-Verzeichnis importiert.
        ◦ Die CSS-Datei LanguageSwitcher.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die i18n-Instanz zuzugreifen, die für die Sprachwechsel verantwortlich ist.
    3. changeLanguage Funktion:
        ◦ Diese Funktion ändert die aktuelle Sprache der Anwendung, indem sie i18n.changeLanguage(lang) aufruft.
        ◦ Die gewählte Sprache wird im Local Storage gespeichert, damit die Auswahl auch nach einem Seitenneuladen erhalten bleibt.
    4. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse language-switcher.
        ◦ Innerhalb dieser div gibt es mehrere button-Elemente, die jeweils ein Flaggenbild enthalten.
        ◦ Beim Klicken auf einen der Buttons wird die changeLanguage-Funktion mit dem entsprechenden Sprachcode aufgerufen.
          
Die ScrollBar.jsx-Komponente erstellt eine scrollbare Liste von Elementen, die sowohl dynamische als auch statische Inhalte enthalten. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ Die CSS-Datei ScrollBar.css wird für das Styling importiert.
    2. Items-Array:
        ◦ Ein Array items wird definiert, das dynamische Elemente mit Bildern und Namen enthält. Jedes Element hat eine id, einen name und einen img-Pfad.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse scroll-container.
        ◦ Innerhalb dieser div gibt es zwei Arten von Elementen:
            ▪ Dynamische Items: Diese werden aus dem items-Array generiert. Jedes Element wird in einer div mit der Klasse scroll-item gerendert, die ein Bild (img) und einen Namen (p) enthält.
            ▪ Statische Elemente: Diese sind fest codiert und werden ebenfalls in div-Elementen mit der Klasse scroll-item gerendert.

Die WaterScene.jsx-Komponente erstellt eine animierte Wasserszene mit Hilfe der 3D-Bibliothek three.js. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React, useEffect und useRef werden importiert, um die Komponente zu erstellen und Nebenwirkungen zu handhaben.
        ◦ THREE wird importiert, um die 3D-Szene zu erstellen.
    2. Referenz für das Mounten:
        ◦ mountRef wird verwendet, um auf das DOM-Element zuzugreifen, in das der Renderer eingefügt wird.
    3. useEffect Hook:
        ◦ Der useEffect-Hook wird verwendet, um die Szene, Kamera und den Renderer zu erstellen und zu konfigurieren, sobald die Komponente gemountet wird.
    4. Szene, Kamera und Renderer:
        ◦ Eine neue THREE.Scene wird erstellt.
        ◦ Eine THREE.PerspectiveCamera wird erstellt und konfiguriert.
        ◦ Ein THREE.WebGLRenderer wird erstellt und auf die Größe des Fensters eingestellt. Der Renderer wird an das DOM-Element angehängt, das durch mountRef referenziert wird.
    5. Licht hinzufügen:
        ◦ Ein THREE.DirectionalLight wird erstellt und zur Szene hinzugefügt, um die Objekte zu beleuchten.
    6. Wasser-Geometrie und -Material:
        ◦ Eine THREE.CircleGeometry wird erstellt, um die Form des Wassers zu definieren.
        ◦ Ein THREE.ShaderMaterial wird erstellt, um das Wasser mit animierten Wellen zu rendern. Der Vertex-Shader und der Fragment-Shader definieren die Wellenbewegung und die Farbe des Wassers.
    7. Wasser-Mesh hinzufügen:
        ◦ Ein THREE.Mesh wird erstellt, das die Wasser-Geometrie und das Wasser-Material kombiniert, und zur Szene hinzugefügt.
    8. Kamera-Positionierung:
        ◦ Die Kamera wird so positioniert, dass sie die gesamte Wasserfläche sieht.
    9. Animation:
        ◦ Eine Animationsfunktion wird erstellt, die die Zeit-Uniform des Shaders aktualisiert und die Szene kontinuierlich rendert.
    10. Fenstergröße anpassen:
        ◦ Ein Event-Listener wird hinzugefügt, um die Größe des Renderers und der Kamera anzupassen, wenn das Fenster geändert wird.
    11. Cleanup:
        ◦ Beim Entfernen der Komponente wird der Renderer aus dem DOM entfernt und der Event-Listener wird abgemeldet.
          
Die Whiteboard.jsx-Komponente erstellt ein interaktives Whiteboard, auf dem Benutzer zeichnen können. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ ReactSketchCanvas wird aus der Bibliothek react-sketch-canvas importiert, um das Whiteboard bereitzustellen.
        ◦ Die CSS-Datei Whiteboard.css wird für das Styling importiert.
    2. Whiteboard-Komponente:
        ◦ Die Whiteboard-Komponente rendert eine div mit der Klasse whiteboard-container.
        ◦ Innerhalb dieser div wird das ReactSketchCanvas-Element gerendert, das die Zeichenfläche darstellt.
    3. ReactSketchCanvas:
        ◦ strokeWidth: Die Breite der gezeichneten Linien wird auf 4 Pixel gesetzt.
        ◦ strokeColor: Die Farbe der gezeichneten Linien wird auf Lila (#A259FF) gesetzt.
        ◦ style: Die Größe der Zeichenfläche wird auf 900x550 Pixel festgelegt.
        ◦ canvasColor: Die Hintergrundfarbe der Zeichenfläche wird auf Weiß mit leichter Transparenz (rgba(255, 255, 255, 0.8)) gesetzt.
Die  Whiteboard.jsx und die  ScrollBar.jsx werden im Projekt nicht 
mehr verwendet werden entfernt.