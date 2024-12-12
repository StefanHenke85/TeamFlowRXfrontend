import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importiere Übersetzungsdateien
import en from "../public/locales/en/translation.json";
import de from "../public/locales/de/translation.json";
import fr from "../public/locales/fr/tranlation.json";
import ru from "../public/locales/ru/translation.json";
import zh from "../public/locales/zh/translation.json";

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
    },
    lng: savedLanguage,
    fallbackLng: "en", // Fallback-Sprache
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
