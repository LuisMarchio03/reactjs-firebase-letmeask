import { createContext, ReactNode, useState } from 'react'

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContexType = {
  theme: Theme;
}


export const ThemeContext = createContext({} as ThemeContexType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{theme: currentTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}