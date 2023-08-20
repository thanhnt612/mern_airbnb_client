import { useEffect, useState } from "react";

export const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
      if (theme === 'light') {
        localStorage.setItem('theme', 'dark');
        setTheme('dark');
      } else {
        localStorage.setItem('theme', 'light');
        setTheme('light');
      }
    };
    useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      localTheme && setTheme(localTheme);
    }, []);
  
    return [theme, toggleTheme];
  };