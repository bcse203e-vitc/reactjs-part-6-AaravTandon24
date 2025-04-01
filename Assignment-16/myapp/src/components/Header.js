import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { ProgressContext } from "../contexts/ProgressContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { progress } = useContext(ProgressContext);

  return (
    <header className={`app-header ${darkMode ? "dark" : "light"}`}>
      <div className="logo">
        <Link to="/">Learning Pathway</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          {progress.selectedSkill && (
            <li>
              <Link to={`/roadmap/${progress.selectedSkill}`}>Roadmap</Link>
            </li>
          )}
          <li>
            <Link to="/progress">My Progress</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
        </ul>
      </nav>
      <div className="user-actions">
        <div className="xp-display">XP: {progress.xpPoints}</div>
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
