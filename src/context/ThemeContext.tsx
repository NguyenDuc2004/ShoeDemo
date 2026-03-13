import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'emerald' | 'blue' | 'violet' | 'rose' | 'amber' | 'indigo';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  getColorClass: (prefix: string, weight?: number) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('admin-theme-color');
    return (saved as ThemeColor) || 'emerald';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin-dark-mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('admin-theme-color', themeColor);
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', String(isDarkMode));
    console.log('Switching theme, isDarkMode:', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      console.log('Added dark class to html and body. ClassList:', document.documentElement.classList.toString());
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      console.log('Removed dark class from html and body. ClassList:', document.documentElement.classList.toString());
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode. Current:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const getColorClass = (prefix: string, weight: number = 500) => {
    return `${prefix}-${themeColor}-${weight}`;
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, isDarkMode, toggleDarkMode, getColorClass }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
