import { LanguageObjType } from "./basic.shape";
import homeTranslations, { type HomeTranslations } from "./home";

export const fullTranslationsObject = {
  HOME: homeTranslations,
} as const satisfies LanguageObjType;

export type TranslationFullObjType = {
  HOME: HomeTranslations;
};

export * from "./basic.shape";
export { default as homeTranslations } from "./home";

// Exampel of TranslationFullObjType
const x: TranslationFullObjType = fullTranslationsObject;

export const arabicNavServiceWord = x.HOME.nav_service.AR; // fully intellisensed, hover on the arabicNavServiceWord
