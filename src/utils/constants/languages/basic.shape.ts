export const languages = {
  EN: "EN",
  AR: "AR",
  FR: "FR",
} as const;

export const PAGES = {
  HOME: "HOME",
} as const;

export type PageType = (typeof PAGES)[keyof typeof PAGES];
export type LanguageType = (typeof languages)[keyof typeof languages];

export type LanguageRecord = Record<LanguageType, string>;

export type PageContent = Record<string, LanguageRecord>;

export type LanguageObjType = Record<PageType, PageContent>;
