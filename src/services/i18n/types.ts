export type I18nState = {
  status: 'loading' | 'idle' | 'failed';
  lang: string;
  supportedLangs: SupportedLangs;
  translations: Translations;
};

export type SupportedLangs = Record<string, string>;

export type Translations = Partial<{
  home: string;
  notFound: string;
  pageNotFound: string;
  goBackToHome: string;
  oops: string;
}>;
