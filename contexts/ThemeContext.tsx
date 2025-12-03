import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Função auxiliar para aplicar tema (evita duplicação)
const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  try {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a1a1a';
    }
  } catch (error) {
    console.error('Erro ao aplicar tema:', error);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('inspetor_master_theme');
      const initialTheme = (saved === 'light' || saved === 'dark') ? (saved as Theme) : 'dark';
      
      // Aplicar tema imediatamente na inicialização
      applyTheme(initialTheme);
      
      return initialTheme;
    } catch (error) {
      console.error('Erro ao carregar tema do localStorage:', error);
      applyTheme('dark');
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('inspetor_master_theme', theme);
      applyTheme(theme);
    } catch (error) {
      console.error('Erro ao salvar tema no localStorage:', error);
      // Aplicar tema mesmo se localStorage falhar
      applyTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

