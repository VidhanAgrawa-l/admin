// src/types/navbar.ts
export interface UserPreferences {
  country: string;
  language: string;
  currency: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface TranslationResources {
  selectCountry: string;
  selectLanguage: string;
  selectCurrency: string;
  customerSupport: string;
  trackOrder: string;
  becomeSupplier: string;
  languages: {
    [key: string]: string;
  };
}
