import { createContext, ReactNode, useState } from 'react'

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContexType = {
  theme: Theme;
  toggleTheme: () => void;
}


export const ThemeContext = createContext({} as ThemeContexType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}