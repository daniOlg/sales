export type I18nState = {
  status: 'loading' | 'idle' | 'failed';
  lang: string;
  supportedLangs: SupportedLangs;
  translations: Translations;
};

export type SupportedLangs = Record<string, string>;

export type Translations = {
  notFound: {
    title: string;
    subtitle: string;
    goBackToHome: string;
    goBackToDashboard: string;
  },
  home: {
    title: string;
    welcome: string;
    subtitle: string;
    loginButton: string;
    registerButton: string;
  };
  login: {
    title: string;
    description: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    forgotPassword: string;
    passwordPlaceholder: string;
    registerButton: string;
    notRegistered: string;
    loginButton: string;
    success: string;
    validation: {
      email: string;
      passwordMin8: string;
    }
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
    allFieldsRequired: string;
    passwordsDoNotMatch: string;
    success: string;
    validation: {
      email: string;
      passwordMin8: string;
      confirmPasswordMin8: string;
    }
  };
  passwordRecovery: {
    title: string;
    description: string;
    emailPlaceholder: string;
    sendButton: string;
    loadingText: string;
    checkEmailTitle: string;
    checkEmailDescription: string;
    checkSpamNote: string;
    tryAgainButton: string;
    rememberPasswordText: string;
    backToLoginText: string;
    successMessage: string;
    errorMessage: string;
  };
  updatePassword: {
    title: string;
    description: string;
    newPasswordLabel: string;
    newPasswordPlaceholder: string;
    updateButton: string;
    loadingText: string;
    successMessage: string;
    errorMessage: string;
    rememberPasswordText: string;
    backToLoginText: string;
    authRequiredMessage: string;
  };
};
