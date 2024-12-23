TeamFlowRXfrontend Dokumentation
Inhaltsverzeichnis
    1. Einführung
    2. Projektstruktur
    3. Installation und Einrichtung
    4. Verwendung von Vite
    5. React-Komponenten
    6. Internationalisierung (i18n)
    7. Best Practices
    8. Häufige Probleme und Lösungen
    9. Technologie-Stack






Einführung
Willkommen zur Dokumentation des TeamFlowRXfrontend-Projekts! Diese Dokumentation soll sowohl erfahrenen Entwicklern als auch Neueinsteigern helfen, das Projekt zu verstehen und daran mitzuarbeiten.
Das Entwicklerteam besteht aus folgenden Mitgliedern :                  Roland Bota
                                                                        Stefan Henke
                                                                        Erik Richter
                                                                        Peter Martin Berg
                                                                        Christopher Breuning
                                                                                                                  






Projektstruktur
Die Projektstruktur sieht wie folgt aus:
TeamFlowRXfrontend
├── node_modules
├── public
├── src
│   ├── components
│   │   ├── LanguageSwitcher.jsx
│   │   ├── LoginPage.jsx
│   │   └── ...
│   ├── locales
│   │   ├── en
│   │   │   └── translation.json
│   │   ├── de
│   │   │   └── translation.json
│   │   ├── es
│   │   │   └── translation.json
│   │   ├── pt
│   │   │   └── translation.json
│   │   └── ...
│   ├── App.jsx
│   ├── i18n.jsx
│   └── ...
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock

Node.js installieren: Stelle sicher, dass Node.js auf deinem System installiert ist. Du kannst es von der offiziellen Node.js-Website herunterladen und installieren. 

Projekt klonen: git clone https://github.com/yourusername/TeamFlowRXfrontend.git
cd TeamFlowRXfrontend

Abhängigkeiten installieren: yarn install, npm install

Verwendung von Vite
Vite ist ein schneller Entwicklungsserver und Build-Tool für moderne Webprojekte. Um das Projekt zu starten, verwendet man den folgenden Befehl:
yarn dev, npm run dev

Dies startet den Entwicklungsserver und öffnet das Projekt im Browser unter http://localhost:5173. 


React-Komponenten
Die React-Komponenten befinden sich im Verzeichnis src/components. Jede Komponente ist in einer eigenen Datei definiert . Hier sind die Komponenten :
CircleLayout.jsx
LanguageSwitcher.css
LanguageSwitcher.js
ScrollBar.jsx
 WaterScene.jsx
Internationalisierung (i18n)
Das Projekt verwendet react-i18next für die Internationalisierung. Die Übersetzungsdateien befinden sich im Verzeichnis src. Hier ist die Konfiguration von i18n:
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Importiere Übersetzungsdateien
import en from "../public/locales/en/translation.json";
import de from "../public/locales/de/translation.json";
import fr from "../public/locales/fr/tranlation.json";
import ru from "../public/locales/ru/translation.json";
import zh from "../public/locales/zh/translation.json";
import es from "../public/locales/es/translation.json";
import pt from "../public/locales/pt/translation.json";
// Sprache aus Local Storage holen
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      ru: { translation: ru },
      zh: { translation: zh },
      es: { translation: es },
      pt: { translation: pt },
    },
    lng: savedLanguage,
    fallbackLng: "en", // Fallback-Sprache
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;

Best Practices
    • Komponentenstruktur:  die Komponenten klein und fokussiert halten. Jede Komponente sollte eine einzige Aufgabe erfüllen.
    • Stiltrennung: Es sollten separate CSS-Dateien für das Styling der Komponenten verwendet werden .
    • Code-Qualität: Es sollte ESLint und Prettier verwendet werden, um den Code konsistent und fehlerfrei zu halten.
    • Dokumentation: Dokumentieren des Code und die Komponenten, um die Wartung und Zusammenarbeit zu erleichtern.
Häufige Probleme und Lösungen
    • Fehlende Abhängigkeiten: Es muss Sichergestellt sein , dass alle Abhängigkeiten installiert sind, indem  yarn install oder npm install ausführt wird.
    • Port-Konflikte: Wenn der Entwicklungsserver nicht startet, muss überprüft werden, ob der Port 5173 bereits verwendet wird. Der Port kann in der vite.config.js geändert werden .
Technologie-Stack
    • React: Eine JavaScript-Bibliothek für den Aufbau von Benutzeroberflächen.
    • Vite: Ein schneller Entwicklungsserver und Build-Tool.
    • react-i18next: Ein Internationalisierungs-Framework für React.
    • ESLint: Ein Tool zur Identifizierung und Behebung von Problemen in JavaScript-Code.
    • Automatische Fehlerbehebung: Viele Probleme können mit dem Befehl :
      eslint --fix automatisch behoben werden. 
    • Probleme automatisch beheben: npx eslint yourfile.js --fix
	
    • Prettier: Ein Code-Formatter, der den Code konsistent und lesbar hält.
