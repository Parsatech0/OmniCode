import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  primaryColor: string;
  accentColor: string;
  setPrimaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] = useState('#ffffff');
  const [accentColor, setAccentColorState] = useState('#a8a2ff');

  useEffect(() => {
    const storedPrimary = localStorage.getItem('theme_primary');
    const storedAccent = localStorage.getItem('theme_accent');
    if (storedPrimary) setPrimaryColorState(storedPrimary);
    if (storedAccent) setAccentColorState(storedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.style.setProperty('--color-accent', accentColor);
    localStorage.setItem('theme_primary', primaryColor);
    localStorage.setItem('theme_accent', accentColor);
  }, [primaryColor, accentColor]);

  const setPrimaryColor = (color: string) => setPrimaryColorState(color);
  const setAccentColor = (color: string) => setAccentColorState(color);
  const resetTheme = () => {
    setPrimaryColorState('#ffffff');
    setAccentColorState('#a8a2ff');
  };

  return (
    <ThemeContext.Provider value={{ primaryColor, accentColor, setPrimaryColor, setAccentColor, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};