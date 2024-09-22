import React, {createContext, useState, useContext} from 'react';
import {themes} from './themes';

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(themes.dark );

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
