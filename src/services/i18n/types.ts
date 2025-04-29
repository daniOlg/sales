export type I18nState = {
  status: 'loading' | 'idle' | 'failed';
  lang: string;
  supportedLangs: SupportedLangs;
  translations: Translations;
};

export type SupportedLangs = Record<string, string>;

export type Translations = {
  home: string;
  oops: string;
  pageNotFound: string;
  goBackToHome: string;
  login: {
    title: string;
    description: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    registerButton: string;
    notRegistered: string;
    loginButton: string;
  };
  register: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    backToLogin: string;
    alreadyRegistered: string;
    registerButton: string;
  };
};
