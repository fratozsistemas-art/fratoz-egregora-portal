import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt";
import en from "./locales/en";
import fr from "./locales/fr";
import zh from "./locales/zh";
import ar from "./locales/ar";
import de from "./locales/de";

export const SUPPORTED_LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "en", label: "English",   flag: "🇬🇧", dir: "ltr" },
  { code: "fr", label: "Français",  flag: "🇫🇷", dir: "ltr" },
  { code: "zh", label: "中文",       flag: "🇨🇳", dir: "ltr" },
  { code: "ar", label: "العربية",   flag: "🇸🇦", dir: "rtl" },
  { code: "de", label: "Deutsch",   flag: "🇩🇪", dir: "ltr" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      fr: { translation: fr },
      zh: { translation: zh },
      ar: { translation: ar },
      de: { translation: de },
    },
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "fr", "zh", "ar", "de"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "egregora_lang",
    },
    interpolation: {
      escapeValue: false, // React already sanitises
    },
  });

/** Apply dir attribute + lang attribute to <html> */
export function applyHtmlDir(lang: string) {
  const entry = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const dir = entry?.dir ?? "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
}

export default i18n;
