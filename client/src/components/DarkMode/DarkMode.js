import React, { useEffect } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import './DarkMode.css';

/**
 * DarkMode component handles the toggling of dark and light themes.
 * It saves the user's preference in local storage and applies the theme accordingly.
 *
 */

const DarkMode = () => {
  const setDarkMode = () => {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  };

  const setLightMode = () => {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };


  /**
   * useEffect hook that runs on component mount to check and apply the saved theme preference.
   * It also sets the checkbox state based on the saved theme.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode();
      document.getElementById('darkmode-toggle').checked = true;
    } else {
      setLightMode();
    }
  }, []);
  //<SunIcon className="icon sun-icon" />
  //<MoonIcon className="icon moon-icon" />

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">

      </label>
    </div>
  );
};

export default DarkMode;
