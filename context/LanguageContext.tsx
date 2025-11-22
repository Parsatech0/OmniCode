import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language, Translation } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);

  useEffect(() => {
    const root = document.documentElement;
    if (language === Language.FA) {
      root.setAttribute('dir', 'rtl');
      root.classList.add('font-persian');
      root.classList.remove('font-sans');
    } else {
      root.setAttribute('dir', 'ltr');
      root.classList.add('font-sans');
      root.classList.remove('font-persian');
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    isRTL: language === Language.FA
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
