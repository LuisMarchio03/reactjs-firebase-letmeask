import { createContext, ReactNode, useState } from 'react'
import usePersistedState from '../utils/usePersistedState';

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
  const [currentTheme, setCurrentTheme] = usePersistedState('theme', 'light');

  async function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}