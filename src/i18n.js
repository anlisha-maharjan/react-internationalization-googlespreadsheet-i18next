import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const fallbackLng = ["en"];
const availableLanguages = ["en", "no"];

i18n
  .use(HttpApi) // load translations using http (default public/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // fallback language is english.
    preload: ["en", "fi"],
    detection: {
      checkWhitelist: true, // options for language detection
    },
    supportedLngs: availableLanguages,
    react: {
      useSuspense: false,
    },
    debug: false,
    whitelist: availableLanguages,
  });

export default i18n;
