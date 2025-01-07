

Dokumentation der Pages :


Die AboutUsPage.jsx-Komponente erstellt eine "Über uns"-Seite für deine Anwendung. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ Die CSS-Datei AboutUsPage.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die Übersetzungsfunktionen zuzugreifen. Dies ermöglicht die Verwendung von Übersetzungen innerhalb der Komponente.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse about-us-page.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Oberer Balken: Eine div mit der Klasse header-bar, die als oberer Balken dient.
            ▪ Inhalt der About Us-Seite: Eine div mit der Klasse about-us-content, die den Hauptinhalt der Seite enthält.
                • Titel: Ein h1-Element, das den Titel der Seite anzeigt. Der Titel wird aus den Übersetzungen mit t('about_us') abgerufen.
                • Willkommensnachricht: Ein p-Element, das die Willkommensnachricht und die Beschreibung des Teams anzeigt. Die Texte werden aus den Übersetzungen mit t('welcome_message') und t('about_us_description') abgerufen.
                • Zielnachricht: Ein p-Element, das die Zielnachricht anzeigt. Der Text wird aus den Übersetzungen mit t('goal_message') abgerufen.
                • Dankesnachricht: Ein p-Element, das die Dankesnachricht anzeigt. Der Text wird aus den Übersetzungen mit t('thank_you_message') abgerufen.
            ▪ Button zur Startseite: Eine div mit der Klasse back-button-container, die einen Link zur Startseite enthält. Der Text des Links wird aus den Übersetzungen mit t('back_to_home') abgerufen.
            ▪ Unterer Balken: Eine div mit der Klasse footer-bar, die als unterer Balken dient.



Die Danke.jsx-Komponente erstellt eine Dankesseite, die nach einer erfolgreichen Registrierung angezeigt wird. Diese Seite enthält eine Konfetti-Animation, um den Benutzer zu feiern. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React und useEffect werden importiert, um die Komponente zu erstellen und Nebenwirkungen zu handhaben.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ Die CSS-Datei Danke.css wird für das Styling importiert.
    2. useEffect Hook:
        ◦ Der useEffect-Hook wird verwendet, um die createConfetti-Funktion auszuführen, sobald die Komponente gemountet wird.
    3. createConfetti Funktion:
        ◦ Diese Funktion erstellt 150 Konfetti-Elemente und fügt sie dem Dokumentenkörper hinzu.
        ◦ Jedes Konfetti-Element ist ein div mit der Klasse confetti.
        ◦ Die Position und Farbe jedes Konfetti-Elements werden zufällig festgelegt.
        ◦ Die Konfetti-Elemente werden nach 3 Sekunden wieder aus dem Dokument entfernt.
    4. randomColor Funktion:
        ◦ Diese Funktion gibt eine zufällige Farbe aus einem vordefinierten Array von Farben zurück.
    5. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse danke-page.
        ◦ Innerhalb dieser div gibt es mehrere Elemente:
            ▪ Titel: Ein h1-Element, das eine Erfolgsnachricht anzeigt.
            ▪ Nachricht: Ein p-Element, das dem Benutzer für die Anmeldung dankt und ihn willkommen heißt.
            ▪ Button zur Startseite: Ein Link-Element, das den Benutzer zur Startseite zurückführt.

Die ImpressumPage.jsx-Komponente erstellt eine Impressum-Seite für deine Anwendung. Diese Seite enthält rechtliche Informationen und Kontaktangaben. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ Die CSS-Datei ImpressumPage.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die Übersetzungsfunktionen zuzugreifen. Dies ermöglicht die Verwendung von Übersetzungen innerhalb der Komponente.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse impressum-page.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Oberer Balken: Eine div mit der Klasse header-bar, die als oberer Balken dient.
            ▪ Inhalt der Impressum-Seite: Eine div mit der Klasse impressum-content, die den Hauptinhalt der Seite enthält.
                • Titel: Ein h1-Element, das den Titel der Seite anzeigt. Der Titel wird aus den Übersetzungen mit t('impressum_title') abgerufen.
                • Einführungstext: Ein p-Element, das den Einführungstext anzeigt. Der Text wird aus den Übersetzungen mit t('impressum_intro') abgerufen.
                • Kontaktinformationen: Ein p-Element, das die Kontaktinformationen anzeigt. Die Texte werden aus den Übersetzungen mit t('company_name'), t('address'), t('postal_city'), t('email') und t('phone') abgerufen.
                • Verantwortliche Person: Ein p-Element, das die verantwortliche Person anzeigt. Die Texte werden aus den Übersetzungen mit t('content_responsible') und t('responsible_person') abgerufen.
                • Haftungsausschluss: Ein p-Element, das den Haftungsausschluss anzeigt. Der Text wird aus den Übersetzungen mit t('disclaimer') abgerufen.
            ▪ Button zur Startseite: Eine div mit der Klasse back-button-container, die einen Link zur Startseite enthält. Der Text des Links wird aus den Übersetzungen mit t('back_to_home') abgerufen.
            ▪ Unterer Balken: Eine div mit der Klasse footer-bar, die als unterer Balken dient.


Die ImpressumPage.jsx-Komponente erstellt eine Impressum-Seite für deine Anwendung. Diese Seite enthält rechtliche Informationen und Kontaktangaben. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ Die CSS-Datei ImpressumPage.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die Übersetzungsfunktionen zuzugreifen. Dies ermöglicht die Verwendung von Übersetzungen innerhalb der Komponente.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse impressum-page.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Oberer Balken: Eine div mit der Klasse header-bar, die als oberer Balken dient.
            ▪ Inhalt der Impressum-Seite: Eine div mit der Klasse impressum-content, die den Hauptinhalt der Seite enthält.
                • Titel: Ein h1-Element, das den Titel der Seite anzeigt. Der Titel wird aus den Übersetzungen mit t('impressum_title') abgerufen.
                • Einführungstext: Ein p-Element, das den Einführungstext anzeigt. Der Text wird aus den Übersetzungen mit t('impressum_intro') abgerufen.
                • Kontaktinformationen: Ein p-Element, das die Kontaktinformationen anzeigt. Die Texte werden aus den Übersetzungen mit t('company_name'), t('address'), t('postal_city'), t('email') und t('phone') abgerufen.
                • Verantwortliche Person: Ein p-Element, das die verantwortliche Person anzeigt. Die Texte werden aus den Übersetzungen mit t('content_responsible') und t('responsible_person') abgerufen.
                • Haftungsausschluss: Ein p-Element, das den Haftungsausschluss anzeigt. Der Text wird aus den Übersetzungen mit t('disclaimer') abgerufen.
            ▪ Button zur Startseite: Eine div mit der Klasse back-button-container, die einen Link zur Startseite enthält. Der Text des Links wird aus den Übersetzungen mit t('back_to_home') abgerufen.
            ▪ Unterer Balken: Eine div mit der Klasse footer-bar, die als unterer Balken dient.

Die LoginPage.jsx-Komponente erstellt eine Login-Seite für deine Anwendung. Diese Seite enthält Informationen über die Software, Links zu anderen Seiten und rechtliche Hinweise. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ Die CSS-Datei Login.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die Übersetzungsfunktionen zuzugreifen. Dies ermöglicht die Verwendung von Übersetzungen innerhalb der Komponente.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse Login-page.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Oberer Balken: Eine div mit der Klasse header-bar, die als oberer Balken dient.
            ▪ Inhalt der Beschreibung-Seite: Eine div mit der Klasse login-content, die den Hauptinhalt der Seite enthält.
                • Titel: Ein h1-Element, das den Titel der Seite anzeigt. Der Titel wird aus den Übersetzungen mit t('software_description') abgerufen.
                • Beschreibung: Ein p-Element, das die Plattform beschreibt. Der Text wird aus den Übersetzungen mit t('platform_description') abgerufen.
                • Links: Mehrere Link-Elemente, die zu anderen Seiten führen. Die Texte der Links werden aus den Übersetzungen mit t('register_login'), t('about_us') und t('impressum') abgerufen.
                • Rechtliche Hinweise: Ein p-Element, das rechtliche Hinweise und Haftungsausschlüsse anzeigt. Die Texte werden aus den Übersetzungen mit t('responsible_content') und t('disclaimer_text') abgerufen.
            ▪ Button zur Startseite: Eine div mit der Klasse back-button-container, die einen Link zur Startseite enthält. Der Text des Links wird aus den Übersetzungen mit t('back_to_home') abgerufen.
            ▪ Unterer Balken: Eine div mit der Klasse footer-bar, die als unterer Balken dient.



Die RegisterLogin.jsx-Komponente bietet eine Benutzeroberfläche für die Registrierung, Anmeldung und Verifizierung von Benutzern. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React und useState werden importiert, um die Komponente zu erstellen und Zustände zu verwalten.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ axios wird importiert, um HTTP-Anfragen zu senden.
        ◦ useNavigate von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ Die CSS-Datei RegisterLogin.css wird für das Styling importiert.
    2. useState Hooks:
        ◦ Mehrere Zustände werden definiert, um die Eingabewerte, Nachrichten und den Anmeldestatus zu verwalten:
            ▪ username, password, email, verificationCode: Zustände für die Eingabefelder.
            ▪ message: Zustand für die Anzeige von Nachrichten.
            ▪ isLoggedIn: Zustand für den Anmeldestatus.
            ▪ token: Zustand für das Authentifizierungstoken.
    3. useNavigate Hook:
        ◦ Der useNavigate-Hook wird verwendet, um die Navigation nach erfolgreicher Anmeldung zu handhaben.
    4. handleRegister Funktion:
        ◦ Diese Funktion sendet eine POST-Anfrage an den Server, um einen neuen Benutzer zu registrieren.
        ◦ Bei Erfolg wird eine Erfolgsmeldung angezeigt, bei Fehlern eine Fehlermeldung.
    5. handleLogin Funktion:
        ◦ Diese Funktion sendet eine POST-Anfrage an den Server, um einen Benutzer anzumelden.
        ◦ Bei Erfolg wird das Authentifizierungstoken gespeichert, eine Erfolgsmeldung angezeigt und der Benutzer zur Raum-Auswahl-Seite weitergeleitet.
        ◦ Bei Fehlern wird eine Fehlermeldung angezeigt.
    6. handleVerifyCode Funktion:
        ◦ Diese Funktion sendet eine POST-Anfrage an den Server, um einen Verifizierungscode zu überprüfen.
        ◦ Bei Erfolg wird eine Erfolgsmeldung angezeigt, bei Fehlern eine Fehlermeldung.
    7. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse container.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Titel: Ein h1-Element, das den Titel der Seite anzeigt. Der Titel wird aus den Übersetzungen mit t('register_login') abgerufen.
            ▪ Formulare: Drei div-Elemente mit der Klasse form-section, die die Formulare für Registrierung, Anmeldung und Verifizierung enthalten.
                • Registrierungsformular: Eingabefelder für Benutzername, Passwort und E-Mail sowie ein Button zum Registrieren.
                • Anmeldeformular: Eingabefelder für Benutzername und Passwort sowie ein Button zum Anmelden.
                • Verifizierungsformular: Eingabefelder für E-Mail und Verifizierungscode sowie ein Button zum Verifizieren.
            ▪ Nachricht: Ein p-Element, das Nachrichten anzeigt.
            ▪ Raum-Auswahl-Button: Ein Button, der zur Raum-Auswahl-Seite navigiert, wenn der Benutzer angemeldet ist.
            ▪ Link zur Startseite: Ein Link, der zur Startseite führt.

Die StartPage.jsx-Komponente erstellt eine Startseite für deine Anwendung. Diese Seite enthält ein Hintergrundbild, einen animierten Wasser-Kreis und Schaltflächen, die zu verschiedenen Seiten der Anwendung führen. Hier ist eine detaillierte Erklärung der Komponente:
Erklärung des Codes
    1. Importe:
        ◦ React wird importiert, um die Komponente zu erstellen.
        ◦ Link von react-router-dom wird importiert, um die Navigation zwischen den Seiten zu ermöglichen.
        ◦ useTranslation von react-i18next wird importiert, um die Internationalisierung zu handhaben.
        ◦ Die CSS-Datei StartPage.css wird für das Styling importiert.
    2. useTranslation Hook:
        ◦ Der useTranslation-Hook wird verwendet, um auf die Übersetzungsfunktionen zuzugreifen. Dies ermöglicht die Verwendung von Übersetzungen innerhalb der Komponente.
    3. Render-Methode:
        ◦ Die Komponente rendert eine div mit der Klasse start-page.
        ◦ Innerhalb dieser div gibt es mehrere Abschnitte:
            ▪ Hintergrundbild: Ein img-Element, das ein Hintergrundbild anzeigt. Das Bild wird aus der Datei start.png geladen und hat die Klasse background-image.
            ▪ Animierter Wasser-Kreis: Eine div mit der Klasse water-circle, die einen animierten Wasser-Kreis darstellt.
            ▪ Schaltflächen um den Kreis herum: Eine div mit der Klasse buttons-container, die mehrere Link-Elemente enthält. Diese Schaltflächen führen zu verschiedenen Seiten der Anwendung:
                • Login: Ein Link-Element, das zur Login-Seite führt. Der Text wird aus den Übersetzungen mit t('login') abgerufen.
                • About Us: Ein Link-Element, das zur "Über uns"-Seite führt. Der Text wird aus den Übersetzungen mit t('about_us') abgerufen.
                • Impressum: Ein Link-Element, das zur Impressum-Seite führt. Der Text wird aus den Übersetzungen mit t('impressum') abgerufen.
                • Register: Ein Link-Element, das zur Registrierungsseite führt. Der Text wird aus den Übersetzungen mit t('register') abgerufen.
